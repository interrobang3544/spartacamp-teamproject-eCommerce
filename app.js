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
const { disconnect } = require('process');

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

//socket--------------------------------------------------------------------------------
io.on('connection', function (socket) {
  // 새로운 유저가 접속하였을때
  console.log('누가 접속하였습니다.');
  socket.on('newUser', function (nickname, done) {
    console.log(nickname, '님이 접속하였습니다.');
    // 소켓에 닉네임 저장
    socket.name = nickname;
    // showRoom()
    done();
    // 모든 소켓에 전송
    io.emit('update', {
      type: 'connect',
      name: 'SERVER',
      message: nickname + '님이 접속하였습니다.',
    });
  });

  // 전송한 메시지 받기
  socket.on('message', function (data) {
    // 누가 전송한 것인지
    data.name = socket.name;
    console.log(data);
    // 나머지 사람들에게 메시지 전송
    io.emit('update', data);
  });

  socket.on('disconnect', function () {
    console.log(socket.name, '님이 나가셨습니다.');
    //나머지 사람들에게 메시지 전송
    io.emit('update', {
      type: 'disconnect',
      name: 'SERVER',
      message: socket.name + '님이 나가셨습니다.',
    });
  });
});

server.listen(port, () => {
  console.log(port, '포트로 서버가 켜졌어요!');
});
