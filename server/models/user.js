const mongoose = require('mongoose');


// Define the user schema
const userSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: Number,
      required: true,
    },
    messages: [{
      type: String
    }]
  });
  

module.exports = mongoose.model("User", userSchema);