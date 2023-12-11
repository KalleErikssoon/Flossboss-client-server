const mongoose = require('mongoose');

const usersLoggedInSchema = new mongoose.Schema ({
    loggedInUsers: {
        type: Number
    }
});

module.exports = mongoose.model("usersLoggedIn", usersLoggedInSchema);
