const mongoose = require('mongoose');

const userSchema = {
    email: {
        type: String
    }
} 

module.exports = mongoose.model("User", userSchema);