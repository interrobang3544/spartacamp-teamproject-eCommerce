const BasketRepository = require('../repositories/baskets.repository');
const ProductRepository = require('../repositories/products.repository');
const { Basket, Product } = require('../models');

class BasketSevice {
  basketRepository = new BasketRepository(Basket);
  productRepository = new ProductRepository(Product);

  //* 장바구니 목록 가져오기
  //- 가져온 바구니의 정보를 토대로 상품 정보도 결합해서 반환
  getBaskets = async (userId) => {
    const baskets = await this.basketRepository.findBasket(userId);
    if (Array.isArray(baskets)) {
      const basketList = await Promise.all(
        baskets.map(async (basket) => {
          const { productId, quantity } = basket;
          const product = await this.productRepository.findProductById(
            productId
          );
          const { productName, price, productPhoto } = product;
          return { productName, price, productPhoto, basketQuantity: quantity };
        })
      );
      return basketList;
    }
    return baskets;
  };
}

module.exports = BasketSevice;
