const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  adminId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  role:{type:String,}
}, { timestamps: true });

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;