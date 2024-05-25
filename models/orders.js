const db = require('../config/db');

const Orders = {
    showOrders: async () => {
        const [[orders]] = await db.query('CALL sp_show_orders()');
        return orders;
    }
}

module.exports = Orders;