const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
  const token = req.headers.usertoken;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized Token" });
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized Error" });
    }
    next();
  });
}

module.exports = authenticateToken;
