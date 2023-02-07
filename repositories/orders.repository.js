const sequelize = require('sequelize');
const Op = sequelize.Op;

class OrderRepository {
  constructor(OrderModel) {
    this.orderModel = OrderModel;
  }

  createOrder = async (dataArr) => {
    await dataArr.forEach((data) => {
      this.orderModel.create({ ...data });
    });
  };
}

module.exports = OrderRepository;
