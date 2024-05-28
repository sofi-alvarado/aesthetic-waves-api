const db = require('../config/db');

const Brand = {
  getBrands: async () => {
    const [[brand]] = await db.query('CALL sp_show_brand()');
    return brand;
  },

  getBrandById: async (id) => {
    const [[brand]] = await db.query('CALL sp_show_brand_by_id(?)', [id]);
    return brand;
  },

	editBrand: async (id, obj) => {
		const [{editedbrand}] = await db.query('CALL sp_edit_brand(?,?)',
		[
			id,
			obj.brand_name,
		]);
		return editedbrand;
	},

	createBrand: async (obj) => {
		try {
			const [rows, fields] = await db.query('CALL sp_create_brand(?)', [obj.brand_name]);
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

	deleteBrand: async (id) => {
		const deletedBrand = await db.query(' DELETE FROM brand WHERE id = ?', [id]);
		return deletedBrand;
	}
}

module.exports = Brand;