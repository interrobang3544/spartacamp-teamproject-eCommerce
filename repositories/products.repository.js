const sequelize = require('sequelize');
const Op = sequelize.Op;

class ProductRepository {
  constructor(ProductModel) {
    this.productModel = ProductModel;
  }

  getProductDataById = async (productId) => {
    try {
      const productData = await this.productModel.findAll({
        where: { productId },
      });
      return productData;
    } catch (error) {
      error.status = 500;
      throw error;
    }
  };

  adminFindAllProducts = async (limit, offset) => {
    const products = await this.productModel.findAndCountAll({
      raw: true,
      offset: offset,
      limit: limit,
      order: [['updatedAt', 'ASC']],
    });

    return products;
  };

  adminFindProductsBySearchWord = async (searchWord) => {
    const products = await this.productModel.findAll({
      where: {
        [Op.or]: [
          {
            productName: {
              [Op.like]: '%' + searchWord + '%',
            },
          },
          {
            productExp: {
              [Op.like]: '%' + searchWord + '%',
            },
          },
          {
            price: {
              [Op.like]: '%' + searchWord + '%',
            },
          },
          {
            quantity: {
              [Op.like]: '%' + searchWord + '%',
            },
          },
          {
            userCount: {
              [Op.like]: '%' + searchWord + '%',
            },
          },
        ],
      },
    });

    return products;
  };
}

module.exports = ProductRepository;
