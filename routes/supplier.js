const express = require('express');
const router = express.Router();
const supplierController = require('../controllers/supplier');

router.get('/', supplierController.getSuppliers);
router.get('/:id', supplierController.getSupplierById);
router.put('/:id', supplierController.editSupplier);
router.post('/', supplierController.createSupplier);
router.delete('/:id', supplierController.deleteSupplier);

module.exports = router;