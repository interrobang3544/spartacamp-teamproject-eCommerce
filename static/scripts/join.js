function join() {
  let id = $('#id').val();
  let password = $('#password').val();
  let passwordCheck = $('#passwordCheck').val();
  let nickname = $('#nickname').val();
  let email = $('#email').val();
  let address = $('#address').val();

  if (password !== passwordCheck) {
    return customAlert('패스워드를 다시 체크해주세요');
  }

  $.ajax({
    type: 'POST',
    url: '/api/auth/join',
    data: {
      id: id,
      password: password,
      nickname: nickname,
      email: email,
      address: address,
    },
    success: function (response) {
      customAlert(response.message);
      window.location.replace('/login');
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
