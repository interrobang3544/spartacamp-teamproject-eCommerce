const sequelize = require('sequelize');
const Op = sequelize.Op;

class ProductRepository {
  constructor(ProductModel) {
    this.productModel = ProductModel;
  }

  //* Id 로 상품 가져오기
  findProductById = async (productId) => {
    const productData = await this.productModel.findOne({
      where: { productId },
    });
    return productData.dataValues;
  };
}

module.exports = ProductRepository;
