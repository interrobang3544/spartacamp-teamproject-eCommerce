const BasketRepository = require('../repositories/baskets.repository');
const { Basket } = require('../models');

class BasketSevice {
  basketRepository = new BasketRepository(Basket);

  //* 장바구니 목록 가져오기
  //- 가져온 바구니의 정보를 토대로 상품 정보도 결합해서 반환
  getBaskets = async (userId) => {
    const baskets = await this.basketRepository.findBasket(userId);
    return baskets;
  };
}

module.exports = BasketSevice;
