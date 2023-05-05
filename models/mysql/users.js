const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
    maxlength: 255,
    match: /^\S+@\S+\.\S+$/
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 1024
  },
});

// Hash the password before saving to the database
userSchema.pre("save", async function (next) {
  try {
    const user = this;
    if (user.isModified("password")) {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(user.password, salt);
      user.password = hash;
    }
    next();
  } catch (err) {
    next(err);
  }
});

// Method to check if password matches
userSchema.methods.comparePassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (err) {
    throw new Error(err);
  }
};

userSchema.index({ email: 1 });

const User = mongoose.model("User", userSchema);

module.exports = User;
