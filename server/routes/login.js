const express = require("express");
const LoginController = require("../controllers/loginController");

const router = express.Router();
const controller = new LoginController();

router.post("/", controller.login);

module.exports = router;
