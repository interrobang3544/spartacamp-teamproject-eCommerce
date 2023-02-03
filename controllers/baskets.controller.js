const BasketSevice = require('../services/baskets.service');

class BasketController {
  basketSevice = new BasketSevice();

  getBaskets = async (req, res) => {
    const userId = 1;
    const basketData = await this.basketSevice.getBaskets(userId);
    return res.send(JSON.stringify(basketData));
  };
}

module.exports = BasketController;
