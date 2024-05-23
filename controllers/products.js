const Product = require('../models/product');

const getAllProducts = async (req, res) => {
  try {
    const product = await Product.getAllProducts();
    res.status(200).json(product)
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProductById = async (req, res) => {
  try {
		const product = await Product.getProductById(req.params.id);
    console.log(product)
    if (product.length == 0) {
        res.status(404).json({
            error: 'No product with id ' + req.params.id
        });
    } else {
        res.send(product);
    }
  } catch {
		res.status(500).json({ message: error.message })
  }
};

const createEditProduct = async (req, res) => {
	await Product.createEditProduct(req.body);
	res.status(201).send('Created succesfully');
};

const deleteProduct = async (req, res) => {
  try {
		const affectedProduct= await Product.deleteProduct(req.params.id);
    if (affectedProduct == 0) {
        res.status(404).json({
            error: 'No product with id ' + req.params.id
        });
    } else {
        res.send('Deleted successfully');
    }
	} catch {
		res.status(500).json({ message: error.message })
	}
}

module.exports = {
    getAllProducts,
    getProductById,
    createEditProduct,
    deleteProduct
};