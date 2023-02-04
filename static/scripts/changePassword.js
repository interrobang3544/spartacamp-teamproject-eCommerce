function changePassword() {
  let curPassword = $('#curPassword').val();
  let newPassword = $('#newPassword').val();
  let checkNewPassword = $('#checkNewPassword').val();

  if (newPassword !== checkNewPassword) {
    return customAlert('새 패스워드를 다시 체크해주세요');
  }

  $.ajax({
    type: 'PUT',
    url: '/users/changePassword',
    async: false,
    data: {
      curPassword: curPassword,
      newPassword: newPassword,
    },
    success: function (response) {
      customAlert(response.message);
      logout();
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
      console.log(response.responseJSON.message);
    },
  });
}
