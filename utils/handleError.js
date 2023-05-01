const handleHttpError = (res, message, code = 403) => {
    res.status(code).json({ success: false, message });
  };
  
  module.exports = { handleHttpError };
  