const postService = require('../services/postService');

const postController = {
  getAllPostCategories: async (_req, res) => {
    const postCategories = await postService.getAllPostCategories();
    res.status(200).json(postCategories);
  },
};

module.exports = postController;