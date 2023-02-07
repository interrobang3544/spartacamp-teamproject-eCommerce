const express = require('express');
const session = require('express-session');
require('dotenv').config();
const memoryStore = require('memorystore')(session);
const basketRouter = require('./routes/baskets.routes');
const orderRouter = require('./routes/orders.routes');

//* express 할당
const app = express();

//* 포트 번호
const PORT = 7000;

//* 정적 파일
app.use(express.static('static'));

//* 뷰 엔진 설정
app.set('view engine', 'ejs');
app.set('views', 'views');

const maxAge = 1000 * 60 * 60 * 24;

//* 세션 전역 설정
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
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

//* 서버 리슨
app.listen(PORT, () => {
  console.log(`✅ 서버가 연결되었습니다. http://localhost:${PORT}`);
});
