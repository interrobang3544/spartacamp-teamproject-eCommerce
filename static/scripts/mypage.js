$(document).ready(function () {
  $.ajax({
    type: 'GET',
    url: '/users/',
    async: false,
    success: function (response) {
      document.getElementById('userData').innerHTML = '';
      let tempHtml = ``;

      tempHtml += `
      <h1>ID : ${response.data.user[0]['id']}</h1>
      <div class="form-floating form-margin">
        <h4>닉네임</h4>
        <div>${response.data.user[0]['nickname']}</div>
      </div>
      <div class="form-floating form-margin">
        <h4>이메일</h4>
        <div>${response.data.user[0]['email']}</div>
      </div>
      <div class="form-floating form-margin">
        <h4>주소</h4>
        <div>${response.data.user[0]['address']}</div>
      </div>
      <div>
        <button
        class="btn btn-lg btn-info margin-bottom"
        type="button"
        onclick="location.href='/mypage/changePassword'">
        비밀번호 변경
        </button>
        <button
        class="btn btn-lg btn-info margin-bottom margin-left"
        type="button"
        onclick="location.href='/mypage/changeUserData'">
        회원정보 변경
        </button>
      </div>
      `;

      $('#userData').append(tempHtml);

      if (response.data.order.length === 0) {
        document.getElementById('orderData').innerHTML = '주문내역이 없습니다.';
      } else {
        document.getElementById('orderData').innerHTML = '';
        let tempHtml = ``;
        const orderList = response.data.order.map((order) => {
          tempHtml += `
          <h2>${order[0]['orderCreateAt'].split('T')[0]}</h2>
          <div class = order-list>
            <img class="product product-image" src="${
              order[0]['productPhoto']
            }" />
            <div class="product product-name">
              <h4>상품명</h4>
              <div>${order[0]['productName']}</div>
            </div>
            <div class="product product-explanation">
              <h4>상품 설명</h4>
              <div>${order[0]['productExp']}</div>
            </div>
            <div class="product product-quantity">
              <h4>상품 가격</h4>
              <div>${order[0]['price']}</div>
            </div>
            <div class="product product-quantity">
              <h4>주문 수량</h4>
              <div>${order[0]['orderQuantity']}</div>
            </div>
            <div class="product product-quantity">
              <h4>총 공구 수</h4>
              <div>${order[0]['userCount']}</div>
            </div>
          </div>
          `;
        });

        $('#orderData').append(tempHtml);
      }
    },
    error: function (response) {
      customAlert(response.responseJSON.errorMessage);
    },
  });
});

function customAlert(text) {
  $('#alertText').text(text);
  $('#alertModal').modal('show');
}

function logout() {
  $.ajax({
    type: 'GET',
    url: '/api/auth/logout',
    success: function (response) {
      customAlert(response.message);
      window.location.href = '/login';
    },
    error: function (response) {
      customAlert(response.responseJSON.message);
    },
  });
}
