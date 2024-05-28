const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category');

router.get('/', categoryController.getCategories);
router.get('/:id', categoryController.getCategoryById);
router.put('/:id', categoryController.editCategory);
router.post('/', categoryController.createCategory);
router.delete('/:id', categoryController.deleteCategory);

module.exports = router;