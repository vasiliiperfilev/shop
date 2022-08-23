/* eslint-disable consistent-return */
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const { Schema } = mongoose;
const { ObjectId } = mongoose.Types;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    maxLength: 100,
    validate: [validator.isEmail, 'Invalid email'],
  },
  password: { type: String, required: true, maxLength: 25 },
  address: { type: Date, required: true, maxLength: 100 },
  orders: [{ type: ObjectId, ref: 'Order' }],
});

UserSchema.pre('save', async (next, done) => {
  const self = this;
  // verify unique email
  mongoose.models.User.findOne({ email: self.email }, (err, results) => {
    if (err) {
      done(err);
    } else if (results) {
      self.invalidate('email', 'Email must be unique');
      done(new Error('Email must be unique'));
    }
  });

  // hash password if modified
  if (!self.isModified('password')) return next();

  bcrypt.hash(self.password, 10, (err, hash) => {
    if (err) return next(err);
    self.password = hash;
  });
  next();
});

module.exports = mongoose.model('User', UserSchema);
