const sequelize = require('sequelize');
const Op = sequelize.Op;

class BasketRepository {
  constructor(BasketModel) {
    this.basketModel = BasketModel;
  }

  //* 장바구니 목록 가져오기
  //- 해당 유저의 생성일, 수정일을 제외한 바구니 데이터를 모두 가져온다.
  findBasketOfUser = async (userId) => {
    const baskets = await this.basketModel.findAll({
      where: {
        userId,
      },
    });

    //* 장바구니 비었을 때 예외처리
    if (baskets.length === 0) {
      return '장바구니가 비어있습니다.';
    }
    const basketsData = baskets.map((basket) => {
      const { createdAt, updatedAt, ...necessaryData } = basket.dataValues;
      return necessaryData;
    });
    return basketsData;
  };

  updateBasketQuantity = async (basketId, quantity) => {
    const basket = await this.basketModel.findOne({
      where: {
        basketId,
      },
    });
    let msg = '해당 장바구니가 없습니다.';
    if (basket) {
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
    }
    return msg;
  };
}

module.exports = BasketRepository;
