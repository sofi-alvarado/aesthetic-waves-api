const express = require('express');
const morgan = require('morgan');

const app = express();
const bodyParser = require('body-parser');

require('express-async-errors');
require('dotenv').config();

const port = 5000;
const db = require('./config/db');

const productRoutes = require('./routes/products');
const inventoryRoutes = require('./routes/inventory');
const orderRoutes = require('./routes/orders');
const addressRoutes = require('./routes/address');
const brandRoutes = require('./routes/brand');
const deliveryServiceRoutes = require('./routes/deliveryService');
const categoryRoutes = require('./routes/category');

// General middlewares
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//DB Connection
db.query("SELECT 1")
  .then(() => {
    console.log('db connection succeed');
		app.listen(port, 
			() => console.log('Server started at 5000'));
  })
  .catch(err => console.log('Database connnection failed. \n' + err));

// Allow others origins
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
app.get("/", (req, res) => res.json("Hello!"));
app.use('/products', productRoutes);
app.use('/inventory', inventoryRoutes);
app.use('/orders', orderRoutes);
app.use('/address', addressRoutes);
app.use('/brands', brandRoutes);
app.use('/delivery-service', deliveryServiceRoutes);
app.use('/categories', categoryRoutes);

// Handling errors

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404
    next(error);
})

app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.status || 500).json({
      error: {
          message: 'Something went wrong! :('
      }
  });
})

module.exports = app;