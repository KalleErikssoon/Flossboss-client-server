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
      userEmails: [{
        type: String,
      }]
});

module.exports = mongoose.model("usersSubscribed", usersSubscribedSchema);
