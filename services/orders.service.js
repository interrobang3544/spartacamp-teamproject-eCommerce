const OrderRepository = require('../repositories/orders.repository');
const BasketRepository = require('../repositories/baskets.repository');
const ProductRepository = require('../repositories/products.repository');
const UserRepository = require('../repositories/users.repository');
const { Order, Basket, Product, User } = require('../models');

class OrderSevice {
  orderRepository = new OrderRepository(Order);
  basketRepository = new BasketRepository(Basket);
  productRepository = new ProductRepository(Product);
  userRepository = new UserRepository(User);

  //* 장바구니에서 선택한 상품에 대한 종합 정보 가져오기
  selectBasket = async (selectList, userId) => {
    //+ 선택한 상품 장바구니 정보 가져오기
    let orderList = await Promise.all(
      selectList.map((item) =>
        this.basketRepository.findOneBasket(Number(item))
      )
    );
    orderList = orderList.map((order) => {
      const { createdAt, updatedAt, quantity, ...necessaryData } =
        order.dataValues;
      return { ...necessaryData, orderQuantity: quantity };
    });

    //+ 선택한 상품 정보 가져오기
    let productData = await Promise.all(
      orderList.map((order) =>
        this.productRepository.findProductById(order.productId)
      )
    );
    productData = productData.map((order) => {
      const { createdAt, updatedAt, ...necessaryData } = order;
      return necessaryData;
    });

    //+ 주문할 유저 정보 가져오기
    let user = await this.userRepository.findUserById2(userId);
    const { createdAt, updatedAt, ...userNecessaryData } = user.dataValues;
    user = userNecessaryData;

    const orderProduct = orderList.map((order, idx) => {
      return { ...order, ...productData[idx] };
    });

    return { orderProduct, user };
  };

  completeOrder = async (orderInfo, request, address) => {
    const data = await orderInfo.map((order) => ({
      ...order.tableData,
      request,
      address,
    }));
    await data.forEach((data) => {
      this.productRepository.updateUserCount(data.productId, data.quantity);
    });
    await this.orderRepository.createOrder(data);
    await orderInfo.forEach((order) => {
      this.basketRepository.deleteBasket(order.basketId);
    });
    return;
  };
}

module.exports = OrderSevice;
