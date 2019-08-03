const errorHandler = ({ statusCode, message }, req, res, next) => {
  if (!statusCode) statusCode = 500;
  if (!message) message = 'Unknown error';
  res.status(statusCode).json({ message });
  next();
};

module.exports = errorHandler;
