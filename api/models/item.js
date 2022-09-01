/* eslint-disable no-underscore-dangle */
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
    rating: { rate: { type: Number, min: 0, max: 5 }, count: { type: Number, min: 1 } },
  },
  { timestamps: true }
);

ItemSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

ItemSchema.set('toJSON', {
  virtuals: true,
});

module.exports = mongoose.model('Item', ItemSchema);
