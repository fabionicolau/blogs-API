const { Category } = require('../database/models');

const validateCategoryId = (req, res, next) => {
  const { categoryIds } = req.body;
  categoryIds.map(async (categoryId) => {
      const category = await Category.findByPk(categoryId);
      if (!category) {
       res.status(400).json({ message: '"categoryIds" not found' });
      }
    });

  next();
  };

  module.exports = validateCategoryId;