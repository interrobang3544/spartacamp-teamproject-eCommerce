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
        <label for="nickname">Nickname</label>
        <input type="nickname" class="form-control" id="nickname"
        value="${response.data.user[0]['nickname']}" />
      </div>
      <div class="form-floating form-margin">
        <label for="email">Email</label>
        <input
          type="email"
          class="form-control"
          id="email"
          value="${response.data.user[0]['email']}"
        />
      </div>
      <div class="form-floating form-margin">
        <label for="address">Address</label>
        <input
          type="address"
          class="form-control"
          id="address"
          value="${response.data.user[0]['address']}"
        />
      </div>
      <button
      class="btn btn-lg btn-info margin-bottom"
      type="button"
      onclick="location.href='/mypage'"
    >
      뒤로
    </button>
      <button
      class="btn btn-lg btn-info margin-bottom margin-left"
      type="button"
      onclick="changeUserData()">
      저장
    </button>
      `;

      $('#userData').append(tempHtml);
    },
    error: function (response) {
      customAlert(response.responseJSON.errorMessage);
    },
  });
});

function changeUserData() {
  // let password = $('#password').val();
  let nickname = $('#nickname').val();
  let email = $('#email').val();
  let address = $('#address').val();

  $.ajax({
    type: 'PUT',
    url: '/users/',
    async: false,
    data: {
      nickname: nickname,
      email: email,
      address: address,
    },
    success: function (response) {
      customAlert(response.message);
      window.location.replace('/mypage');
    },
    error: function (response) {
      customAlert(response.responseJSON.errorMessage);
    },
  });
}

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
