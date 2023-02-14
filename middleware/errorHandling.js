const {
  resErrorDevelopment,
  resErrorProduction,
} = require("../services/errorEnvironment");

const errorHandling = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;

  // for dev
  if (process.env.NODE_ENV === "dev") {
    return resErrorDevelopment(err, res);
  }

  // possible error
  if (process.env.NODE_ENV === "ValidationError") {
    err.message = "Incorrect, please check again";
    err.isOperational = true;
    return resErrorProduction(err, res);
  }

  resErrorProduction(err, res);
};

module.exports = errorHandling;
