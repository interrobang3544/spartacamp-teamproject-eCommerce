const BasketRepository = require('../repositories/baskets.repository');
const { Basket } = require('../models');

class BasketService {
    basketRepository = new BasketRepository(Basket);

  createBasket = async (
    productId,
    userId,
    quantity
  ) => {
    const createBasketData = await this.basketRepository.createBasket(
        productId,
        userId,
        quantity
    );

    return {
      productId: createBasketData.productId,
      userId: createBasketData.userId,
      quantity: createBasketData.quantity
    };
  };
}

module.exports = BasketService;