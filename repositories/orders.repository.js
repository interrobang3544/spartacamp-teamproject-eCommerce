const sequelize = require('sequelize');
const Op = sequelize.Op;

class OrderRepository {
  constructor(OrderModel) {
    this.orderModel = OrderModel;
  }
  getOrderDataById = async (userId) => {
    try {
      const orderData = await this.orderModel.findAll({ where: { userId } });
      return orderData;
    } catch (error) {
      error.status = 500;
      throw error;
    }
  };
  createOrder = async (dataArr) => {
    await dataArr.forEach((data) => {
      this.orderModel.create({ ...data });
    });
  };
}

module.exports = OrderRepository;
