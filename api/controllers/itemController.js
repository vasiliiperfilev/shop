const { param, validationResult } = require('express-validator');
const Item = require('../models/item');

exports.getItem = [
  param('itemId').trim().escape(),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.json({ errors: errors.array() });
    } else {
      const { itemId } = req.params;
      try {
        const item = await Item.findById(itemId);
        res.json(item);
      } catch (err) {
        next(err);
      }
    }
  },
];

exports.getAllItems = async (req, res, next) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    next(err);
  }
};

exports.getAllCategoryItems = [
  param('category').trim().escape(),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.json({ errors: errors.array() });
    } else {
      const { category } = req.params;
      try {
        const items = await Item.find({ category });
        res.json(items);
      } catch (err) {
        next(err);
      }
    }
  },
];

exports.getAllCategories = [
  async (req, res, next) => {
    try {
      const categories = await Item.distinct('category');
      res.json(categories);
    } catch (err) {
      next(err);
    }
  },
];
