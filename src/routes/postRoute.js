const express = require('express');

const postController = require('../controllers/postController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', authMiddleware, postController.getAllPostCategories);
router.get('/search', authMiddleware, postController.getPostByQuery);
router.get('/:id', authMiddleware, postController.getPostById);
router.delete('/:id', authMiddleware, postController.deletePostById);

module.exports = router;