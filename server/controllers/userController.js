const UserModel = require('../models/user');
const AppointmentModel = require("../models/appointment");
const jwt = require("jsonwebtoken");
const getMQTTHandler = require("../MQTTHandler");
const UsersLoggedIn = require("../models/usersLoggedIn");
const ClinicModel = require('../models/clinic');
const HOST = process.env.MQTT_URL;
const USERNAME = process.env.MQTT_USER;
const PASSWORD = process.env.MQTT_PASSWORD;
const mongoose = require('mongoose');

const mqttHandler = getMQTTHandler(HOST, USERNAME, PASSWORD);

class UserController {
  async createUser(req, res) {
    try {
      const name = req.body.name;
      const password = req.body.password;
      const email = req.body.email;
      const phoneNumber = req.body.phoneNumber;
      const messages = req.body.messages;
      const newUser = new UserModel({
        name: name,
        password: password,
        email: email,
        phoneNumber: phoneNumber,
        messages: messages,
      });

      const existingUser = await UserModel.findOne({ name });

      if (existingUser) {
        return res.status(400).send("User already exists");
      }

      await newUser.save();

      res.status(201).json(newUser);
    } catch (err) {
      res.status(500).json({ err: "ERROR" });
    }
  }

  async getAllUsers(req, res) {
    try {
      const user = await UserModel.find({}).sort({ name: 1 }).exec();
      if (!user) {
        res.status(404).send("No users exist");
      }
      res.json(user);
    } catch (err) {
      res.status(500).send(err);
    }
  }

  async getUserById(req, res) {
    const id = req.params.id;

    try {
      const user = await UserModel.findById(id);
      if (!user) {
        return res.status(404).send("User not found");
      }
      res.status(200).json(user);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  }

  async deleteById(req, res) {
    const id = req.params.id;

    try {
      const result = await UserModel.findByIdAndDelete(id);
      if (!result) {
        return res.status(404).send("User not found");
      }
      res.status(200).send(`User with ID ${id} was deleted.`);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  }

  async updateByID(req, res) {
    const id = req.params.id;
    const updateData = req.body;

    try {
      const user = await UserModel.findById(id);
      if (!user) {
        return res.status(404).send("User not found");
      }
      const updatedUser = await UserModel.findByIdAndUpdate(id, updateData, {
        new: true,
      });
      res.status(200).json(updatedUser);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  }

  async updateByAuthenticationId(req, res) {
    // Extract the token from the request headers
    const token = req.headers.usertoken;
    let userId;

    // Verify the token and extract the user ID
    try {
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      userId = decoded.userId;
    } catch (error) {
      return res.status(401).send("Invalid Token");
    }
    const { name, phoneNumber, password } = req.body;

    try {
      const user = await UserModel.findById(userId);
      if (!user) {
        return res.status(404).send("User not found");
      }

      const updatedData = {};
      if (name) updatedData.name = name;
      if (phoneNumber) updatedData.phoneNumber = phoneNumber;
      if (password) updatedData.password = password;

      const updatedUser = await UserModel.findByIdAndUpdate(
        userId,
        updatedData,
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  }

  async updateByAuthenticationId(req, res) {
    // Extract the token from the request headers
    const token = req.headers.usertoken;
    let userId;

    // Verify the token and extract the user ID
    try {
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      userId = decoded.userId;
    } catch (error) {
      return res.status(401).send("Invalid Token");
    }
    const { name, phoneNumber, password } = req.body;

    try {
      const user = await UserModel.findById(userId);
      if (!user) {
        return res.status(404).send("User not found");
      }

      const updatedData = {};
      if (name) updatedData.name = name;
      if (phoneNumber) updatedData.phoneNumber = phoneNumber;
      if (password) updatedData.password = password;

      const updatedUser = await UserModel.findByIdAndUpdate(
        userId,
        updatedData,
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  }

  async confirmAppointment(req, res) {
    const userId = req.params.id;
    const appointmentId = req.params.appointmentId;
    const clinicId = req.body.clinicId;
    try {
      const topic = "flossboss/appointment/request/confirm";
      const message = `{
      "_id": "${appointmentId}",
      "_userId": "${userId}",
      "_clinicId": "${clinicId}"
    }`;
      mqttHandler.publish(topic, message);
      res.status(200).send("Checking booking");
    } catch (error) {
      res.status(500).send("internal server error");
    }
  }

  async pendingAppointment(req, res) {
    const userId = req.params.id;
    const appointmentId = req.params.appointmentId;
    const clinicId = req.body.clinicId;
    try {
      const appointment = await AppointmentModel.findById(appointmentId);
      if (appointment.isPending === false && appointment.isBooked === false) {
        try {
          const topic = "flossboss/appointment/request/pending";
          const message = `{
          "_id": "${appointmentId}",
          "_userId": "${userId}",
          "_clinicId": "${clinicId}"
        }`;
          mqttHandler.publish(topic, message);
          res.status(200).send("Booking is in Progress");
        } catch (error) {
          res.status(500).send("Internal server error");
        }
      } else {
        res.status(200).send("TimeSlot is Booked");
      }
    } catch (error) {
      res.status(500).send("internal server error");
    }
  }

  async cancelAppointment(req, res) {
    const userId = req.params.id;
    const appointmentId = req.params.appointmentId;
    const clinicId = req.body.clinicId;
    try {
      const topic = "flossboss/appointment/request/cancel";
      const message = `{
      "_id": "${appointmentId}",
      "_userId": "${userId}",
      "_clinicId": "${clinicId}"
    }`;
      mqttHandler.publish(topic, message);
      res.status(200).send("Checking booking");
    } catch (error) {
      res.status(500).send("internal server error");
    }
  }

  async decrementLoggedInUsers(req, res) {
    // Ensure that the count doesn't go below zero
    try {
    const loggedInInfo = await UsersLoggedIn.findOne();
    if (loggedInInfo && loggedInInfo.loggedInUsers > 0) {
      await UsersLoggedIn.findOneAndUpdate({}, { $inc: { loggedInUsers: -1 } });
    }
    res.status(200).send("User logged out");
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
  }
  //This method is a copy of cancelAppointment above, but with added functionality for also
  // updating the booked, pending and available attributes in the db. Also sets the userId to null so that
  //it is not connected to any user, i.e. it can be booked by another user.
    async cancelBookedAppointment(req, res) {
      const userId = req.params.id;
      const appointmentId = req.params.appointmentId;
      const clinicId = req.body.clinicId;
      try {
        const topic = "flossboss/appointment/request/canceluser";
        const message = `{
          "_id": "${appointmentId}",
          "_userId": "${userId}",
          "_clinicId": "${clinicId}"
        }`;
        
        mqttHandler.publish(topic, message);
        res.status(200).send("Booking cancelled");
      } catch (error) {
        res.status(500).send("internal server error");
      }
    }


  async getUserAppointments(req, res) {
    const userId = req.params.id;

    try {
      
        // Fetches appointments where _userId in the appointment object matches the logged-in user's ID
        // and the isBooked attribute is set to true
        const appointments = await AppointmentModel.find({ 
          _userId: userId, 
          isBooked: true 
        });

        // Manually fetch the clinic data for each appointment
        const appointmentsWithClinicData = await Promise.all(appointments.map(async (appointment) => {
            const clinicId = new mongoose.Types.ObjectId(appointment._clinicId);
            const clinic = await ClinicModel.findById(clinicId).exec();
            return {
                ...appointment.toObject(),
                clinicName: clinic ? clinic.name : 'Unknown Clinic'
            };
        }));

        res.json(appointmentsWithClinicData);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
  }
}

module.exports = UserController;
