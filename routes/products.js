const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling GET request to /products'
    })

    const sql = "SELECT * FROM product";
    db.query(sql, (err, data) => {
        if (err) return res.json("error");
        return res.json({products: data});
    })
})


router.post('/', (req, res, next) => {
    const product = {
        name: req.body.name,
        price: req.body.price
    };

    res.status(201).json({
        messagge: 'Handling Post request to /products',
        createdProduct: product
    })
})

router.get('/:productId', (req, res, next) => {
    const id = req.params.productId;
    if (id === 'special') {
        res.status(200).json({
            message: 'You discovered a special ID'
        });
    } else {
        res.status(200).json({
            message: 'You passed an ID'
        })
    }
})

router.patch('/:productId', (req, res, next) => {
    res.status(200).json({
        message: 'Updated Product'
    })
})

router.delete('/:productId', (req, res, next) => {
    res.status(200).json({
        message: 'Deleted Product'
    })
})

module.exports = router;