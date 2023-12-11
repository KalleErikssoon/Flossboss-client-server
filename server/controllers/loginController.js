const UserModel = require("../models/user");
const UsersLoggedIn = require('../models/usersLoggedIn');
const jwt = require("jsonwebtoken");

class LoginController {

  login = async (req, res) => {
    
    const { email, password } = req.body;

    try {
      
      const user = await UserModel.findOne({ email });

      if (!user) {
        return res.status(404).json({ message: "User does not exist" });
      } else if (user.password !== password) {
        return res.status(401).json({ message: "Incorrect password" });
      }
      //increment amount of users logged in
      await this.incrementLoggedInUsers();

      const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
        expiresIn: "1h",
      });
      

      res.status(200).json({ message: "Logged in", token: token, userid: user._id, name: user.name });
    } catch (error) {
      console.error(error);
      res.status(500).json("Internal Server error");
    }
  }
  
  incrementLoggedInUsers = async () => {
    // Find document or create it if it doesn't exist
    const loggedInInfo = await UsersLoggedIn.findOneAndUpdate({}, { $inc: { loggedInUsers: 1 } }, { upsert: true, new: true });
  }
}

module.exports = LoginController;
