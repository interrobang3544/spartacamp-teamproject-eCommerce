const orderBtn = document.getElementById('order-btn');
const basketList = document.querySelectorAll(
  '.basket-screen__list .product-list__item'
);
const totalOrderPriceSmall = document.getElementById('totalOrderPrice');
let totalOrderPrice = 0;
let orderList = [];

//* 장바구니 해당 상품 수량 수정
const handleBasketEditBtn = async (basketId, quantity) => {
  const response = await fetch(`/baskets/${basketId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: basketId,
      quantity,
    }),
  });
  if (response.status === 200) {
    window.location.reload();
  }
};

//* 해당 장바구니 삭제
const handleBasketDeleteBtn = async (basketId) => {
  const response = await fetch(`/baskets/${basketId}`, {
    method: 'DELETE',
  });
  if (response.status === 200) {
    window.location.reload();
  }
};

//* 전체 주문 금액 계산 및 주문 목록 담기
const checkProduct = (check, price, basketId) => {
  const numPrice = Number(price.replaceAll(',', ''));
  if (check) {
    totalOrderPrice += numPrice;
    orderList.push(basketId);
  } else {
    totalOrderPrice -= numPrice;
    const idx = orderList.indexOf(basketId);
    orderList.splice(idx, 1);
  }
  totalOrderPriceSmall.textContent = totalOrderPrice.toLocaleString('ko-KR');
};

//* 주문하기
const handleOrderBtn = async (orderList) => {
  if (orderList.length === 0) {
    return;
  }
  const response = await fetch('/baskets/order', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      orderList,
    }),
  });
  if (response.status === 201) {
    window.location.href = '/orders';
  }
};

//* li 마다 이벤트 추가
basketList.forEach((basketItem) => {
  const basketInput = basketItem.querySelector('#input-basket-quantity');
  const basketEditBtn = basketItem.querySelector('#basket-edit-btn');
  const basketDeleteBtn = basketItem.querySelector('#basket-delete-btn');
  const basketOrderCheck = basketItem.querySelector('#basket-check');
  const priceSpan = basketItem.querySelector('#totalPrice');
  const basketId = basketItem.dataset.basketId;

  basketEditBtn.addEventListener('click', () => {
    //+ 갯수 제한 유효성 알림
    if (basketInput.value > 999 || basketInput.value < 1) {
      basketInput.reportValidity();
      return;
    }
    return handleBasketEditBtn(basketId, basketInput.value);
  });

  basketDeleteBtn.addEventListener('click', () => {
    handleBasketDeleteBtn(basketId);
  });

  basketOrderCheck.addEventListener('change', () => {
    checkProduct(basketOrderCheck.checked, priceSpan.textContent, basketId);
  });
});

orderBtn.addEventListener('click', () => handleOrderBtn(orderList));
