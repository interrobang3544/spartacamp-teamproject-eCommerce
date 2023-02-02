const sequelize = require('sequelize');
const Op = sequelize.Op;

class BasketRepository {
  constructor(productModel) {
    this.productModel = productModel;
  }
}

exports.module = BasketRepository;
