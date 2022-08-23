/* eslint-disable consistent-return */
const mongoose = require('mongoose');

const { Schema } = mongoose;

const ItemSchema = new Schema(
  {
    title: {type: String, required: true, maxLength: 200},
    quantity: { type: Number, required: true, min: 0, max: 99},
    price: {type: Number, required: true, min: 0},
    image: {type: String,  required: true, maxLength: 200},
  }
);

module.exports = mongoose.model('Item', ItemSchema);