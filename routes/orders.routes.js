const express = require('express');
const OrderController = require('../controllers/orders.controller');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();
const orderController = new OrderController();

router
  .route('/')
  .get(authMiddleware, orderController.getOrder)
  .post(authMiddleware, orderController.postOrder);

module.exports = router;
