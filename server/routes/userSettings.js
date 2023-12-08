const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authenticateToken');
const userController = require('../controllers/userController');

const controller = new userController();
// defines the PUT route
router.put('/', authenticateToken,  controller.updateByAuthenticationId);

module.exports = router;