const Inventory = require('../models/inventory');

const getInventory = async (req, res) => {
  try {
    const inventory = await Inventory.getInventory();
    res.status(200).json(inventory);
  } catch (error) {
		res.status(500).json({ message: error.message })
  };
};

const getInventoryItem = async (req, res) => {
  try {
    const inventoryItem = await Inventory.getInventoryItem(req.params.id);
    console.log(inventoryItem.length);
    if (inventoryItem == 0) {
      res.status(404).json({
        error: 'No inventory item with id ' + req.params.id
      });
    } else {
      res.send(inventoryItem);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addEditInventoryItem = async (req, res) => {
  await Inventory.addEditInventoryItem(req.body);
  res.status(201).send('Created succesfully');
}

const deleteIventoryItem = async (req, res) => {
  try {
    const affectedIventoryItem = await Inventory.deleteIventoryItem(req.params.id);
    if (affectedIventoryItem == 0) {
      res.status(404).json({
        error: 'No Inventory Item with id ' + req.params.id
      })
    } else {
      res.send('Inventory item deleted successfully');
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
	getInventory,
  getInventoryItem,
  addEditInventoryItem,
  deleteIventoryItem
};