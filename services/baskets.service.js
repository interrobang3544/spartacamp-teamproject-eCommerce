const BasketRepository = require('../repositories/baskets.repository');
const { Basket } = require('../models');

class BasketSevice {
  basketRepository = new BasketRepository(Basket);

  getBaskets = async (userId) => {
    const baskets = await this.basketRepository.findBasket(userId);
    return baskets;
  };
}

module.exports = BasketSevice;
