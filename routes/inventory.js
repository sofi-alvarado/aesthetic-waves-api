const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventory');

router.get('/', inventoryController.getInventory);
router.get('/:id', inventoryController.getInventoryItem);

module.exports = router;