const express = require('express');
const router = express.Router();
const addressController = require('../controllers/address');

router.get('/', addressController.getAddress);
router.get('/:id', addressController.getAddressById);
router.put('/:id', addressController.editAddress);
router.post('/', addressController.createAddress);
router.delete('/:id', addressController.deleteAddress);

module.exports = router;