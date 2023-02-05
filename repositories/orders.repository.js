const sequelize = require('sequelize');
const Op = sequelize.Op;

class OrderRepository {
  constructor(OrderModel) {
    this.orderModel = OrderModel;
  }

  createOrder()
}

module.exports = OrderRepository;
