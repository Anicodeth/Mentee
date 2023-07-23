// middlewares/authMiddleware.js
const jwt = require("jsonwebtoken");
const secretKey = "your-secret-key"; // Replace this with your actual secret key

const authMiddleware = (req, res, next) => {
  console.log(req.header("Authorization"))
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ error: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};

module.exports = authMiddleware;
