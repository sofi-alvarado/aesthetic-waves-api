const db = require('../config/db');

const Category = {
  getCategories: async () => {
    const [[categories]] = await db.query('CALL sp_show_categories()');
    return categories;
  },

  getCategoryById: async (id) => {
    const [[category]] = await db.query('CALL sp_show_category_by_id(?)', [id]);
    return category;
  },

    editCategory: async (id, obj) => {
		const [{editedCategory}] = await db.query('CALL sp_edit_category(?,?)',
		[
			id,
			obj.category_name,
		]);
		return editedCategory;
	},

	createCategory: async (obj) => {
		try {
			const [rows, fields] = await db.query('CALL sp_create_category(?)', [obj.category_name]);
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

	deleteCategory: async (id) => {
		const deletedCategory = await db.query(' DELETE FROM category WHERE id = ?', [id]);
		return deletedCategory;
	}
}

module.exports = Category;