const mongoose = require("mongoose");

const Admin = new mongoose.Schema(
  {
    fullname: { type: String, required: true },
    email: { type: String, unique: true, lowercase: true, required: true },
    password: { type: String, required: true },
    img_url: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("admin", Admin);
