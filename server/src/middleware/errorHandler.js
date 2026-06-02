const errorHandler = (err, req, res, next) => {
  console.error(err.message);

  const statusCode = err.statusCode || err.response?.status || 500;
  
  let message = err.message || "Internal Server Error";
  if (err.response?.status === 404) {
    message = "No GitHub user found with the provided username.";
  } else if (err.response?.data?.message) {
    message = err.response.data.message;
  }

  res.status(statusCode).json({
    success: false,
    message,
  });
};

module.exports = errorHandler;