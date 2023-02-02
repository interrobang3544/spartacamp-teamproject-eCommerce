const BasketRepository = require('../repositories/baskets.repository');
const { Basket } = require('../models');

class BasketSevice {
  basketRepository = new BasketRepository();
}

exports.module = BasketSevice;
