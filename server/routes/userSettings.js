const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.put('/update/:userID', userController.updateByID);

module.exports = router;