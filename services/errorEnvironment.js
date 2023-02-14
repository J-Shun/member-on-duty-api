// Production environment error
const resErrorProduction = (err, res) => {
  if (err.isOperational === true) {
    res.status(err.statusCode).json({
      message: err.message,
    });
  } else {
    console.error("Error", err);
    res.status(500).json({
      status: "error",
      message: "System Error. Please contact the administrator",
    });
  }
};

// Development environment error
const resErrorDevelopment = (err, res) => {
  res.status(err.statusCode).json({
    message: err.message,
    error: err,
    stack: err.stack,
  });
};

module.exports = {
  resErrorDevelopment,
  resErrorProduction,
};
