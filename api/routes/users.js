const express = require('express');

const router = express.Router();

const userController = require('../controllers/userController');

router.post('/authenticate', userController.authenticateUser);
router.post('/register', userController.registerUser);
router.put('/self', userController.updateUser);

module.exports = router;
