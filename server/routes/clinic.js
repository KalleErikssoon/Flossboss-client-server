const ClinicController = require("../controllers/clinicController");

module.exports = function (clinicController) {
  const express = require("express");
  const router = express.Router({ mergeParams: true });

  router.get("/", clinicController.getAllClinics);
  router.get(
    "/:clinicid/appointments/",
    clinicController.getAppointmentsOnSpecificDate
  );
  router.get("/:clinicid/unavailableAppointments", clinicController.getUnavailableAppointments);
  router.get(
    "/:clinicid/appointments/calendar",
    clinicController.getAppointments
  ); // New function to get all appointments for a clinic
  router.get("/events", clinicController.sendSSE);
  router.get(
    "/appointments/available/:clinicid",
    clinicController.getOneAppointment
  );
  router.put('/:clinicid', clinicController.updateClientSubscribers)
  router.post("/appointments", clinicController.createAppointment); // This function will be removed later on.
  router.delete(
    "/appointments/:appointmentId",
    clinicController.deleteAppointment
  ); // function for testing
  return router;
};
