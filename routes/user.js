const express = require("express");
const { userSignup } = require("../controllers/userController");
const router = express.Router();

// signup
router.post("/signup", function (req, res, next) {
  res.json({
    mssg: "signup",
  });
});

// login
router.post("/login", userSignup);

module.exports = router;
