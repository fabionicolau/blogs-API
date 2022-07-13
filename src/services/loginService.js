const { User } = require('../database/models');
const handleToken = require('./jwtService');

const loginService = {
  validateFields: async ({ email, password }) => {
    if (!email || !password) {
      const err = new Error('Some required fields are missing');
      err.name = 'MissingFieldsError';
      throw err;
    }
    const user = await User.findOne({ where: { email } });
    if (!user || user.password !== password) {
      const err = new Error('Invalid fields');
      err.name = 'InvalidFieldsError';
      throw err;
    }
  
    const { password: _, ...userData } = user.dataValues;
    const token = handleToken.createToken(userData);
    
    return token;
  },

};

module.exports = loginService;