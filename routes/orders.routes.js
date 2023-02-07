const express = require('express');
const OrderController = require('../controllers/orders.controller');

const router = express.Router();
const orderController = new OrderController();

router.route('/').get(orderController.getOrder).post();

module.exports = router;
