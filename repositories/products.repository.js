const sequelize = require("sequelize");
const Op = sequelize.Op;

class ProductRepository {
  constructor(ProductModel) {
    this.productModel = ProductModel;
  }

  adminFindAllProducts = async () => {
    const users = await this.productModel.findAll();

    return users;
  };

  adminFindProductsBySearchWord = async (searchWord) => {
    const users = await this.productModel.findAll({
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

    return users;
  };
}

module.exports = ProductRepository;
