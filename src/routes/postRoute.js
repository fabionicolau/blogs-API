const express = require('express');

const postController = require('../controllers/postController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', authMiddleware, postController.getAllPostCategories);
router.get('/:id', authMiddleware, postController.getPostById);

module.exports = router;