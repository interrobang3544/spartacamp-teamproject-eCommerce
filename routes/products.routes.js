const express = require('express');
const router = express.Router();

const ProductsController = require('../controllers/products.controller');
const productsController = new ProductsController();

router.get('/', productsController.getProducts);
router.get('/:productId', productsController.getProductspec);

module.exports = router;