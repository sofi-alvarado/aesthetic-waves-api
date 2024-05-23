const db = require('../config/db')

//Showing all the products to the user

module.exports.getAllProducts = async () => {
    const [[products]] = await db.query('CALL sp_show_products()')
    return { products: products} ;
}

//Showing a single product to the user

module.exports.getProductById = async (id) => {
    const [[product]] = await db.query('CALL sp_show_product_by_id(?)', [id]);
    return product;
}

module.exports.deleteProduct = async (id) => {
    const [{affectedRows}] = await db.query('DELETE FROM product WHERE id = ?', [id])
    return affectedRows;
}

module.exports.addOrEditProduct = async (obj, id = 0) => {
    const [{affectedRows}] = await db.query('CALL sp_add_edit_product(?,?,?,?,?,?,?,?)', 
    [id, obj.product_name, obj.description, obj.price, obj.size, obj.product_img_path, obj.id_brand, obj.id_category])
    return affectedRows;
}

