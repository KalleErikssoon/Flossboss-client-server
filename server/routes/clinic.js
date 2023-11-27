const express = require("express");
const router = express.Router({ mergeParams: true });
const ClinicController = require("../controllers/clinicController");

const controller = new ClinicController();

router.get("/", controller.getAllClinics);
router.get("/:clinicid/appointments/", controller.getAppointment);
router.get("/appointments/available/:clinicid", controller.getOneAppointment);
router.post("/appointments", controller.createAppointment); // This function will be removed later on.

module.exports = router;
