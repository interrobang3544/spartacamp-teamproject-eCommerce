const { Products } = require('../models');

class ProductRepository {
  findAllProduct = async () => {
    const products = await Products.findAll();

    return products;
  }
}

module.exports = ProductRepository;