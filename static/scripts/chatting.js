$(document).ready(function () {
  $.ajax({
    type: 'GET',
    url: '/users/',
    async: false,
    success: function (response) {
      document.getElementById('nicknameInput').innerHTML = '';
      let tempHtml = ``;

      tempHtml += `
      <label for="nickname">Nickname</label>
      <div class = "display-flex">
        <input
        type="nickname"
        class="form-control"
        id="nickname"
        value="${response.data.user[0]['nickname']}"
      />
      <button
        class="btn btn-lg btn-info float-right"
        type="submit"
      >
        저장
      </button>
      </div>
      
      `;

      $('#nicknameInput').append(tempHtml);
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

//* socket-------------------------------------------------------------
const socket = io();
const room = document.getElementById('messageInput');

// 닉네임을 치기전에는 입력창 숨기기
room.hidden = true;

// 닉네임제출 이벤트발생
const nicknameInput = document.getElementById('nicknameInput');
nicknameInput.addEventListener('submit', handleNicknameSubmit);

function handleNicknameSubmit(event) {
  event.preventDefault();
  const input = document.getElementById('nickname').value;
  socket.emit('newUser', input, showRoom);
}

function showRoom() {
  nicknameInput.hidden = true;
  room.hidden = false;

  // 메시지 전송이벤트 발생
  room.addEventListener('submit', send);
}

function send(event) {
  event.preventDefault();
  // 입력된 데이터 가져오기
  const input = document.getElementById('test');
  const message = input.value;
  // 입력칸은 다시 빈칸으로 변경
  document.getElementById('test').value = '';
  // 서버로 데이터와 함께 send 이벤트 전달
  socket.emit('message', { type: 'message', message: message });
}

socket.on('update', function (data) {
  const chat = document.getElementById('chat');

  const message = document.createElement('div');
  const node = document.createTextNode(`${data['name']}: ${data['message']}`);
  let className = '';

  // 타입에 따라 적용할 클래스를 다르게 지정
  switch (data['type']) {
    case 'message':
      className = 'other';
      break;

    case 'connect':
      className = 'connect';
      break;

    case 'disconnect':
      className = 'disconnect';
      break;
  }

  message.classList.add(className);
  message.appendChild(node);
  chat.appendChild(message);
});
