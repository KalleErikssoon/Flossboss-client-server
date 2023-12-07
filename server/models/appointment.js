const mongoose = require("mongoose");

// Define the clinic schema
const appointmentSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  timeTo: {
    type: String,
    required: true,
  },
  timeFrom: {
    type: String,
    required: true,
  },
  _dentistId: {
    type: String,
    required: true,
  },
  _userId: {
    type: String,
  },
  _clinicId: {
    type: String,
    required: true,
  },
  isBooked: {
    type: Boolean,
    required: true,
  },
  isPending: {
    type: Boolean,
    required: true,
  },
  isAvailable: {
    type: Boolean,
    required: true,
  },
});

module.exports = mongoose.model(
  "timeslot-testing",
  appointmentSchema,
  "timeslot-testing"
);
