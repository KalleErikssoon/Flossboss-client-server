const ClinicModel = require("../models/clinic");
const AppointmentModel = require("../models/appointment");
const getMQTTHandler = require("../MQTTHandler");
const HOST = process.env.MQTT_URL;
const USERNAME = process.env.MQTT_USER;
const PASSWORD = process.env.MQTT_PASSWORD;
global.dateScores = {};
global.topics = ["topic1", "topic2", "topic3", "topic4"];
global.sseConnections = [];

const mqttHandler = getMQTTHandler(HOST, USERNAME, PASSWORD);
mqttHandler.connect();
// Subscribe to topics
global.topics.forEach((topic) => {
  mqttHandler.client.subscribe(topic);
});

mqttHandler.client.on("message", (topic, message) => {
  console.log(global.dateScores);
  try {
    const appointment = JSON.parse(message.toString());
    console.log(appointment);
    const dateString = new Date(appointment.date).toISOString().split("T")[0];

    // Ensure the date entry exists in the dateScores
    if (!dateScores[dateString]) {
      dateScores[dateString] = { count: 0, isAvailable: false };
    }

    // Save the old availability status
    const oldAvailability = dateScores[dateString].isAvailable;

    // Update the count based on the appointment attributes
    if (appointment.isAvailable && appointment.isPending) {
      dateScores[dateString].count = Math.max(
        dateScores[dateString].count - 1,
        0
      );
    } else {
      dateScores[dateString].count++;
    }

    // Update isAvailable based on the count
    dateScores[dateString].isAvailable = dateScores[dateString].count > 0;

    // Check for significant availability change and notify the frontend
    if (oldAvailability !== dateScores[dateString].isAvailable) {
      notifyFrontend(dateString, dateScores[dateString]);
    }
  } catch (error) {
    console.error("Error processing MQTT message:", error);
  }
});

// Method to Notify Frontend
function notifyFrontend(dateString, update) {
  this.sseConnections.forEach(({ res }) => {
    res.write(`data: ${JSON.stringify({ date: dateString, update })}\n\n`);
  });
}

////////////////////////////////  The start of the class ////////////////////////////////////////////////////

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
  async getAppointmentsOnSpecificDate(req, res) {
    console.log("hello");
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
      const timeTo = req.body.timeTo;
      const timeFrom = req.body.timeFrom;
      const _dentistId = req.body._dentistId;
      const _userId = req.body._userId;
      const _clinicId = req.body._clinicId;
      const isBooked = req.body.isBooked;
      const isPending = req.body.isPending;
      const isAvailable = req.body.isAvailable;

      const newAppointment = new AppointmentModel({
        date: date,
        timeTo: timeTo,
        timeFrom: timeFrom,
        _dentistId: _dentistId,
        _userId: _userId,
        _clinicId: _clinicId,
        isBooked: isBooked,
        isPending: isPending,
        isAvailable: isAvailable,
      });

      const savedAppointment = await newAppointment.save();

      res.status(201).json(savedAppointment);
    } catch (err) {
      res.status(500).send(err);
    }
  }
  async deleteAppointment(req, res) {
    const id = req.params.appointmentId;
    console.log(id);
    try {
      const result = await AppointmentModel.findByIdAndDelete(id);
      if (!result) {
        return res.status(404).send("Appointment not found");
      }
      res.status(200).send(`appointment with ID ${id} was deleted.`);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
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
      global.dateScores = scores;
      res.status(200).json(scores);
    } catch (err) {
      res.status(500).send(err);
    }
  }

  sendSSE(req, res) {
    res.writeHead(200, {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    });

    const connection = { res };
    global.sseConnections.push(connection);

    req.on("close", () => {
      global.sseConnections = global.sseConnections.filter(
        (conn) => conn !== connection
      );
    });
  }
}

module.exports = ClinicController;
