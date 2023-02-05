const express = require('express');
const basketRouter = require('./routes/baskets.routes');

//* express 할당
const app = express();

//* 포트 번호
const PORT = 7000;

//* 정적 파일
app.use(express.static('static'));

//* 뷰 엔진 설정
app.set('view engine', 'ejs');
app.set('views', 'views');

//* body 데이터를 해석하기 위해 전역 미들웨어 설정
app.use(express.json()); //- JSON 형태의 데이터 해석
app.use(express.urlencoded({ extended: true })); //- x-www-form-urlencoded 형태 데이터 해석
//? extended 속성이 true 면 qs 모듈 필요, false 면 NodeJS 기본 내장 querystring 모듈 사용

//* 라우터 설정
app.use('/baskets', basketRouter);

//* 서버 리슨
app.listen(PORT, () => {
  console.log(`✅ 서버가 연결되었습니다. http://localhost:${PORT}`);
});
