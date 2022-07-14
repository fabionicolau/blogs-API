const userService = require('../services/userService');

const userController = {
  createUser: async (req, res) => {
      const token = await userService.createUser(req.body);
      res.status(201).json({ token });
  },

  getAllUsers: async (_req, res) => {
      const users = await userService.getAllUsers();
      res.status(200).json(users);
  },

  getUserById: async (req, res) => {
      const user = await userService.getUserById(req.params.id);
      if (!user) {
          res.status(404).json({ message: 'User does not exist' });
      }
      res.status(200).json(user);
  }, 
};

module.exports = userController;