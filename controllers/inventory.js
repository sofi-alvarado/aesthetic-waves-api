const Inventory = require('../models/inventory');

const getInventory = async (req, res) => {
  try {
    const inventory = await Inventory.getInventory();
    res.status(200).json(inventory);
  } catch (error) {
		res.status(500).json({ message: error.message })
  };
};

module.exports = {
	getInventory
};