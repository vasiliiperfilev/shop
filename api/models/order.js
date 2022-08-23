/* eslint-disable consistent-return */
const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = mongoose.Types;

const OrderItemSchema = new Schema({
  item: { type: ObjectId, ref: 'Item' },
  quantity: { type: Number, required: true, min: 0, max: 99 },
});

const OrderSchema = new Schema(
  {
    userId: { type: ObjectId, ref: 'User' },
    date: { type: Date },
    items: {
      type: [OrderItemSchema],
      validate: (items) => items.length > 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', OrderSchema);
