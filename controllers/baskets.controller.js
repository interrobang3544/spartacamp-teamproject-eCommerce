const BasketSevice = require('../services/baskets.service');

class BasketController {
  basketSevice = new BasketSevice();
}

exports.module = BasketController;
