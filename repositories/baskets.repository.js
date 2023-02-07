const sequelize = require('sequelize');
const Op = sequelize.Op;

class BasketRepository {
  constructor(BasketModel) {
    this.basketModel = BasketModel;
  }

  //* 해당 유저의 장바구니 목록 전체 가져오기
  //- 해당 유저의 생성일, 수정일을 제외한 바구니 데이터를 모두 가져온다.
  findBasketOfUser = async (userId) => {
    const baskets = await this.basketModel.findAll({
      where: {
        userId,
      },
    });

    //+ 장바구니 목록이 비었을 때 예외처리
    if (baskets.length === 0) {
      return;
    }

    //+ 장바구니 목록 전체를 순회하면서 필요한 데이터만 반환
    const basketsData = baskets.map((basket) => {
      const { createdAt, updatedAt, ...necessaryData } = basket.dataValues;
      return necessaryData;
    });
    return basketsData;
  };

  //* 장바구니 수량 수정
  updateBasketQuantity = async (basketId, quantity) => {
    const basket = await this.findOneBasket(basketId);
    let msg = '해당 장바구니가 없습니다.';

    //+ 장바구니가 비었을 때 예외처리
    if (!basket) {
      return msg;
    }

    //+ 장바구니 테이블 수량 수정
    await this.basketModel.update(
      { quantity },
      {
        where: {
          basketId,
        },
      }
    );
    msg = '수정이 완료되었습니다.';
    return msg;
  };

  //* 장바구니 목록 하나 삭제
  deleteBasket = async (basketId) => {
    const basket = await this.findOneBasket(basketId);
    let msg = '해당 장바구니가 없습니다.';

    //+ 장바구니가 비었을 때 예외처리
    if (!basket) {
      return msg;
    }

    //+ 장바구니 테이블 삭제
    await this.basketModel.destroy({
      where: {
        basketId,
      },
    });
    msg = '수정이 완료되었습니다.';
    return msg;
  };

  //* 장바구니 목록 하나 가져오기
  findOneBasket = async (basketId) => {
    const basket = await this.basketModel.findOne({
      where: {
        basketId,
      },
    });
    return basket;
  };
}

module.exports = BasketRepository;
