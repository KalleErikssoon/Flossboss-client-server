const UserModel = require('../models/user');
const getMQTTHandler = require('../MQTTHandler')
const HOST = process.env.MQTT_URL;
const USERNAME = process.env.MQTT_USER;
const PASSWORD = process.env.MQTT_PASSWORD;

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
          "name": name,
          "password": password,
          "email": email,
          "phoneNumber": phoneNumber,
          "messages": messages
        })

        const existingUser = await UserModel.findOne({ name });
        
        if (existingUser) {
          return res.status(400).send("User already exists");
        } 

        await newUser.save();

        res.status(201).json(newUser);
  
      } catch (err) {
        res.status(500).json({err: "ERROR"});
      }
  }

  async getAllUsers(req, res) {
    try {
      const user = await UserModel.find({})
      .sort({ name: 1 }).exec();
      if(!user) {
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
            return res.status(404).send('User not found');
        }
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
  }

  async deleteById(req, res) {
    const id = req.params.id;
    

    try {
        const result = await UserModel.findByIdAndDelete(id);
        if (!result) {
            return res.status(404).send('User not found');
        }
        res.status(200).send(`User with ID ${id} was deleted.`);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }

}

async updateByID(req, res){
    const id = req.params.id;
    const updateData = req.body;
  
    try {
      const user = await UserModel.findById(id);
      if (!user) {
          return res.status(404).send('User not found');
      }
      const updatedUser = await UserModel.findByIdAndUpdate(id, updateData, { new: true });
      res.status(200).json(updatedUser);
  } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }

  async confirmAppointment(req, res) {
    const userId = req.params.id;
    const appointmentId = req.params.appointmentId;
    try {
    const topic = "flossboss/appointment/request/confirm"
    const message = `{
      "_id": "${appointmentId}",
      "userId": "${userId}", 
      "clinicId": " "};`

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
    const topic = "flossboss/appointment/request/pending"
    const message = `{
      "_id": "${appointmentId}",
      "userId": "${userId}", 
      "clinicId": " "};`

    mqttHandler.publish(topic, message);
    res.status(200).send("Checking booking");
    } catch (error) {
      res.status(500).send("internal server error");
    }
  }

  async cancelAppointment(req, res) {
    const userId = req.params.id;
    const appointmentId = req.params.appointmentId;
    try {
    const topic = "flossboss/appointment/request/cancel"
    const message = `{"_id": "${appointmentId}", "userId": "${userId}", "clinicId": " "};`
    mqttHandler.publish(topic, message);
    res.status(200).send("Checking booking");
    } catch (error) {
      res.status(500).send("internal server error");
    }
  }
}

module.exports = UserController;