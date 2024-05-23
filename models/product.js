const db = require('../config/db');

const Product = {
  getAllProducts: async () => {
    const [[products]] = await db.query('CALL sp_show_products()');
    return { products: products};
  },

	getProductById: async (id) => {
		const [[product]] = await db.query('CALL sp_show_product_by_id(?)', [id]);
    return product;
	},

	createEditProduct: async (obj, id = 0) => {
		const [{affectedRows}] = await db.query('CALL sp_add_edit_product(?,?,?,?,?,?,?,?)', 
    [id, obj.product_name, obj.description, obj.price, obj.size, obj.product_img_path, obj.id_brand, obj.id_category]);
    return affectedRows;
	},

	deleteProduct: async (id) => {
		const [{affectedRows}] = await db.query('DELETE FROM product WHERE id = ?', [id]);
    return affectedRows;
	}
};

module.exports = Product;