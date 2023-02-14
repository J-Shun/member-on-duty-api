require("dotenv").config();
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
const notFound = require("./middleware/notfound");
const errorHandling = require("./middleware/errorHandling");

const indexRouter = require("./routes/index");
const userRouter = require("./routes/user");

const app = express();

// Uncaught Exception
process.on("uncaughtException", (err) => {
  console.error("uncaught exception");
  console.log(err);
  process.exit(1);
});

// connect to DB
const DB = process.env.DATABASE.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);
mongoose.connect(DB).then(() => {
  console.log("connect to DB successfully");
});

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// routes
app.use("/", indexRouter);
app.use("/user", userRouter);

// 404 not found
app.use(notFound);

// error
app.use(errorHandling);

// Unhandled Rejection
process.on("unhandledRejection", (err, promise) => {
  console.error("unhandled rejection", promise, "reason: ", err);
});

module.exports = app;
