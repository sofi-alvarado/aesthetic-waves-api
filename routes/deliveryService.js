const express = require('express');
const router = express.Router();
const deliveryServiceController = require('../controllers/deliveryService');

router.get('/', deliveryServiceController.getDeliveryService);
router.get('/:id', deliveryServiceController.getDeliveryServiceById);
router.put('/:id', deliveryServiceController.editDeliveryService);
router.post('/', deliveryServiceController.createDeliveryService);
router.delete('/:id', deliveryServiceController.deleteDeliveryService);

module.exports = router;