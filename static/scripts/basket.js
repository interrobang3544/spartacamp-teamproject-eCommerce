const orderBtn = document.getElementById('order-btn');
const basketQuantityinputs = document.querySelectorAll(
  '#input-basket-quantity'
);
const basketEditBtns = document.querySelectorAll('#basket-edit-btn');
const basketDeleteBtns = document.querySelectorAll('#basket-delete-btn');

//* 장바구니 해당 상품 수량 수정
const handleBasketEditBtn = async (basketId, input) => {
  const response = await fetch(`/baskets/${basketId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: basketId,
      quantity: input.value,
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

basketEditBtns.forEach((btn, idx) => {
  btn.addEventListener('click', () => {
    return handleBasketEditBtn(btn.dataset.basketId, basketQuantityinputs[idx]);
  });
});

basketDeleteBtns.forEach((btn) => {
  btn.addEventListener('click', () =>
    handleBasketDeleteBtn(btn.dataset.basketId)
  );
});
