const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const handleErrorAsync = require("../services/handleErrorAsync");
const appError = require("../services/appError");

const userSignup = handleErrorAsync(async (req, res, next) => {
  const { email, password, confirmPassword, name } = req.body;

  // validation
  if (!email || !password || !confirmPassword || !name) {
    return appError("400", "All fields must be filled", next);
  }

  if (password !== confirmPassword) {
    return appError("400", "password check fails", next);
  }

  if (!validator.isLength(password, { min: 8 })) {
    return appError("400", "password must contain at least 8 letters", next);
  }

  if (!validator.isEmail(email)) {
    return appError("400", "invalid email address", next);
  }

  if (name.trim().length === 0) {
    return appError("400", "name must not be empty", next);
  }

  if (name.trim().length > 20) {
    return appError("400", "please fill in less than 20 characters", next);
  }

  const emailExit = await User.exists({ email });
  if (emailExit) {
    return appError("400", "email already in use", next);
  }

  // encrypt
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  const user = await User.create({ email, password: hashPassword, name });

  // create token
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_DAY,
  });

  res.status(200).json({
    status: "success",
    email,
    token,
  });
});

module.exports = {
  userSignup,
};
