const sequelize = require('sequelize');
const Op = sequelize.Op;

class BasketsRepository {
  constructor(BasketModel) {
    this.basketModel = BasketModel;
  }

  createBasket = async (
    productId,
    userId,
    quantity
  ) => {
    const createBasketData = await this.basketModel.create({
        productId,
        userId,
        quantity
    });

    return createBasketData;
  };
}

module.exports = BasketsRepository;
