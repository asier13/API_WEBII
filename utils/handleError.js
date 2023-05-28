const handleError = (res, message, code = 500) => {
  res.status(code).send(message);
};

module.exports = { handleError };
