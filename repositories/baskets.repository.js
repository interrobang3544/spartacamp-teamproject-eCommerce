const sequelize = require('sequelize');
const Op = sequelize.Op;

class BasketRepository {
  constructor(BasketModel) {
    this.basketModel = BasketModel;
  }

  //* 장바구니 목록 가져오기
  //- 해당 유저의 바구니 데이터를 모두 가져온다.
  findBasket = async (userId) => {
    const baskets = await this.basketModel.findAll({
      where: {
        userId,
      },
    });
    const basketsData = baskets.map((basket) => {
      const { createdAt, updatedAt, ...necessaryData } = basket.dataValues;
      return necessaryData;
    });
    return basketsData;
  };
}

module.exports = BasketRepository;
