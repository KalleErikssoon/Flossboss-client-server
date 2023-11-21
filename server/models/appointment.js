const mongoose = require("mongoose");

// Define the clinic schema
const appointmentSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  timeSlot: {
    type: String,
    required: true,
  },
  dentistId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  clinicId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  booked: {
    type: Boolean,
    required: true,
  },
  pending: {
    type: Boolean,
    required: true,
  },
});

module.exports = mongoose.model("Appointment", appointmentSchema);
