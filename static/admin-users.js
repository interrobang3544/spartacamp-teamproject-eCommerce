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
      userList.innerHTML = '';

      for (let i = 1; i < totalPage + 1; i++) {
        if ( i === page ) {
          pageList.innerHTML += `<li class="page-item active"><a class="page-link" onclick="getUsers(${i})">${i}</a></li>`;
        } else {
          pageList.innerHTML += `<li class="page-item"><a class="page-link" onclick="getUsers(${i})">${i}</a></li>`;
        }
      }

      for (let i = 0; i < data.length; i++) {
        const temp = document.createElement('div');
        temp.setAttribute('class', 'user-data');
        temp.innerHTML = `
        <div>
          ${data[i].id}
          ${data[i].nickname}
          ${data[i].email}
          ${data[i].address}
        </div>`;

        userList.append(temp);
      }
    })
    .catch((error) => {
      console.log(error);
    });
}
