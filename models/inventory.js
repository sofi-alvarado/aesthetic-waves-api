const db = require('../config/db');

const Inventory = {
  getInventory: async () => {
		const [[inventory]] = await db.query('CALL sp_show_inventory()');
		return inventory;
	},

  getInventoryItem: async (id) => {
    const [[inventoryItem]] = await db.query('CALL sp_show_inventory_by_id(?)', [id]);
    return inventoryItem;
  },

  addEditInventoryItem: async (obj, id = 0) => {
    const [{affectedRows}] = await db.query('CALL sp_add_edit_inventory(?,?,?,?,?,?,?,?,?,?,?)',
    [
      id, 
      obj.product_img_path,
      obj.product_name, 
      obj.id_brand,
      obj.size, 
      obj.quantity, 
      obj.purchase_price, 
      obj.price, 
      obj.description, 
      obj.id_category, 
      obj.id_supplier
    ]);
    return affectedRows;
  },

  deleteIventoryItem: async (id) => {
    const [inventoryItem] = await db.query('DELETE FROM inventory WHERE id = ?', [id]);
    return inventoryItem;
  }
};

module.exports = Inventory;