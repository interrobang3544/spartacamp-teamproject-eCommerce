const ProductRepository = require('../repositories/products.repository');
const { Product } = require('../models');

class ProductService {
  productRepository = new ProductRepository(Product);

  adminFindAllProducts = async (limit, offset) => {
    const products = await this.productRepository.adminFindAllProducts(
      limit,
      offset
    );
    return products;
  };

  adminFindProductsBySearchWord = async (searchWord) => {
    const products = await this.productRepository.adminFindProductsBySearchWord(
      searchWord
    );
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

  createProduct = async (
    productName,
    productExp,
    price,
    productPhoto,
    quantity,
    userCount
  ) => {
    const createProductData = await this.productRepository.createProduct(
      productName,
      productExp,
      price,
      productPhoto,
      quantity,
      userCount
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

  updateProduct = async (
    productId,
    productName,
    productExp,
    price,
    productPhoto,
    quantity,
    userCount
  ) => {
    const findProduct = await this.productRepository.findProductById(productId);
    if (!findProduct) throw new Error("Review doesn't exist");

    await this.productRepository.updateProduct(
      productId,
      productName,
      productExp,
      price,
      productPhoto,
      quantity,
      userCount
    );

    const updateProduct = await this.productRepository.findProductById(
      productId
    );

    return {
      productId: updateProduct.productId,
      productName: updateProduct.productName,
      productExp: updateProduct.productExp,
      price: updateProduct.price,
      productPhoto: updateProduct.productPhoto,
      quantity: updateProduct.quantity,
      userCount: updateProduct.userCount,
      createdAt: updateProduct.createdAt,
      updatedAt: updateProduct.updatedAt,
    };
  };

  deleteProduct = async (productId) => {
    const findProduct = await this.productRepository.findProductById(productId);
    if (!findProduct) throw new Error("Review doesn't exist");

    await this.productRepository.deleteProduct(productId);

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
  
  findAllProduct = async () => {
    const allProduct = await this.productRepository.findAllProduct();

    allProduct.sort((a, b) => {
      return b.createdAt - a.createdAt;
    })

    return allProduct.map(product => {
      return {
        productId: product.productId,
        productName: product.productName,
        productExp: product.productExp,
        price: product.price,
        productPhoto: product.productPhoto,
        quantity: product.quantity,
        userCount: product.userCount,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt
      }
    });
  }

  findProductSpec = async (productId) => {
    const findProductSpec = await this.productRepository.getProductDataById(productId);
    if (!findProductSpec) throw new Error("Review doesn't exist");

    return findProductSpec.map((product) => {
      return {
        productId: product.productId,
        productName: product.productName,
        productExp: product.productExp,
        price: product.price,
        productPhoto: product.productPhoto,
        quantity: product.quantity,
        userCount: product.userCount,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt
      };
    });
  };
}

module.exports = ProductService;