const express = require('express');
const router = express.Router();

const UsersController = require('../controllers/users.controller');
const ProductsController = require('../controllers/products.controller');
const usersController = new UsersController();
const productsController = new ProductsController();

router.get('/users', usersController.adminGetAllUsers);
router.get('/users/search/:searchword', usersController.adminGetUsersBySearchWord);
router.get('/products', productsController.adminGetAllProducts);
router.get('/products/search/:searchword', productsController.adminGetProductsBySearchWord);

module.exports = router;