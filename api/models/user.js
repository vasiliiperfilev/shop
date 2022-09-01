/* eslint-disable no-underscore-dangle */
/* eslint-disable consistent-return */
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const { Schema } = mongoose;
const { ObjectId } = mongoose.Types;

const PUBLIC_PROPS = ['id', 'email', 'address', 'orders'];

const UserSchema = new Schema(
  {
    email: {
      type: String,
      trim: true.valueOf,
      required: true,
      maxLength: 100,
    },
    password: { type: String, trim: true, required: true, maxLength: 100 },
    address: { type: String, trim: true, required: true, maxLength: 100 },
    orders: { type: [{ type: ObjectId, ref: 'Order' }], default: [] },
  },
  { timestamps: true }
);

UserSchema.pre('save', function (next) {
  const self = this;
  // hash password if modified
  if (!self.isModified('password')) return next();

  bcrypt.hash(self.password, 10, (err, hash) => {
    if (err) return next(err);
    self.password = hash;
    next();
  });
});

UserSchema.methods.isValidPassword = async function (password) {
  const user = this;
  const compare = await bcrypt.compare(password, user.password);
  return compare;
};

UserSchema.methods.getPublicProps = function () {
  const user = this;
  const publicUser = PUBLIC_PROPS.reduce((publicObj, key) => {
    // eslint-disable-next-line no-param-reassign
    publicObj[key] = user[key];
    return publicObj;
  }, {});
  return publicUser;
};

UserSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

UserSchema.set('toJSON', {
  virtuals: true,
});

module.exports = mongoose.model('User', UserSchema);
