const BasketService = require('../services/baskets.service');
const fs = require('fs');

class BasketsController {
    basketService = new BasketService();
    

  CreateBasket = async (req, res, next) => {
    // const ify = res.locals
    // console.log('로컬스', ify);
    const userId = res.locals.user.userId;
    const { productId } = req.body;
    const quantity = 1
    const createBasketData = await this.basketService.createBasket(
      productId,
      userId,
      quantity
    );
    res.redirect('/baskets');
    // res.status(201).json({ data: createProductData });
  };
}

module.exports = BasketsController;
