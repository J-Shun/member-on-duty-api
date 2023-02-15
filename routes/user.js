const express = require("express");
const { userSignup, userLogin } = require("../controllers/userController");
const router = express.Router();

// signup
router.post("/signup", userLogin);

// login
router.post("/login", userSignup);

module.exports = router;
