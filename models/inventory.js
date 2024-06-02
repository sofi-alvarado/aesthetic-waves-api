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

  createInventoryItem: async (obj) => {
		try {
			const [rows, fields] = await db.query('CALL sp_create_inventory(?,?,?,?,?,?,?,?,?,?)', 
      [
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
			if (rows.length > 0) {
					const message = rows[0][0].message;
					return message;
			} else {
					throw new Error('No response from stored procedure');
			}
		} catch (error) {
				throw error;
		}
	},

  editInventoryItem: async (id, obj) => {
		const [{editedInventory}] = await db.query('CALL sp_edit_inventory(?,?,?,?,?,?,?,?,?,?,?)',
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
		return editedInventory;
	},

  deleteIventoryItem: async (id) => {
    const [inventoryItem] = await db.query('DELETE FROM inventory WHERE id = ?', [id]);
    return inventoryItem;
  }
};

module.exports = Inventory;