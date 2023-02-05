const orderBtn = document.getElementById('order-btn');
const basketList = document.querySelectorAll('.product-list__item');

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

//* li 마다 이벤트 추가
basketList.forEach((basketItem) => {
  const basketInput = basketItem.querySelector('#input-basket-quantity');
  const basketEditBtn = basketItem.querySelector('#basket-edit-btn');
  const basketDeleteBtn = basketItem.querySelector('#basket-delete-btn');

  basketEditBtn.addEventListener('click', () => {
    //+ 갯수 제한 유효성 알림
    if (basketInput.value > 999 || basketInput.value < 1) {
      basketInput.reportValidity();
      return;
    }
    return handleBasketEditBtn(
      basketEditBtn.dataset.basketId,
      basketInput.value
    );
  });

  basketDeleteBtn.addEventListener('click', () => {
    handleBasketDeleteBtn(basketDeleteBtn.dataset.basketId);
  });
});
