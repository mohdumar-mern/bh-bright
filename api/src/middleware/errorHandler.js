function notFoundHandler(req, res) {
    res.status(404).json({
      message: `Route not found: ${req.method} ${req.path}`,
    });
  }
  
  function errorHandler(error, req, res, next) {
    if (res.headersSent) {
      return next(error);
    }
  
    console.error(error);
  
    const statusCode =
      Number.isInteger(error.statusCode) &&
      error.statusCode >= 400 &&
      error.statusCode < 600
        ? error.statusCode
        : 500;
  
    res.status(statusCode).json({
      message:
        statusCode === 500
          ? "An unexpected server error occurred."
          : error.message,
    });
  }
  
  module.exports = { notFoundHandler, errorHandler };