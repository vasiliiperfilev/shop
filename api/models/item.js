/* eslint-disable consistent-return */
const mongoose = require('mongoose');

const { Schema } = mongoose;

const ItemSchema = new Schema(
  {
    title: { type: String, required: true, maxLength: 200 },
    price: { type: Number, required: true, min: 0 },
    category: { type: String, required: true, maxLength: 200 },
    description: { type: String, required: true, maxLength: 200 },
    image: { type: String, required: true, maxLength: 200 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Item', ItemSchema);
