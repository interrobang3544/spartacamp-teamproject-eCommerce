const ProductRepository = require('../repositories/products.repository');
const { Product } = require('../models');

class ProductService {
  ProductRepository = new ProductRepository(Product);

  adminFindAllProducts = async (limit, offset) => {
    const products = await this.ProductRepository.adminFindAllProducts(limit, offset);
    return products
  };

  adminFindProductsBySearchWord = async (searchWord) => {
    const products = await this.ProductRepository.adminFindProductsBySearchWord(searchWord);
    return products.map((product) => {
      return {
        productId: product.productId,
        productName: product.productName,
        productExp: product.productExp,
        price: product.price,
        quantity: product.quantity,
        userCount: product.userCount,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt,
      };
    });
  };
}

module.exports = ProductService;
