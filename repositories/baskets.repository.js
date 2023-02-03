const sequelize = require('sequelize');
const Op = sequelize.Op;

class BasketRepository {
  constructor(BasketModel) {
    this.basketModel = BasketModel;
  }

  findBasket = async (userId) => {
    const baskets = await this.basketModel.findAll({
      where: {
        userId,
      },
    });
    const basketsData = baskets.map((basket) => {
      const { basketId, userId, productId, quantity } = basket.dataValues;
      return { basketId, userId, productId, quantity };
    });
    return basketsData;
  };
}

module.exports = BasketRepository;
