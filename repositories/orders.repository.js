const { Order } = require('../models');

class OrderRepository {
  getOrderDataById = async (userId) => {
    try {
      const orderData = await Order.findAll({ where: { userId } });
      return orderData;
    } catch (error) {
      error.status = 500;
      throw error;
    }
  };
}

module.exports = OrderRepository;
