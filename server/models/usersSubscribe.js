const mongoose = require('mongoose');

const usersSubscribedSchema = new mongoose.Schema ({
    _clinicId: {
        type: String,
        required: true,
      },
      date: {
        type: Date,
        required: true
      },
      clinicName: {
        type: String,
        required: true
      },
      userEmails: [{
        type: String,
      }]
});

module.exports = mongoose.model("user-subscriptions", usersSubscribedSchema);
