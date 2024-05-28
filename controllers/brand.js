const Brand = require('../models/brand');

const getBrands = async (req, res) => {
  try {
    const brand = await Brand.getBrands();
    res.status(200).json(brand)
  } catch (error) {
    res.status(500).json({ message: error.message })
  };
};

const getBrandById = async (req, res) => {
	try {
		const brand = await Brand.getBrandById(req.params.id);
    if (brand.length == 0) {
        res.status(404).json({
            error: 'No brand with id ' + req.params.id
        });
    } else {
        res.send(brand);
    }
  } catch {
		res.status(500).json({ message: error.message });
  }
}

const editBrand = async (req, res) => {
  try {
    await Brand.editBrand(req.params.id, req.body);
    res.status(201).json({ message: 'Brand updated successfully' });
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
}

const createBrand = async (req, res) => {
	try {
		const newBrand = await Brand.createBrand(req.body);
		res.status(201).json({ message: newBrand });
	} catch (error) {
			res.status(500).json({ message: error.message });
	}
}

const deleteBrand = async (req, res) => {
  try {
    const deletedBrand = await Brand.deleteBrand(req.params.id);
    if (deletedBrand == 0) {
      res.status(404).json({
        error: 'No brand with id ' + req.params.id
      })
    } else {
      res.send('Brand deleted successfully')
    }
  } catch (error) {
    res.status(500).json({ message: error.message})
  }
}

module.exports = {
	getBrands,
	getBrandById,
	editBrand,
  createBrand,
  deleteBrand
}