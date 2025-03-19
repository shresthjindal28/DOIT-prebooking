const mongoose = require("mongoose");

const HomeownerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  mobnumber: { type: String, required: true, unique: true }, 
  role: { type: String, enum: ["homeowner"], default: "homeowner" },
  
},
{ timestamps: true });

const Homeowner = mongoose.model("Homeowner", HomeownerSchema);
module.exports = Homeowner;