const express = require('express');

const categoryController = require('../controllers/categoryController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', authMiddleware, categoryController.getAllCategories);
router.post('/', authMiddleware, categoryController.createCategory);

module.exports = router;