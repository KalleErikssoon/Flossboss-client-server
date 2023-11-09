const User = require('../models/user');

class UserController {
async createUser(req, res) {
    try {
        const email = req.body.email;
        const newUser = new User ({
            "email": email 
        })
    await newUser.save();
    res.status(201).json(newUser);
    } catch {
        res.status(500).json({err: "Internal Server Error"});
    }
}
}

module.exports = UserController;