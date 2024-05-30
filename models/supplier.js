const db = require('../config/db');

const Supplier = {
  getSuppliers: async () => {
    const [[suppliers]] = await db.query('CALL sp_show_suppliers()');
    return suppliers;
  },

  getSupplierById: async (id) => {
    const [[supplier]] = await db.query('CALL sp_show_supplier_by_id(?)', [id]);
    return supplier;
  },

  editSupplier: async (id, obj) => {
		const [{editedSupplier}] = await db.query('CALL sp_edit_supplier(?,?)',
		[
			id,
			obj.supplier_name,
		]);
		return editedSupplier;
	},

	createSupplier: async (obj) => {
		try {
			const [rows, fields] = await db.query('CALL sp_create_supplier(?)', [obj.supplier_name]);
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

	deleteSupplier: async (id) => {
		const deletedSupplier = await db.query(' DELETE FROM supplier WHERE id = ?', [id]);
		return deletedSupplier;
	}
}

module.exports = Supplier;