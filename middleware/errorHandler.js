const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);

  // Default error
  let error = {
    success: false,
    message: err.message || 'Internal Server Error'
  };

  // Prisma errors
  if (err.code === 'P2002') {
    error.message = 'Resource already exists';
    return res.status(409).json(error);
  }

  if (err.code === 'P2025') {
    error.message = 'Resource not found';
    return res.status(404).json(error);
  }

  // Validation errors
  if (err.name === 'ValidationError' || err.isJoi) {
    error.message = err.details ? err.details[0].message : err.message;
    return res.status(422).json(error);
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    error.message = 'Invalid token';
    return res.status(401).json(error);
  }

  if (err.name === 'TokenExpiredError') {
    error.message = 'Token expired';
    return res.status(401).json(error);
  }

  // Cast errors
  if (err.name === 'CastError') {
    error.message = 'Invalid ID format';
    return res.status(400).json(error);
  }

  // Default to 500 server error
  const statusCode = err.statusCode || 500;

  // Include stack trace in development
  if (process.env.NODE_ENV === 'development') {
    error.error = err.stack;
  }

  res.status(statusCode).json(error);
};

module.exports = errorHandler;
