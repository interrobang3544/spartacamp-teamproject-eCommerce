console.log('load');
getUsers(1);

// 사장님 리뷰 조회
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
          <td>${data[i].userId}</td>
          <td>${data[i].id}</td>
          <td>${data[i].nickname}</td>
          <td>${data[i].email}</td>
          <td>${data[i].address}</td>
          <td>${data[i].createdAt
            .split('.')[0]
            .split('T')
            .join(' ')}</td>
          <td><button type="button" class="btn btn-primary">수정</button></td>
          <td><button type="button" class="btn btn-primary">삭제</button></td>
        `;
        userList.append(temp);
      }
    })
    .catch((error) => {
      console.log(error);
    });
}
