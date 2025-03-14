const jwt = require("jsonwebtoken");
const User = require("../Models/Homeowner");

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];

      console.log("Token Received:", token); // Debugging Line

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("Decoded Token:", decoded); // Debugging Line

      req.user = await User.findById(decoded.id).select("-password");
      console.log("User Attached to Request:", req.user); // Debugging Line

      next();
    } catch (error) {
      console.error("Token verification failed:", error);
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }
};

// ✅ Properly export the middleware
module.exports = { protect };
