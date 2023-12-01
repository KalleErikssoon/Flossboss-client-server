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
      const nextMonthDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 2,
        1
      );

      if (req.query.selectedDate) {
        const selectedDate = new Date(req.query.selectedDate);
        selectedDate.setHours(0, 0, 0, 0); // Set to the start of the selected day
        const nextDay = new Date(selectedDate);
        nextDay.setDate(selectedDate.getDate() + 1); // Set to the start of the next day

        appointments = await AppointmentModel.find({
          _clinicId: clinicid,
          isBooked: false,
          isPending: false,
          isAvailable: true,
          date: {
            $gte: selectedDate,
            $lte: nextDay,
          },
        })
          .sort({ timeSlot: 1 })
          .exec();
      } else {
        appointments = await AppointmentModel.find({
          _clinicId: clinicid,
          isBooked: false,
          isPending: false,
          isAvailable: true,
          date: {
            $gte: currentDate,
            $lte: nextMonthDate,
          },
        });
      }
      if (appointments.length === 0) {
        return res
          .status(404)
          .send("No appointments found for the given clinic.");
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
        _clinicId: clinicId,
        isBooked: false,
        isPending: false,
        isAvailable: true,
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

  /////////////////////////////////// SSE ///////////////////////////////////////////
  async getAppointments(req, res) {
    try {
      const clinicid = req.params.clinicid;
      const currentDate = new Date();
      const nextMonthDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 2,
        0 // Last day of next month
      );

      const appointments = await AppointmentModel.find({
        _clinicId: clinicid,
        date: { $gte: currentDate, $lte: nextMonthDate },
      });

      if (appointments.length === 0) {
        return res
          .status(404)
          .send("No appointments found for the given clinic.");
      }

      // Initialize scores object
      let scores = {};

      // Iterate over each appointment and update scores
      appointments.forEach((appointment) => {
        const dateString = appointment.date.toISOString().split("T")[0];
        scores[dateString] = (scores[dateString] || 0) + 1;
      });

      // Fill in the dates with no appointments and set isAvailable
      for (
        let d = new Date(currentDate);
        d <= nextMonthDate;
        d.setDate(d.getDate() + 1)
      ) {
        const dateString = d.toISOString().split("T")[0];
        if (!scores[dateString]) {
          scores[dateString] = { count: 0, isAvailable: false };
        } else {
          scores[dateString] = { count: scores[dateString], isAvailable: true };
        }
      }

      res.status(200).json(scores);
    } catch (err) {
      res.status(500).send(err);
    }
  }
}

module.exports = ClinicController;
