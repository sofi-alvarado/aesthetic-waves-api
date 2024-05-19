const db = require('../config/db');
const app = express()

// db.connect(function(err) {
//     if(err){
//         console.log("An error ocurred")
//     } else {
//         console.log("Connection succesfull")
//     }
// })

const getAllProducts = app.get("/product", (req, res) => {
    const sql = "SELECT * FROM product";
    db.query(sql, (err, data) => {
        if (err) return res.json("error");
        return res.json({products: data});
    })
})

module.exports = {
    getAllProducts
};