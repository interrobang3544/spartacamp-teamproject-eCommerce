const express = require('express');
const router = express.Router();

const ProductsController = require('../controllers/products.controller');
const productsController = new ProductsController();

router.get('/', productsController.getProducts);

module.exports = router;