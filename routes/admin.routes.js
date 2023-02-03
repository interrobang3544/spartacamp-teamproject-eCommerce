const express = require('express');
const router = express.Router();
const { upload } = require('../middlewares/image-upload-middleware');

const UsersController = require('../controllers/users.controller');
const ProductsController = require('../controllers/products.controller');
const usersController = new UsersController();
const productsController = new ProductsController();

router.get('/users', usersController.adminGetAllUsers);
router.get(
  '/users/search/:searchword',
  usersController.adminGetUsersBySearchWord
);

router.post(
  '/products',
  upload.single('product-img'),
  productsController.adminCreateProduct
);
router.get('/products', productsController.adminGetAllProducts);
router.get(
  '/products/search/:searchword',
  productsController.adminGetProductsBySearchWord
);
router.post(
  '/products/modify',
  upload.single('modify-product-img'),
  productsController.adminUpdateProduct
);
router.delete('/products/:productId', productsController.adminDeleteProduct);

module.exports = router;
