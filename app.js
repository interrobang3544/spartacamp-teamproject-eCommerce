const express = require('express');
const session = require('express-session');
const memoryStore = require('memorystore')(session);
const socket = require('socket.io');
const http = require('http');
const passportConfig = require('./passport');
require('dotenv').config();

const basketRouter = require('./routes/baskets.routes');
const orderRouter = require('./routes/orders.routes');
const loginMiddleware = require('./middlewares/loginCheck');
const adminRouter = require('./routes/admin.routes');
const apiRouter = require('./routes/api.routes');
const usersRouter = require('./routes/users.routes');
const productsRouter = require('./routes/products.routes');
const basketsRouter = require('./routes/baskets.routes');

//* express 할당
const app = express();

//* 소켓 서버 설정
const server = http.createServer(app);
const io = socket(server);

//* 소셜 로그인 설정
passportConfig(app);

//* 포트 번호
const PORT = 8080;

//* 정적 파일
app.use(express.static('static'));

//* 뷰 엔진 설정
app.set('view engine', 'ejs');
app.set('views', 'views');

const maxAge = 1000 * 60 * 60 * 24;

//* 세션 전역 설정
app.use(
  session({
    secret: process.env.KAKAO_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new memoryStore({ checkPeriod: maxAge }),
    cookie: { maxAge },
  })
);

//* body 데이터를 해석하기 위해 전역 미들웨어 설정
app.use(express.json()); //- JSON 형태의 데이터 해석
app.use(express.urlencoded({ extended: true })); //- x-www-form-urlencoded 형태 데이터 해석
//? extended 속성이 true 면 qs 모듈 필요, false 면 NodeJS 기본 내장 querystring 모듈 사용

//* 라우터 설정
app.use('/baskets', basketRouter);
app.use('/orders', orderRouter);
app.use('/admin', adminRouter);
app.use('/api/auth', apiRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);


// ejs루트-----------------------------------------------------------------------------------------------
app.get('/login', (req, res) => {
  res.render('indexLogin', { join: false });
});

app.get('/join', (req, res) => {
  res.render('indexLogin', { join: true });
});

app.get('/chattingOnline', loginMiddleware, (req, res) => {
  // 로그인이 된 상태면 마이페이지로, 안됐다면 로그인페이지로
  if (res.locals.user) {
    res.render('chatting');
  } else {
    res.render('indexLogin', { join: false });
  }
});

app.get('/mypage', loginMiddleware, (req, res) => {
  // 로그인이 된 상태면 마이페이지로, 안됐다면 로그인페이지로
  if (res.locals.user) {
    res.render('mypage');
  } else {
    res.render('indexLogin', { join: false });
  }
});

app.get('/mypage/changeUserData', loginMiddleware, (req, res) => {
  // 로그인이 된 상태면 회원정보 변경페이지로, 안됐다면 로그인페이지로
  if (res.locals.user) {
    res.render('changeMypage');
  } else {
    res.render('indexLogin', { join: false });
  }
});

app.get('/mypage/changePassword', loginMiddleware, (req, res) => {
  // 로그인이 된 상태면 비밀번호 변경페이지로, 안됐다면 로그인페이지로
  if (res.locals.user) {
    res.render('changePassword');
  } else {
    res.render('indexLogin', { join: false });
  }
});

app.get('/admin-users', (req, res) => {
  res.render('admin-users');
});

app.get('/admin-products', (req, res) => {
  res.render('admin-products');
});

app.get('/', (req, res) => {
  res.render('home');
})

app.get('/:productId', (req, res) => {
  res.render('productSpec');
})

//* 서버 리슨
server.listen(PORT, () => {
  console.log(`✅ 서버가 연결되었습니다. http://localhost:${PORT}`);
});
