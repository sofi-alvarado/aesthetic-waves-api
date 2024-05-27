const DeliveryService = require('../models/deliveryService');

const getDeliveryService = async (req, res) => {
  try {
    const brand = await DeliveryService.getAdress();
    res.status(200).json(brand)
  } catch (error) {
    res.status(500).json({ message: error.message })
  };
};

const getDeliveryServiceById = async (req, res) => {
	try {
		const brand = await DeliveryService.getDeliveryServiceById(req.params.id);
    if (brand.length == 0) {
        res.status(404).json({
            error: 'No delivery service with id ' + req.params.id
        });
    } else {
        res.send(brand);
    }
  } catch {
		res.status(500).json({ message: error.message });
  }
}

const editDeliveryService = async (req, res) => {
  try {
    await DeliveryService.editDeliveryService(req.params.id, req.body);
    res.status(201).json({ message: 'Delivery service updated successfully' });
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
}

const createDeliveryService = async (req, res) => {
	try {
		const newDeliveryService = await DeliveryService.createDeliveryService(req.body);
		res.status(201).json({ message: newDeliveryService });
	} catch (error) {
			res.status(500).json({ message: error.message });
	}
}

const deleteDeliveryService = async (req, res) => {
  try {
    const deletedDeliveryService = await DeliveryService.deleteDeliveryService(req.params.id);
    if (deletedDeliveryService == 0) {
      res.status(404).json({
        error: 'No brand with id ' + req.params.id
      })
    } else {
      res.send('Delivery service deleted successfully')
    }
  } catch (error) {
    res.status(500).json({ message: error.message})
  }
}

module.exports = {
	getDeliveryService,
	getDeliveryServiceById,
	editDeliveryService,
  createDeliveryService,
  deleteDeliveryService
}