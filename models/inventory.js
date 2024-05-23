const db = require('../config/db');

const Inventory = {
  getInventory: async () => {
		const [[inventory]] = await db.query('CALL sp_show_inventory()');
		return inventory;
	},

  getInventoryItem: async () => {

  },

  createInventoryItem: async () => {

  },

  deleteIventoryItem: async () => {

  }
};

module.exports = Inventory;