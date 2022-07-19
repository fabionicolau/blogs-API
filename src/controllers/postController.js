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

  getPostByQuery: async (req, res) => {
    const { q } = req.query;
    const posts = await postService.getPostByQuery(q);
    res.status(200).json(posts);
  },  

  createPost: async (req, res) => {
    const { authorization } = req.headers;
    const post = await postService.createPost(authorization, req.body);
    res.status(201).json(post);
  },

  updatePost: async (req, res) => {
    const { authorization } = req.headers;
    const post = await postService.updatePost(authorization, req.params.id, req.body);
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