const Address = require('../models/address');

const getAddress = async (req, res) => {
  try {
    const address = await Address.getAdress();
    res.status(200).json(address)
  } catch (error) {
    res.status(500).json({ message: error.message })
  };
};

const getAddressById = async (req, res) => {
	try {
		const address = await Address.getAddressById(req.params.id);
    if (address.length == 0) {
        res.status(404).json({
            error: 'No address for user with id ' + req.params.id
        });
    } else {
        res.send(address);
    }
  } catch {
		res.status(500).json({ message: error.message });
  }
}

const editAddress = async (req, res) => {
  try {
    await Address.editAddress(req.params.id, req.body);
    res.status(201).json({ message: 'Address updated successfully' });
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
}

const createAddress = async (req, res) => {
  try {
    await Address.createAddress(req.body);
    res.status(201).json({ message: 'Address created successfully' });
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
}

const deleteAddress = async (req, res) => {
  try {
    const deletedAddress = await Address.deleteAddress(req.params.id);
    if (deletedAddress == 0) {
      res.status(404).json({
        error: 'No address with id ' + req.params.id
      })
    } else {
      res.send('Address deleted successfully')
    }
  } catch (error) {
    res.status(500).json({ message: error.message})
  }
}

module.exports = {
	getAddress,
	getAddressById,
	editAddress,
  createAddress,
  deleteAddress
}