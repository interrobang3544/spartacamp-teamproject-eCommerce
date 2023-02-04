getUsers(1);

// 전체 회원 조회
function getUsers(page) {
  axios
    .get(`/admin/users`, { params: { page } })
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
        temp.setAttribute('class', 'user-data');
        temp.innerHTML = `
          <td>${(page - 1) * 5 + i + 1}</td>
          <td>${data[i].id}</td>
          <td>${data[i].nickname}</td>
          <td>${data[i].email}</td>
          <td>${data[i].address}</td>
          <td>${data[i].createdAt.split('.')[0].split('T').join(' ')}</td>
          <td><button type="button" class="btn btn-primary" onclick="customModal(${
            data[i].userId
          }, '${data[i].id}', '${data[i].nickname}', '${data[i].email}', '${
          data[i].address
        }')">수정</button></td>
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
function customModal(userId, id, nickname, email, address) {
  document.getElementById('modify-user-id').value = id;
  document.getElementById('modify-user-nickname').value = nickname;
  document.getElementById('modify-user-email').value = email;
  document.getElementById('modify-user-address').value = address;
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
  console.log(id, nickname, email, address);
  axios
    .patch(`admin/users/${userId}`, {
      id: id,
      nickname: nickname,
      email: email,
      address: address,
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
