const errorHandler = (err, req, res) => {
  const statusCode = err.statusCode || 500;

  const message =
    statusCode === 500 ? "An error occurred on the server." : err.message;

  return res.status(statusCode).json({
    message
  });
};

module.exports = errorHandler;
