const sequelize = require("sequelize");
const Op = sequelize.Op;

class ProductRepository {
  constructor(ProductModel) {
    this.productModel = ProductModel;
  }

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
