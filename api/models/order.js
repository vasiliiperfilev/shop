/* eslint-disable no-underscore-dangle */
/* eslint-disable consistent-return */
const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = mongoose.Types;

const OrderSchema = new Schema(
  {
    userId: { type: ObjectId, ref: 'User' },
    items: {
      type: [
        {
          item: { type: ObjectId, ref: 'Item' },
          quantity: { type: Number, required: true, min: 0, max: 99 },
        },
      ],
      validate: (items) => items.length > 0,
    },
  },
  { timestamps: true }
);

OrderSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

OrderSchema.set('toJSON', {
  virtuals: true,
});

module.exports = mongoose.model('Order', OrderSchema);
