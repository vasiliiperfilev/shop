const express = require('express');

const router = express.Router();

const itemController = require('../controllers/itemController');

router.get('/categories/:category', itemController.getAllCategoryItems);
router.get('/categories', itemController.getAllCategories);
router.get('/', itemController.getAllItems);
router.get('/:itemId', itemController.getItem);

module.exports = router;
