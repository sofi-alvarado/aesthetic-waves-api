const express = require ('express');
const router = express.Router();
const db = require('../config/db')
const service = require('../services/products')

router.get('/', async (req, res) => {
    const products = await service.getAllProducts()
    res.send(products)
})

router.get('/:id', async (req, res) => {
    const product = await service.getProductById(req.params.id);
    console.log(product)
    if (product.length == 0) {
        // res.status(404).json('no record with given id: ' + req.params.id);
        res.status(404).json({
            error: 'No product with id ' + req.params.id
        });
    } else {
        res.send(product);
    }
})

router.delete('/:id', async (req, res) => {
    const affectedProduct= await service.deleteProduct(req.params.id);
    if (affectedProduct == 0) {
        // res.status(404).json('No record with the given id: ' + req.params.id)
        res.status(404).json({
            error: 'No product with id ' + req.params.id
        });
    } else {
        res.send('Deleted successfully');
    }
})

router.post('/', async (req, res) => {
    await service.addOrEditProduct(req.body);
    res.status(201).send('Created succesfully');
})

module.exports = router;