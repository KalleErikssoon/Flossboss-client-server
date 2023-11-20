const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController')

const controller = new UserController();

/* GET users listing. */
router.get('/', controller.getAllUsers);
router.get('/:id', controller.getUserById);
router.post('/', controller.createUser);
router.delete('/:id', controller.deleteById);
router.patch('/:id', controller.updateByID);


module.exports = router;
