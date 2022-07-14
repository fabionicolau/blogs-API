require('dotenv').config();
const jwt = require('jsonwebtoken');

const handleToken = {
  createToken: (user) => {
    const token = jwt.sign({ data: user }, process.env.JWT_SECRET, {
      expiresIn: '15m',
      algorithm: 'HS256',
    });
  
    return token;
  },
};

module.exports = handleToken;
