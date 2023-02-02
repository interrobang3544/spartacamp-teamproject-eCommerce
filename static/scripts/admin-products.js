console.log('load');
getProducts(1);

// 사장님 리뷰 조회
function getProducts(page) {
  axios
    .get(`/admin/products`, { params: { page } })
    .then((response) => {
      let { totalPage } = response.data;
      let { data } = response.data;

      const productList = document.getElementById('product-list');
      const pageList = document.getElementById('page-num');
      pageList.innerHTML = '';
      productList.innerHTML = '';

      for (let i = 1; i < totalPage + 1; i++) {
        if (i === page) {
          pageList.innerHTML += `<li class="page-item active"><a class="page-link" onclick="getProducts(${i})">${i}</a></li>`;
        } else {
          pageList.innerHTML += `<li class="page-item"><a class="page-link" onclick="getProducts(${i})">${i}</a></li>`;
        }
      }

      for (let i = 0; i < data.length; i++) {
        const temp = document.createElement('div');
        temp.setAttribute('class', 'product-box');
        temp.innerHTML = `
        <img class="product product-image" src="./images/product.jpg" />
        <div class="product product-name">
          <h4>상품명</h4>
          <div>${data[i].productName}</div>
        </div>
        <div class="product product-explanation">
          <h4>상품 설명</h4>
          <div>${data[i].productExp}</div>
        </div>
        <div class="product product-quantity">
          <h4>상품 수량</h4>
          <div>${data[i].quantity}</div>
        </div>
        <div class="product product-participant">
          <h4>공동 구매 참여자 수</h4>
          <div>${data[i].userCount}</div>
        </div>
        <div class="product">
          <button type="button" class="btn btn-primary btn-modify">수정</button>
          <button type="button" class="btn btn-primary btn-delete">삭제</button>
        </div>
        `;
        productList.append(temp);
      }
    })
    .catch((error) => {
      console.log(error);
    });
}
