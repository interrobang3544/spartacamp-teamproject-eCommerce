const BasketSevice = require('../services/baskets.service');

class BasketController {
  basketSevice = new BasketSevice();

  //* 장바구니 목록 가져오기
  getBaskets = async (req, res) => {
    const userId = 1;
    const basketData = await this.basketSevice.getBaskets(userId);
    return res.status(200).send(JSON.stringify(basketData));
  };

  //* 해당 장바구니 수량 수정
  patchBasketQuantity = async (req, res) => {
    const { id } = req.params;
    const { quantity } = req.body;

    const msg = await this.basketSevice.patchBasketQuantity(id, quantity);
    return res.status(200).send(msg);
  };

  //* 해당 장바구니 삭제
  deleteBasket = async (req, res) => {
    const { id } = req.params;
    const msg = await this.basketSevice.deleteBasket(id);
    return res.status(200).send(msg);
  };
}

module.exports = BasketController;
