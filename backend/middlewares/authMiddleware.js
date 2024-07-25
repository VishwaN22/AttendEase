const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config');

// Middleware to authenticate token and authorize roles
const authMiddleware = (roles = []) => {
  return (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
      const decoded = jwt.verify(token, jwtSecret);
      req.user = decoded;

      if (roles.length && !roles.includes(decoded.role)) {
        return res.status(403).json({ message: 'Access denied. Insufficient role.' });
      }

      next();
    } catch (ex) {
      res.status(400).json({ message: 'Invalid token.' });
    }
  };
};

module.exports = authMiddleware;
