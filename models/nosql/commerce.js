
const mongoose = require("mongoose");

const Merchants = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    cif: {
      type: Number,
      unique: true,
    },
    address: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
      select: false,
    },
    telefono: {
      type: Number,
    },
    pageId: {
      type: String,
    },
  },
  {
    timestamp: true,
    versionKey: false,
  }
);
module.exports = mongoose.model("merchants", Merchants);