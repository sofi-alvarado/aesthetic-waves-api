const express = require('express');
const router = express.Router();
const productController = require('../controllers/products');

router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.post('/', productController.createEditProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;