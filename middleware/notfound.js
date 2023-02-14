const notFound = (req, res, next) => {
  res.status(404).json({
    status: "error",
    message: "route not found",
  });
};

module.exports = notFound;
