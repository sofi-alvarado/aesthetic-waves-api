const express = require('express');
require('express-async-errors');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const db = require('./config/db')
const routes = require('./controllers/products')


// const productRoutes = require('./routes/products');
// const orderRoutes = require('./routes/orders');


app.use(morgan('dev'));
// app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); //Change to client URL
    res.header(
        'Access-Control-Allow-Headers', 
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );

    if(req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }

    next();
})

//Routes

// app.use('/products', productRoutes);
// app.use('/orders', orderRoutes);

app.use('/product', routes)

db.query("SELECT 1")
    .then(() => {
        console.log('db connection succeed')
    })
    .catch(err => console.log('db connnection failed. \n' + err))

// Handling errors
// app.use((req, res, next) => {
//     const error = new Error('Not found');
//     error.status = 404
//     next(error);
// })

app.use((err, req, res, next) => {
    console.log(err);
    res.status(err.status || 500).json({
        error: {
            message: 'Something went wrong! :('
        }
    });
})

module.exports = app;