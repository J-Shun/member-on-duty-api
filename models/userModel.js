const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: [true, "email must not be empty"],
    unique: [true, "email already in use"],
    lowercase: true,
  },
  password: {
    type: String,
    require: [true, "password must not be empty"],
    minlength: 8,
    select: false,
  },
});

const User = mongoose.model("user", userSchema);

module.exports = User;
