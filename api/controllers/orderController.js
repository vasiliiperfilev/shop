/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable consistent-return */
const { body, param, validationResult } = require('express-validator');
const passport = require('passport');
const Order = require('../models/order');
const User = require('../models/user');
const Item = require('../models/item');

exports.postOrder = [
  passport.authenticate('jwt', { session: false }),
  body('userId')
    .trim()
    .escape()
    .custom((value) =>
      User.findById(value)
        .then((user) => {
          if (!user) return Promise.reject('User does not exist');
        })
        .catch(() => Promise.reject('User does not exist'))
    ),
  body('items').isArray().notEmpty().withMessage('Order at least 1 item'),
  body('items.*.item')
    .trim()
    .escape()
    .custom((value) =>
      Item.findById(value)
        .then((user) => {
          if (!user) return Promise.reject('Item does not exist');
        })
        .catch(() => Promise.reject('Item does not exist'))
    ),
  body('items.*.quantity').isInt({ min: 1, max: 99 }).withMessage('Must be between 1 and 99'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.json({ errors: errors.array() });
    } else {
      const { user } = req;
      const order = new Order({ ...req.body, date: new Date() });
      order.save(async (err, result) => {
        if (err) return next(err);
        user.orders.push(result.id);
        user.save();
        await result.populate('items');
        res.json(result);
      });
    }
  },
];

exports.getOrder = [
  passport.authenticate('jwt', { session: false }),
  param('orderId').trim().escape(),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.json({ errors: errors.array() });
    } else {
      const { user } = req;
      const { orderId } = req.params;
      if (user.orders.includes(orderId)) {
        try {
          const order = await Order.findById(orderId).populate('items.item');
          res.json(order);
        } catch (err) {
          next(err);
        }
      } else {
        next(new Error('No order found'));
      }
    }
  },
];

exports.getAllOrders = [
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const { user } = req;
    await user.populate('orders');
    user.orders.forEach(async (order) => {
      await order.populate('items');
    });
    res.json(user.orders);
  },
];
