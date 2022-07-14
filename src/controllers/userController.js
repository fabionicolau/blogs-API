const userService = require('../services/userService');

const userController = {
  createUser: async (req, res) => {
      const token = await userService.createUser(req.body);
      res.status(201).json({ token });
  },
};

module.exports = userController;