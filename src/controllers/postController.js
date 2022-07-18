const postService = require('../services/postService');

const postController = {
  getAllPostCategories: async (_req, res) => {
    const postCategories = await postService.getAllPostCategories();
    res.status(200).json(postCategories);
  },

  getPostById: async (req, res) => {
    const post = await postService.getPostById(req.params.id);
    if (!post) {
      res.status(404).json({ message: 'Post does not exist' });
    }
    res.status(200).json(post);
  },

  deletePostById: async (req, res) => {
      const { id } = req.params;
      const { authorization } = req.headers;
      await postService.deletePostById(id, authorization);
      res.status(204).end();
  },
};

module.exports = postController;  