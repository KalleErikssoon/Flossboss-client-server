const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController')

const controller = new UserController();

/* GET users listing. */
router.post('/', controller.createUser);

module.exports = router;
