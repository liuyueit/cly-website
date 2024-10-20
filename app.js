const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const paypal = require('paypal-rest-sdk');
require('dotenv').config();

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/ecommerceDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// PayPal SDK configuration
paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': process.env.PAYPAL_CLIENT_ID,
    'client_secret': process.env.PAYPAL_CLIENT_SECRET
});

// Define your Product schema
const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    description: String
});
const Product = mongoose.model('Product', productSchema);

// Homepage: Display products
app.get('/', async (req, res) => {
    const products = await Product.find();
    res.render('index', { products: products });
});

// Payment route
app.post('/pay', async (req, res) => {
    const productId = req.body.productId;
    const product = await Product.findById(productId);

    // PayPal integration or Stripe integration based on user selection
    if (req.body.paymentMethod === 'paypal') {
        // PayPal payment setup
    } else {
        // Stripe payment setup
    }
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
});

//MongoDB:insert 3 product items into mongoDB
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/ecommerceDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    description: String
});

const Product = mongoose.model('Product', productSchema);

const product1 = new Product({
    name: 'Item 1',
    price: 10.00,
    description: 'Description for item 1'
});

const product2 = new Product({
    name: 'Item 2',
    price: 20.00,
    description: 'Description for item 2'
});

const product3 = new Product({
    name: 'Item 3',
    price: 30.00,
    description: 'Description for item 3'
});

Product.insertMany([product1, product2, product3], (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('Successfully inserted 3 products.');
    }
    mongoose.connection.close();
});
