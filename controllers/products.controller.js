const ProductService = require('../services/products.service');

class ProductsController {
  productService = new ProductService();

  getProducts = async (req, res, next) => {
    const products = await this.productService.findAllProduct();

    res.status(200).json({ data: products })
  }

}

module.exports = ProductsController;