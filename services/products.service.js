const ProductRepository = require('../repositories/products.repository');
const { Product } = require('../models');

class ProductService {
  ProductRepository = new ProductRepository(Product);

  adminFindAllProducts = async () => {
    const products = await this.ProductRepository.adminFindAllProducts();
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
