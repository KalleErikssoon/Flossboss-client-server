const mongoose = require("mongoose");

// Define the clinic schema
const clinicSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  latitude: {
    type: Number,
    required: true,
  },
  longitude: {
    type: Number,
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
  address: {
    type: String,
  },
  openForm: {
    type: String,
  },
  openTo: {
    type: String,
  },
  region: {
    type: String,
  },
  zipcode: {
    type: String,
  },
  dentists: [{ type: String }],
});

module.exports = mongoose.model(
  "clinic-testing",
  clinicSchema,
  "clinic-testing"
);
