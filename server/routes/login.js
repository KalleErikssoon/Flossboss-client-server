const express = require("express");
const LoginController = require("../controllers/loginController");
const logWorker = require('../middleware/loggingMiddleware');

const router = express.Router();
const controller = new LoginController();
router.use(logWorker);
router.post("/", controller.login);

module.exports = router;
