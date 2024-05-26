const db = require('../config/db');

const Address = {
  getAdress: async () => {
    const [[address]] = await db.query('CALL sp_show_address()');
    return address;
  },

  getAddressById: async (id) => {
    const [[address]] = await db.query('CALL sp_show_address_by_id(?)', [id]);
    return address;
  },

	editAddress: async (id, obj) => {
		const [{editedAddress}] = await db.query('CALL sp_edit_address(?,?,?,?,?,?,?,?)',
		[
			id,
			obj.first_name,
			obj.last_name,
			obj.address,
			obj.reference,
			obj.state,
			obj.city,
			obj.phone_number
		]);
		return editedAddress;
	},

	createAddress: async (obj) => {
		const newAddress = await db.query('CALL sp_create_address(?,?,?,?,?,?,?,?)',
		[
			obj.id_user,
			obj.first_name,
			obj.last_name,
			obj.address,
			obj.reference,
			obj.state,
			obj.city,
			obj.phone_number
		]);
		return newAddress;
	},

	deleteAddress: async (id) => {
		const deletedAddress = await db.query(' DELETE FROM address WHERE id = ?', [id]);
		return deletedAddress;
	}
}

module.exports = Address;