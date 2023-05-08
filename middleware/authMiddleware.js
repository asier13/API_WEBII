const jwt = require('jsonwebtoken');
const config = require('../config/mysql');

const authMiddleware = (roles) => {
  return (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    try {
      const decoded = jwt.verify(token, config.secret);
      req.userId = decoded.id;
      req.userRole = decoded.role;

      if (roles && !roles.includes(req.userRole)) {
        return res.status(403).json({ message: 'Forbidden' });
      }

      next();
    } catch (error) {
      return res.status(401).json({ message: 'Invalid token' });
    }
  };
};

module.exports = authMiddleware;
