const UserModel = require("../models/user");
const jwt = require("jsonwebtoken");

class LoginController {
  async login(req, res) {
    try {
      const username = req.body.username;
      const password = req.body.password;

      const user = await UserModel.findOne({ username });

      if (!user) {
        return res.status(401).json({ message: "User does not exist" });
      } else if (user.password !== password) {
        return res.status(401).json({ message: "Incorrect password" });
      }

      token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
        expiresIn: "1h",
      });

      res.setHeader("usertoken", token);
      res.setHeader("userid", user._id);

      res.status(200).json({ message: "Logged in" });
    } catch (error) {
      console.error(error);
      res.status(500).json("Internal Server error");
    }
  }
}

module.exports = LoginController;
