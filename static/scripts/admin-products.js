console.log('load');
getProducts(1);

// 사장님 리뷰 조회
function getProducts(page) {
  axios
    .get(`/admin/products`, { params: { page } })
    .then((response) => {
      let { totalPage } = response.data;
      let { data } = response.data;

      const productList = document.getElementById('product-list');
      const pageList = document.getElementById('page-num');
      pageList.innerHTML = '';
      productList.innerHTML = '';

      for (let i = 1; i < totalPage + 1; i++) {
        if (i === page) {
          pageList.innerHTML += `<li class="page-item active"><a class="page-link" onclick="getProducts(${i})">${i}</a></li>`;
        } else {
          pageList.innerHTML += `<li class="page-item"><a class="page-link" onclick="getProducts(${i})">${i}</a></li>`;
        }
      }

      for (let i = 0; i < data.length; i++) {
        const temp = document.createElement('div');
        temp.setAttribute('class', 'product-box');
        temp.innerHTML = `
        <img class="product product-image" src="${data[i].productPhoto}" />
        <div class="product product-name">
          <h4>상품명</h4>
          <div>${data[i].productName}</div>
        </div>
        <div class="product product-explanation">
          <h4>상품 설명</h4>
          <div>${data[i].productExp}</div>
        </div>
        <div class="product product-quantity">
          <h4>상품 가격</h4>
          <div>${data[i].price}</div>
        </div>
        <div class="product product-quantity">
          <h4>상품 수량</h4>
          <div>${data[i].quantity}</div>
        </div>
        <div class="product product-participant">
          <h4>공동 구매 참여자 수</h4>
          <div>${data[i].userCount}</div>
        </div>
        <div class="product">
          <button type="button" class="btn btn-primary btn-modify" onclick="customModal2(${data[i].productId},'${data[i].productPhoto}','${data[i].productName}', '${data[i].productExp}', ${data[i].price}, ${data[i].quantity}, ${data[i].userCount})">수정</button>
          <button type="button" class="btn btn-primary btn-delete" onclick="deleteProduct(${data[i].productId}, '${data[i].productPhoto}')">삭제</button>
        </div>
        `;
        productList.append(temp);
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

function applyProduct() {
  const name = document.getElementById('product-name').value;
  const explanation = document.getElementById('product-explanation').value;
  const price = document.getElementById('product-price').value;
  const quantity = document.getElementById('product-quantity').value;

  axios
    .post('admin/products', {
      productName: name,
      productExp: explanation,
      price: price,
      quantity: quantity,
    })
    .then((response) => {
      console.log(response);
      window.location.replace(`/admin-products`);
    })
    .catch((error) => {
      console.log(error);
    });
}

// function updateProduct(productId) {
//   const productPhoto = document.getElementById('modify-product-name').value;
//   const productName = document.getElementById('modify-product-name').value;
//   const productExp = document.getElementById(
//     'modify-product-explanation'
//   ).value;
//   const price = document.getElementById('modify-product-price').value;
//   const quantity = document.getElementById('modify-product-quantity').value;
//   const userCount = document.getElementById('modify-product-participant').value;

//   axios
//     .patch(`admin/products/${productId}`, {
//       data: {
//         productName,
//         productExp,
//         price,
//         quantity,
//         userCount
//       },
//     })
//     .then((response) => {
//       console.log(response);
//       window.location.replace(`/admin-products`);
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// }

function deleteProduct(productId, productPhoto) {
  axios
    .delete(`admin/products/${productId}`, {
      data: {
        productPhoto,
      },
    })
    .then((response) => {
      console.log(response);
      window.location.replace(`/admin-products`);
    })
    .catch((error) => {
      console.log(error);
    });
}

// 상품 등록 모달창
const productCreateModal = new bootstrap.Modal('#productCreateModal');
function customModal() {
  productCreateModal.show();
}

// 상품 수정 모달창
const productModifyModal = new bootstrap.Modal('#productModifyModal');
function customModal2(
  productId,
  productPhoto,
  productName,
  productExp,
  price,
  quantity,
  userCount
) {
  let oldImage = document.getElementById('modify-image');
  oldImage.src = productPhoto;
  oldImage.style.width = '100%';
  oldImage.style.height = '100%';
  oldImage.style.objectFit = 'contain';
  document.getElementById('modify-product-id').value = productId;
  document.getElementById('modify-productPhoto').value = productPhoto;
  document.getElementById('modify-product-name').value = productName;
  document.getElementById('modify-product-explanation').value = productExp;
  document.getElementById('modify-product-price').value = price;
  document.getElementById('modify-product-quantity').value = quantity;
  document.getElementById('modify-product-participant').value = userCount;
  productModifyModal.show();
  ;
}

// 상품 등록 모달창 이미지
function loadFile(input, elementId) {
  let file = input.files[0];
  let newImage = document.getElementById(elementId);
  newImage.src = URL.createObjectURL(file);

  newImage.style.width = '100%';
  newImage.style.height = '100%';
  newImage.style.objectFit = 'contain';
}
