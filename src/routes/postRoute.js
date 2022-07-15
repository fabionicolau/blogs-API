const express = require('express');

const postController = require('../controllers/postController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', authMiddleware, postController.getAllPostCategories);

module.exports = router;