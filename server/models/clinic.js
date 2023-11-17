const mongoose = require("mongoose");

// Define the clinic schema
const clinicSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  latitude: {
    type: String,
    required: true,
  },
  longitude: {
    type: String,
    required: true,
  },
  openingHours: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  employeeId: [{ type: String }],
});

module.exports = mongoose.model("Clinic", clinicSchema);
