require('dotenv').config();
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    res.status(401).json({ message: 'Token not found' });
  }
  try {
    jwt.verify(authorization, process.env.JWT_SECRET);
    next();
  } catch (error) {
    res.status(401).json({ message: 'Expired or invalid token' });
  }
};