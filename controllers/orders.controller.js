const OrderService = require('../services/orders.service');

class OrderController {
  orderService = new OrderService();

  //* 장바구니에서 선택한 상품 정보 및 유저 정보 가져오기
  getOrder = async (req, res) => {
    const { orderList } = req.session;

    const { userId } = res.locals.user;
    const orderData = await this.orderService.selectBasket(orderList, userId);
    return res.render('order', { orderData });
  };

  //* 주문 완료
  postOrder = async (req, res) => {
    const { order, request, address } = req.body;

    this.orderService.completeOrder(order, request, address);
    return res.sendStatus(201);
  };
}

module.exports = OrderController;
