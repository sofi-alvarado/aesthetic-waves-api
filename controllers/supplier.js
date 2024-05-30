const Supplier = require('../models/supplier');

const getSuppliers = async (req, res) => {
  try {
    const supplier = await Supplier.getSuppliers();
    res.status(200).json(supplier)
  } catch (error) {
    res.status(500).json({ message: error.message })
  };
};

const getSupplierById = async (req, res) => {
	try {
		const supplier = await Supplier.getSupplierById(req.params.id);
    if (supplier.length == 0) {
        res.status(404).json({
            error: 'No supplier with id ' + req.params.id
        });
    } else {
        res.send(supplier);
    }
  } catch (error) {
		res.status(500).json({ message: error.message });
  }
}

const editSupplier = async (req, res) => {
  try {
    await Supplier.editSupplier(req.params.id, req.body);
    res.status(201).json({ message: 'Supplier updated successfully' });
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
}

const createSupplier = async (req, res) => {
	try {
		const newSupplier = await Supplier.createSupplier(req.body);
		res.status(201).json({ message: newSupplier });
	} catch (error) {
			res.status(500).json({ message: error.message });
	}
}

const deleteSupplier = async (req, res) => {
  try {
    const deletedSupplier = await Supplier.deleteSupplier(req.params.id);
    if (deletedSupplier == 0) {
      res.status(404).json({
        error: 'No supplier with id ' + req.params.id
      })
    } else {
      res.send('Supplier deleted successfully')
    }
  } catch (error) {
    res.status(500).json({ message: error.message})
  }
}

module.exports = {
	getSuppliers,
	getSupplierById,
	editSupplier,
  createSupplier,
  deleteSupplier
}