const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const ServiceProvider = require("../Models/ServiceProvider");
const Homeowner = require("../Models/Homeowner");

// Function to generate JWT token
const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn:"7d" });
};

const registerUser = async (req, res) => {
  const { name, email, password,mobnumber, role } = req.body;

  try {
    // Check if user already exists
    const existingUser =
      (await ServiceProvider.findOne({ email })) ||
      (await Homeowner.findOne({ email }));
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    let newUser;
    if (role === "provider") {
      newUser = new ServiceProvider({
        name,
        mobnumber,
        email,
        password: hashedPassword,
        role,
      });
    } else if (role === "homeowner") {
      newUser = new Homeowner({ name, email,mobnumber, password: hashedPassword, role });
    } else {
      return res.status(400).json({ message: "Invalid role" });
    }

    await newUser.save();

    // Generate Token for newly registered user
    const token = generateToken(newUser._id, newUser.role);

    res
      .status(201)
      .json({ message: "User registered successfully", token, user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
const loginUser = async (req, res) => {
  const { mobnumber , password, role } = req.body; // Include role in request

  console.log(req.body.role)
  try {
    let user = null;

    // Check in the correct model based on the role
    if (role === "provider") {
      user = await ServiceProvider.findOne({  mobnumber });
    } else if (role === "homeowner") {
      user = await Homeowner.findOne({  mobnumber });
    } 

    if (!user) return res.status(400).json({ message: "User not found" });

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    // Generate Token
    const token = generateToken(user._id, user.role);

    res.status(200).json({ message: "Login successful", token, user });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const getuser = async (req, res) => {
  let user;
  try {
    console.log("Received request to fetch user");
    console.log("User ID:", req.user.id);
    console.log("User Role:", req.user.role);
    if (req.user.role === "homeowner") {
      console.log("Fetching user from Homeowner model...");
      user = await Homeowner.findById(req.user.id).select("-password"); // Exclude password field
    } else if (req.user.role === "provider") {
      console.log("Fetching user from Provider model...");
      user = await ServiceProvider.findById(req.user.id).select("-password");
    } else {
      console.log("Invalid user role:", req.user.role);
      return res.status(400).json({ message: "Invalid user role" });
    }

    if (!user) {
      console.log("User not found in database");
      return res.status(404).json({ message: "User not found" });
    }

    console.log("User fetched successfully:", user);
    res.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { registerUser, loginUser, generateToken, getuser };