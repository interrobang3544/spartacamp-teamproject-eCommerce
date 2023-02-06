checkAccount();
getUsers(1);

// 전체 회원 조회
function getUsers(page) {
  let url = `/admin/users`;
  let searchword = document.getElementById('search').value;
  if (searchword) {
    url = `/admin/users/search/${searchword}`;
  }
  axios
    .get(url, { params: { page } })
    .then((response) => {
      let { totalPage } = response.data;
      let { data } = response.data;

      const userList = document.getElementById('user-list');
      const pageList = document.getElementById('page-num');
      pageList.innerHTML = '';
      userList.innerHTML = `
      <tr>
        <th scope="col">#</td>
        <th scope="col">아이디</td>
        <th scope="col">닉네임</td>
        <th scope="col">이메일</td>
        <th scope="col">주소</td>
        <th scope="col">가입일시</td>
        <th scope="col">회원 분류</td>
        <th scope="col">블랙리스트</td>
        <th scope="col">수정</td>
        <th scope="col">삭제</td>
      </tr>
      `;

      for (let i = 1; i < totalPage + 1; i++) {
        if (i === page) {
          pageList.innerHTML += `<li class="page-item active"><a class="page-link" onclick="getUsers(${i})">${i}</a></li>`;
        } else {
          pageList.innerHTML += `<li class="page-item"><a class="page-link" onclick="getUsers(${i})">${i}</a></li>`;
        }
      }

      for (let i = 0; i < data.length; i++) {
        const temp = document.createElement('tr');
        let type = '일반';
        if (data[i].type === 1) {
          type = 'VIP';
        } else if (data[i].type === 2) {
          type = '관리자';
        }
        let blackList = '-';
        if (data[i].blackList === 1) {
          blackList = '⭕';
        }
        temp.setAttribute('class', 'user-data');
        temp.innerHTML = `
          <td>${(page - 1) * 5 + i + 1}</td>
          <td>${data[i].id}</td>
          <td>${data[i].nickname}</td>
          <td>${data[i].email}</td>
          <td>${data[i].address}</td>
          <td>${data[i].createdAt.split('.')[0].split('T').join(' ')}</td>
          <td>${type}</td>
          <td>${blackList}</td>
          <td><button type="button" class="btn btn-primary" onclick="customModal(${
            data[i].userId
          }, '${data[i].id}', '${data[i].nickname}', '${data[i].email}', '${
          data[i].address
        }', ${data[i].type}, ${data[i].blackList})">수정</button></td>
          <td><button type="button" class="btn btn-primary" onclick="deleteUser(${
            data[i].userId
          })">삭제</button></td>
        `;
        userList.append(temp);
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

// 회원 수정 모달창
const userModifyModal = new bootstrap.Modal('#userModifyModal');
function customModal(userId, id, nickname, email, address, type, blackList) {
  document.getElementById('modify-user-id').value = id;
  document.getElementById('modify-user-nickname').value = nickname;
  document.getElementById('modify-user-email').value = email;
  document.getElementById('modify-user-address').value = address;
  document.getElementById('modify-user-type').value = type;
  if (blackList === 1) {
    document.getElementById('modify-user-blackList').checked = true;
  } else {
    document.getElementById('modify-user-blackList').checked = false;
  }
  userModifyModal.show();

  const temp = document.createElement('button');
  temp.setAttribute('class', 'btn btn-primary btn-confirm');
  temp.setAttribute('onclick', `updateUser(${userId})`);
  temp.innerText = '수정';
  const box = document.getElementById('btn-box');
  box.innerHTML = '';
  box.append(temp);
}

function updateUser(userId) {
  const id = document.getElementById('modify-user-id').value;
  const nickname = document.getElementById('modify-user-nickname').value;
  const email = document.getElementById('modify-user-email').value;
  const address = document.getElementById('modify-user-address').value;
  const type = document.getElementById('modify-user-type').value;
  let blackList = 0;
  if (document.getElementById('modify-user-blackList').checked === true) {
    blackList = 1;
  }

  axios
    .patch(`admin/users/${userId}`, {
      id: id,
      nickname: nickname,
      email: email,
      address: address,
      type: type,
      blackList: blackList,
    })
    .then((response) => {
      console.log(response);
      window.location.replace(`/admin-users`);
    })
    .catch((error) => {
      console.log(error);
    });
}

// 회원 삭제
function deleteUser(userId) {
  axios
    .delete(`admin/users/${userId}`)
    .then((response) => {
      console.log(response);
      window.location.replace(`/admin-users`);
    })
    .catch((error) => {
      console.log(error);
    });
}

// 계정 확인
function checkAccount() {
  axios
    .get('/api/auth/login/check')
    .then((response) => {
      if (response.data.user.type !== 2) {
        alert('관리자 계정이 아닙니다.');
        window.location.replace(`/`);
      }
    })
    .catch((error) => {
      console.log('err', error);
    });
}
