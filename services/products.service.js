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

  createProduct = async (productName, productExp, price, productPhoto, quantity, userCount) => {
    const createProductData = await this.ProductRepository.createProduct(
      productName,
      productExp,
      price,
      productPhoto,
      quantity,
      userCount,
    );

    return {
      productName: createProductData.productName,
      productExp: createProductData.productExp,
      price: createProductData.price,
      productPhoto: createProductData.productPhoto,
      quantity: createProductData.quantity,
      userCount: createProductData.userCount,
      createdAt: createProductData.createdAt,
      updatedAt: createProductData.updatedAt,
    };
  };

  deleteProduct = async (productId) => {
    const findProduct = await this.ProductRepository.findProductById(productId);
    if (!findProduct) throw new Error("Review doesn't exist");

    await this.ProductRepository.deleteProduct(productId);

    return {
      productId: findProduct.productId,
      productName: findProduct.productName,
      productExp: findProduct.productExp,
      price: findProduct.price,
      productPhoto: findProduct.productPhoto,
      quantity: findProduct.quantity,
      userCount: findProduct.userCount,
      createdAt: findProduct.createdAt,
      updatedAt: findProduct.updatedAt,
    };
  };
}

module.exports = ProductService;
