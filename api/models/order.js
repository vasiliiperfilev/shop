/* eslint-disable consistent-return */
const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = mongoose.Types;

const OrderSchema = new Schema(
  {
    date: { type: Date },
    items: [{ type : ObjectId, ref: 'Item' }],
  }
);

module.exports = mongoose.model('Order', OrderSchema);