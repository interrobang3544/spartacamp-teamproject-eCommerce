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

  adminFindProductsBySearchWord = async (limit, offset, searchWord) => {
    const products = await this.productModel.findAndCountAll({
      raw: true,
      offset: offset,
      limit: limit,
      order: [['updatedAt', 'ASC']],
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
        ],
      },
    });

    return products;
  };

  createProduct = async (
    productName,
    productExp,
    price,
    productPhoto,
    quantity,
    userCount
  ) => {
    const createProductData = await this.productModel.create({
      productName,
      productExp,
      price,
      productPhoto,
      quantity,
      userCount,
    });

    return createProductData;
  };

  findProductById = async (productId) => {
    const product = await this.productModel.findByPk(productId);
    return product;
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
    const updateProductData = await this.productModel.update(
      {
        productName,
        productExp,
        price,
        productPhoto,
        quantity,
        userCount,
      },
      { where: { productId } }
    );

    return updateProductData;
  };

  deleteProduct = async (productId) => {
    const deleteProductData = await this.productModel.destroy({
      where: { productId },
    });

    return deleteProductData;
  };

  findAllProduct = async () => {
    const products = await this.productModel.findAll();

    return products;
  };

  updateUserCount = async (productId, userCount) => {
    const product = await this.findProductById(productId);
    let totalCount = JSON.parse(JSON.stringify(product)).userCount;
    totalCount += Number(userCount);
    await this.productModel.update(
      {
        userCount: totalCount,
      },
      {
        where: { productId },
      }
    );
    return;
  };
}

module.exports = ProductRepository;
