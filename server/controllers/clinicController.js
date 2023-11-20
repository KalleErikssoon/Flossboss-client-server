const ClinicModel = require("../models/clinic");
const AppointmentModel = require("../models/appointment");

class ClinicController {
  async getAllClinics(req, res) {
    try {
      const clinic = await ClinicModel.find({});
      if (!clinic) {
        res.status(404).send("No clinics exist");
      }
      res.status(200).json(clinic);
    } catch (err) {
      res.status(500).send(err);
    }
  }
  // Get all appointments based on a specfic clinic Id and specific criteria

  async getAppointment(req, res) {
    try {
      const clinicid = req.params.clinicid;

      // Get current date
      const currentDate = new Date();
      // Calculate the date two months from now
      let twoMonthsLater = new Date();
      twoMonthsLater.setMonth(twoMonthsLater.getMonth() + 2);

      console.log("The current date is ", currentDate);
      console.log("The future date is ", twoMonthsLater);

      const appointments = await AppointmentModel.find({
        clinicId: clinicid,
        booked: false,
        pending: false,
        date: {
          $gte: currentDate,
          $lte: twoMonthsLater,
        },
      });

      if (appointments.length === 0) {
        return res
          .status(404)
          .send(
            "No appointments found within the next two months for the given clinic."
          );
      }

      res.status(200).json(appointments);
    } catch (err) {
      res.status(500).send(err);
    }
  }

  // Check if there is an appointment that fulfills specific criteria(To have a better performance comparing to the previous function)
  async getOneAppointment(req, res) {
    try {
      const clinicId = req.params.clinicid;

      // Get current date
      const currentDate = new Date();
      // Calculate the date two months from now
      let twoMonthsLater = new Date();
      twoMonthsLater.setMonth(twoMonthsLater.getMonth() + 2);

      // Find one appointment that matches the criteria
      const appointmentExists = await AppointmentModel.findOne({
        clinicId: clinicId,
        booked: false,
        pending: false,
        date: {
          $gte: currentDate,
          $lte: twoMonthsLater,
        },
      });

      if (!appointmentExists) {
        return res.status(404).send("No matching appointment found.");
      }

      res.status(200).json(appointmentExists);
    } catch (err) {
      res.status(500).send(err);
    }
  }

  // Create an appointment(This function will be removed later on)
  // The purpose of the function to add mock appointments for the sake of testing
  async createAppointment(req, res) {
    try {
      const date = req.body.date;
      const timeSlot = req.body.timeSlot;
      const dentistId = req.body.dentistId;
      const userId = req.body.userId;
      const clinicId = req.body.clinicId;
      const booked = req.body.booked;
      const pending = req.body.pending;
      const pendingUntil = req.body.pendingUntil;

      // Create a new appointment instance
      const newAppointment = new AppointmentModel({
        date: date,
        timeSlot: timeSlot,
        dentistId: dentistId,
        userId: userId,
        clinicId: clinicId,
        booked: booked,
        pending: pending,
        pendingUntil: pendingUntil,
      });

      // Save the new appointment to the database
      const savedAppointment = await newAppointment.save();

      res.status(201).json(savedAppointment);
    } catch (err) {
      res.status(500).send(err);
    }
  }
}

module.exports = ClinicController;
