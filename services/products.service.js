const ProductRepository = require('../repositories/products.repository');

class ProductService {
  productRepository = new ProductRepository();

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
}

module.exports = ProductService;