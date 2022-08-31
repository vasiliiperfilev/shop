const passport = require('passport');
const JsonStrategy = require('passport-json').Strategy;
const passportJWT = require('passport-jwt');

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

const User = require('../models/user');

passport.use(
  new JsonStrategy(
    {
      usernameProp: 'email',
      passwordProp: 'password',
    },
    (email, password, done) => {
      User.findOne({ email }, async (err, user) => {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false, { message: 'Incorrect email/password' });
        }
        if (!(await user.isValidPassword(password))) {
          return done(null, false, { message: 'Incorrect email/password' });
        }
        return done(null, user);
      });
    }
  )
);

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    },
    (jwtPayload, done) =>
      User.findById(jwtPayload.id)
        .then((user) => done(null, user))
        .catch((err) => done(err))
  )
);
