const express = require("express");
const router = express.Router();
const ClinicController = require("../controllers/clinicController");

const controller = new ClinicController();

router.get("/", controller.getAllClinics);

module.exports = router;
