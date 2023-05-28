const mongoose = require("mongoose");
const Users = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    age: {
      type: Number,
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      select: false,
    },
    city: {
      type: String,
    },
    interests: {
      type: String,
    },
    allowOffers: {
      type: Boolean,
    },
    role: {
      type: String,
      enum: ["user", "admin"], 
      default: "user",
    },
  },
  {
    timestamp: true, 
    versionKey: false,
  }
);
module.exports = mongoose.model("users", Users); 