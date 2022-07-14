const categoryService = require('../services/categoryService');

const categoryController = {
  createCategory: async (req, res) => {
    try {
      const category = await categoryService.createCategory(req.body);
      res.status(201).json(category);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  getAllCategories: async (_req, res) => {
    const categories = await categoryService.getAllCategories();
    res.status(200).json(categories);
  },
};

module.exports = categoryController;