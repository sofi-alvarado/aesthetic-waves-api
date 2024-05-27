const db = require('../config/db');

const DeliveryService = {
  getAdress: async () => {
    const [[deliveryService]] = await db.query('CALL sp_show_delivery_service()');
    return deliveryService;
  },

  getDeliveryServiceById: async (id) => {
    const [[deliveryService]] = await db.query('CALL sp_show_delivery_service_by_id(?)', [id]);
    return deliveryService;
  },

	editDeliveryService: async (id, obj) => {
		const [{editedDeliveryService}] = await db.query('CALL sp_edit_delivery_service(?, ?, ?)',
		[
			id,
			obj.delivery_service_name,
			obj.cost
		]);
		return editedDeliveryService;
	},

	createDeliveryService: async (obj) => {
		try {
			const [rows, fields] = await db.query('CALL sp_create_delivery_service(?, ?)', [obj.delivery_service_name, obj.cost]);
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

	deleteDeliveryService: async (id) => {
		const deletedDeliveryService = await db.query(' DELETE FROM delivery_service WHERE id = ?', [id]);
		return deletedDeliveryService;
	}
}

module.exports = DeliveryService;