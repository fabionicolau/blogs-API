const express = require('express');

const postController = require('../controllers/postController');
const authMiddleware = require('../middleware/authMiddleware');
const categoryIdMiddleware = require('../middleware/categoryIdErrorHandler');

const router = express.Router();

router.get('/', authMiddleware, postController.getAllPostCategories);
router.get('/search', authMiddleware, postController.getPostByQuery);
router.get('/:id', authMiddleware, postController.getPostById);
router.post('/', authMiddleware, categoryIdMiddleware, postController.createPost);
router.delete('/:id', authMiddleware, postController.deletePostById);

module.exports = router;