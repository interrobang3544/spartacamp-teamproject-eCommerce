const BasketRepository = require('../repositories/baskets.repository');
const ProductRepository = require('../repositories/products.repository');
const { Basket, Product } = require('../models');

class BasketSevice {
  basketRepository = new BasketRepository(Basket);
  productRepository = new ProductRepository(Product);

  //* 해당 유저의 장바구니 목록 전체 가져오기
  //- 가져온 바구니의 정보를 토대로 상품 정보도 결합해서 반환
  getBaskets = async (userId) => {
    const baskets = await this.basketRepository.findBasketOfUser(userId);
    let totalOrderPrice = 0;

    //+ 장바구니가 비어있지 않으면
    if (Array.isArray(baskets)) {
      //+ 가져온 장바구니 목록을 순회하면서 상품의 정보를 가져와 원하는 형태의 데이터를 반환
      const basketList = await Promise.all(
        baskets.map(async (basket) => {
          const { basketId, productId, quantity } = basket;
          const product = await this.productRepository.findProductById(
            productId
          );
          const { productName, price, productPhoto } = product;
          totalOrderPrice += price * quantity;
          return {
            basketId,
            productName,
            //+ toLocaleString 을 이용한 3자리마다 콤마 찍기
            totalPrice: (price * quantity).toLocaleString('ko-KR'),
            productPhoto,
            basketQuantity: quantity,
          };
        })
      );

      //+ 정규식을 이용한 3자리마다 콤마 찍기
      totalOrderPrice = String(totalOrderPrice).replace(
        /(\d)(?=(?:\d{3})+(?!\d))/g,
        '$1,'
      );

      return { basketList, totalOrderPrice };
    }
    return { basketList: null, totalOrderPrice };
  };

  //* 해당 장바구니 수량 수정
  patchBasketQuantity = async (basketId, quantity) => {
    const msg = await this.basketRepository.updateBasketQuantity(
      basketId,
      quantity
    );
    return msg;
  };

  //* 해당 장바구니 삭제
  deleteBasket = async (basketId) => {
    const msg = await this.basketRepository.deleteBasket(basketId);
    return msg;
  };
}

module.exports = BasketSevice;
