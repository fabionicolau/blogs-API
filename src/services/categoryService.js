const { Category } = require('../database/models');

const categoryService = {
  createCategory: async ({ name }) => {
    if (!name) {
      const err = new Error('"name" is required');
      err.name = 'CategoryNameRequired';
      throw err;
    } 
    const { id } = await Category.create({ name });
    return { id, name };
  },

};

module.exports = categoryService;