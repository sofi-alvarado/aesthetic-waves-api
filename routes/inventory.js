const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventory');

router.get('/', inventoryController.getInventory);
router.get('/:id', inventoryController.getInventoryItem);
router.post('/', inventoryController.createInventoryItem);
router.put('/:id', inventoryController.editInventoryItem);
router.delete('/:id', inventoryController.deleteIventoryItem);

module.exports = router;