const loggerHandler = (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
};

module.exports = loggerHandler;
