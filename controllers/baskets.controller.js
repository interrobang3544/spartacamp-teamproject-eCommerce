const BasketService = require('../services/baskets.service');
const fs = require('fs');

class BasketController {
  basketService = new BasketService();

  //* 장바구니 목록 가져오기
  getBaskets = async (req, res) => {
    const { userId } = res.locals.user;
    const basketData = await this.basketService.getBaskets(userId);
    const { basketList, totalOrderPrice } = basketData;
    return res.status(200).render('basket', { basketList, totalOrderPrice });
  };

  //* 해당 장바구니 수량 수정
  patchBasketQuantity = async (req, res) => {
    const { id, quantity } = req.body;

    const msg = await this.basketService.patchBasketQuantity(id, quantity);
    return res.status(200).send(msg);
  };

  //* 해당 장바구니 삭제
  deleteBasket = async (req, res) => {
    const { id } = req.params;
    const msg = await this.basketService.deleteBasket(id);
    return res.status(200).send(msg);
  };

  //* 장바구니 주문
  orderBasket = async (req, res) => {
    const { orderList } = req.body;
    req.session.orderList = orderList;
    return res.sendStatus(201);
  };

  CreateBasket = async (req, res, next) => {
    // const ify = res.locals
    // console.log('로컬스', ify);
    const userId = res.locals.user.userId;
    const { productId } = req.body;
    const quantity = 1;
    const createBasketData = await this.basketService.createBasket(
      productId,
      userId,
      quantity
    );
    // res.redirect('/baskets');
    res.status(201).json({ data: createBasketData });
  };
}

module.exports = BasketController;
