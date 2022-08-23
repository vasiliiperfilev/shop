const express = require('express');

const router = express.Router();

const userController = require('../controllers/userController');

router.post('/authenticate', userController.authenticateUser);
router.post('/register', userController.registerUser);
router.put('/:userId', userController.updateUser);

module.exports = router;
