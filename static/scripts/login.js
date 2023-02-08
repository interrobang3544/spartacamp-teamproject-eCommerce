function login() {
  let id = $('#id').val();
  let password = $('#password').val();

  if (!id || !password) {
    return customAlert('아이디와 패스워드를 넣어주세요');
  }

  $.ajax({
    type: 'POST',
    url: '/api/auth/login',
    data: {
      id: id,
      password: password,
    },
    success: function (response) {
      customAlert(response.message);
      console.log(response.data)
      if (response.data === 2) {
        window.location.replace('/admin-users');
      } else {
        window.location.replace('/mypage');
      }
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
