const Orders = require('../models/orders')

const showOrders = async (req, res) => {
    try {
        const orders = await Orders.showOrders();
        res.status(200).json(orders);

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = {
    showOrders
}