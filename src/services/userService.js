const Joi = require('joi');
const { User } = require('../database/models');
const handleToken = require('./jwtService');

const userService = {
  validateFields: async (data) => {
    const schema = Joi.object({
      displayName: Joi.string().min(8).required().messages({
        'string.min': '"displayName" length must be at least 8 characters long',
      }),
      email: Joi.string().email().required().messages({
        'string.email': '"email" must be a valid email',
      }),
      password: Joi.string().min(6).required().messages({
        'string.min': '"password" length must be at least 6 characters long',
      }),
      image: Joi.string().required(),
    });

    const { error, value } = schema.validate(data);
    if (error) throw error;
    return value;
  },

  createUser: async (data) => {
    const { displayName, email, password, image } = await userService.validateFields(data);
    const emailAlreadyExists = await User.findOne({ where: { email } });
    if (emailAlreadyExists) {
      const err = new Error('User already registered');
      err.name = 'UserAlreadyExists';
      throw err;
    }
    
    await User.create({ displayName, email, password, image });

    const token = handleToken.createToken({ displayName, email, image });

    return token;
  },

  getAllUsers: async () => {
    const users = await User.findAll({ attributes: { exclude: ['password'] } });
    return users;
  },
};

module.exports = userService;