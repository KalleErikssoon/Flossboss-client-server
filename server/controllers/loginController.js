const UserModel = require("../models/user");
const jwt = require("jsonwebtoken");

class LoginController {

  async login(req, res) {
    
    const { email, password } = req.body;

    try {
      
      const user = await UserModel.findOne({ email });

      if (!user) {
        return res.status(404).json({ message: "User does not exist" });
      } else if (user.password !== password) {
        return res.status(401).json({ message: "Incorrect password" });
      }

      const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
        expiresIn: "1h",
      });
      

      res.status(200).json({ message: "Logged in", token: token, userid: user._id, name: user.name });
    } catch (error) {
      console.error(error);
      res.status(500).json("Internal Server error");
    }
  }
}

module.exports = LoginController;
