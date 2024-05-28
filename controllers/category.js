const Category = require('../models/category');

const getCategories = async (req, res) => {
  try {
    const category = await Category.getCategories();
    res.status(200).json(category)
  } catch (error) {
    res.status(500).json({ message: error.message })
  };
};

const getCategoryById = async (req, res) => {
	try {
		const category = await Category.getCategoryById(req.params.id);
    if (category.length == 0) {
        res.status(404).json({
            error: 'No category with id ' + req.params.id
        });
    } else {
        res.send(category);
    }
  } catch {
		res.status(500).json({ message: error.message });
  }
}

const editCategory = async (req, res) => {
  try {
    await Category.editCategory(req.params.id, req.body);
    res.status(201).json({ message: 'Category updated successfully' });
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
}

const createCategory = async (req, res) => {
	try {
		const newCategory = await Category.createCategory(req.body);
		res.status(201).json({ message: newCategory });
	} catch (error) {
			res.status(500).json({ message: error.message });
	}
}

const deleteCategory = async (req, res) => {
  try {
    const deletedCategory = await Category.deleteCategory(req.params.id);
    if (deletedCategory == 0) {
      res.status(404).json({
        error: 'No category with id ' + req.params.id
      })
    } else {
      res.send('Category deleted successfully')
    }
  } catch (error) {
    res.status(500).json({ message: error.message})
  }
}

module.exports = {
	getCategories,
	getCategoryById,
	editCategory,
  createCategory,
  deleteCategory
}