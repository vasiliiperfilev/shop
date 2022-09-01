/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');
const passport = require('passport');
const { body, validationResult } = require('express-validator');
const User = require('../models/user');

const PASSWORD_COMPLEXITY_REGEX = /^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9]).{6,}$/;

exports.registerUser = [
  body('email')
    .trim()
    .isLength({ min: 5 })
    .withMessage('Min length 5')
    .isEmail()
    .withMessage('Enter correct Email')
    .escape()
    .custom((value) =>
      User.findOne({ email: value }).then((user) => {
        if (user) return Promise.reject('Email already taken');
      })
    ),
  body('password')
    .trim()
    .isLength({ min: 6 })
    .withMessage('Min length 6')
    .escape()
    .matches(PASSWORD_COMPLEXITY_REGEX)
    .withMessage('Must have upper leter, number and special character'),
  body('address').trim().isLength({ min: 5 }).withMessage('Min length 5').escape(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    } else {
      const { email, password, address } = req.body;
      const user = new User({ email, password, address });
      user.save((err) => {
        if (err) return next(err);
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.json({ user: user.getPublicProps(), token });
      });
    }
  },
];

exports.authenticateUser = [
  body('email').trim().escape(),
  body('password').trim().escape(),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    } else {
      passport.authenticate('json', { session: false }, (err, user, message) => {
        if (err || !user) {
          return res.status(400).json(message);
        }
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        return res.json({ user: user.getPublicProps(), token });
      })(req, res);
    }
  },
];

exports.updateUser = [
  passport.authenticate('jwt', { session: false }),
  (req, res, next) => {
    const { user } = req;
    const editableProps = ['email', 'password', 'address'];
    editableProps.forEach((key) => {
      if (req.body[key]) {
        user[key] = req.body[key];
      }
    });
    user.save((err, result) => {
      if (err) return next(err);
      res.json(result.getPublicProps());
    });
  },
];
