const ClinicModel = require("../models/clinic");
const AppointmentModel = require("../models/appointment");

class ClinicController {
  // Gett all clinics from the database
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
      let appointments;
      // Get current date
      const currentDate = new Date();
      // Calculate the last date of the next month
      const nextMonthDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 2, 1);

      if (req.query.selectedDate) {
        const selectedDate = new Date(req.query.selectedDate);
         selectedDate.setHours(0, 0, 0, 0); // Set to the start of the selected day
         const nextDay = new Date(selectedDate);
    nextDay.setDate(selectedDate.getDate() + 1); // Set to the start of the next day

    appointments = await AppointmentModel.find({
      clinicId: clinicid,
      booked: false,
      pending: false,
      date: {
          $gte: selectedDate,
          $lte: nextDay
      }
      }).sort({ 'timeSlot': 1 }).exec();
      } else {
       appointments = await AppointmentModel.find({
        clinicId: clinicid,
        booked: false,
        pending: false,
        date: {
          $gte: currentDate,
          $lte: nextMonthDate,
          },
        });
      }
      if (appointments.length === 0) {
        return res
          .status(404)
          .send(
            "No appointments found for the given clinic."
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

      res.status(200).send(true);
    } catch (err) {
      res.status(500).send(err);
    }
  }

  // Create an appointment(This function will be removed later on)
  // This function is not the responsibility of the web clinet side
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

      const newAppointment = new AppointmentModel({
        date: date,
        timeSlot: timeSlot,
        dentistId: dentistId,
        userId: userId,
        clinicId: clinicId,
        booked: booked,
        pending: pending,
      });

      const savedAppointment = await newAppointment.save();

      res.status(201).json(savedAppointment);
    } catch (err) {
      res.status(500).send(err);
    }
  }
}

module.exports = ClinicController;
