const selectBox = document.getElementById('order-request');
const requestDirect = document.getElementById('direct-input');
const orderList = document.querySelectorAll(
  '.order-screen__list .product-list__item'
);
const inputAddress = document.getElementById('order-address');
const orderBtn = document.getElementById('order-btn');

const order = [];

const handleSelectBox = () => {
  if (selectBox.value === '4') {
    requestDirect.classList.toggle('hidden');
  } else {
    requestDirect.classList.add('hidden');
  }
};

const handleOrderBtn = async () => {
  let request;

  switch (selectBox.value) {
    case '1':
      request = '부재시 관리실에 맡겨주세요';
      break;
    case '2':
      request = '부재시 연락주세요';
      break;
    case '3':
      request = '부재시 문 앞에 두고 가주세요';
      break;
    case '4':
      request = requestDirect.value;
      break;
    default:
      request = '';
      break;
  }
  const response = await fetch('/orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      order,
      request,
      address: inputAddress.value,
    }),
  });

  if (response.status === 201) {
    alert('주문 완료');
    window.location.href = '/baskets';
  }
};

orderList.forEach((li) => {
  const { userId, basketId, productId } = li.dataset;
  const quantity = li.querySelector('#orderQuantity').textContent;
  const orderDB = {
    tableData: {
      userId,
      productId,
      quantity,
    },
    basketId,
  };
  order.push(orderDB);
});

selectBox.addEventListener('input', handleSelectBox);
orderBtn.addEventListener('click', handleOrderBtn);
