const express = require('express');

const router = express.Router();

const itemController = require('../controllers/itemController');

router.get('/', itemController.getAllItems);
router.get('/:itemId', itemController.getItem);
router.get('/category/:category', itemController.getAllCategoryItems);

module.exports = router;
