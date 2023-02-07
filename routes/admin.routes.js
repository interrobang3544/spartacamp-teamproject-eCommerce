const express = require('express');
const router = express.Router();
const { upload } = require('../middlewares/image-upload-middleware');
const authMiddleware = require('../middlewares/auth');

const UsersController = require('../controllers/users.controller');
const ProductsController = require('../controllers/products.controller');
const usersController = new UsersController();
const productsController = new ProductsController();

router.get('/users', usersController.adminGetAllUsers);
router.get(
  '/users/search/:searchword',
  usersController.adminGetUsersBySearchWord
);
router.patch('/users/:userId', usersController.adminUpdateUser)
router.delete('/users/:userId', usersController.adminDeleteUser);

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
); // patch여야 하는데 form태그에서 action으로 줄 수 없음
router.delete('/products/:productId', productsController.adminDeleteProduct);

module.exports = router;
