require('dotenv/config');
const jwt = require('jsonwebtoken');

const handleToken = {
  createToken: (user) => {
    const token = jwt.sign({ data: user }, process.env.JWT_SECRET, {
      expiresIn: '15m',
      algorithm: 'HS256',
    });
  
    return token;
},

  validateToken: (token) => {
    try {
      if (!token) {
        const err = new Error('Token is missing');
        err.name = 'MissingTokenError';
        throw err;
      }
      const { data } = jwt.verify(token, process.env.JWT_SECRET);
      return data;  
    } catch (error) {
      const err = new Error('Expired or invalid token');
      err.name = 'InvalidTokenError';
      throw err;
    }
  },
};

module.exports = handleToken;
