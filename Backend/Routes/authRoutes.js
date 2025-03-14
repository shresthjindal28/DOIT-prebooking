const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getuser
} = require("../Controllers/authController");
const {protect} = require("../Middleware/Authmiddleware");


router.post("/signup", registerUser);
router.post("/login", loginUser);
router.get("/user",protect,getuser);

module.exports = router;
