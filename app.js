const express = require('express');
const socket = require('socket.io');
const http = require('http');
const app = express();
const server = http.createServer(app);
const io = socket(server);
const port = 8080;

const loginMiddleware = require('./middlewares/loginCheck');
const adminRouter = require('./routes/admin.routes');
const apiRouter = require('./routes/api.routes');
const usersRouter = require('./routes/users.routes');

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.static('static'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/admin', adminRouter);
app.use('/api/auth', apiRouter);
app.use('/users', usersRouter);

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

server.listen(port, () => {
  console.log(port, '포트로 서버가 켜졌어요!');
});
