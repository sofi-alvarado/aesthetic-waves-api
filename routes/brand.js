const express = require('express');
const router = express.Router();
const brandController = require('../controllers/brand');

router.get('/', brandController.getBrands);
router.get('/:id', brandController.getBrandById);
router.put('/:id', brandController.editBrand);
router.post('/', brandController.createBrand);
router.delete('/:id', brandController.deleteBrand);

module.exports = router;