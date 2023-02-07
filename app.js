const express = require('express');
const socket = require('socket.io');
const http = require('http');
const app = express();
const server = http.createServer(app);
const io = socket(server);
const port = 8080;

// 카카오 소셜로그인
const passportConfig = require('./passport');
const session = require('express-session');
passportConfig(app);

const loginMiddleware = require('./middlewares/loginCheck');
const adminRouter = require('./routes/admin.routes');
const apiRouter = require('./routes/api.routes');
const usersRouter = require('./routes/users.routes');

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.static('static'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.KAKAO_SECRET,
  })
);
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

app.get('/', (req, res) => {
  res.render('home');
})

//socket--------------------------------------------------------------------------------
// public room
function publicRooms() {
  const sids = io.sockets.adapter.sids;
  const rooms = io.sockets.adapter.rooms;
  const publicRooms = [];
  rooms.forEach((_, key) => {
    if (sids.get(key) === undefined) {
      publicRooms.push(key);
    }
  });
  return publicRooms;
}

io.on('connection', function (socket) {
  // 새로운 유저가 접속하였을때
  let roomName;
  socket.on('newUser', function (nickname, done) {
    // 소켓에 닉네임 저장
    socket.name = nickname;
    // 닉네임과 동일한 이름의 방추가
    roomName = nickname;
    socket.join(nickname);
    // showRoom()
    done();
    // 소켓에 전송
    io.sockets.in(roomName).emit('update', {
      type: 'connect',
      name: 'SERVER',
      message: nickname + `님이 ${roomName}방에 접속하였습니다.`,
    });
    // 방목록 변경
    io.sockets.emit('room_change', publicRooms());
  });

  // 전송한 메시지 받기
  socket.on('message', function (data) {
    // 누가 전송한 것인지
    data.name = socket.name;
    // 같은 소켓의 나머지 사람에게 메시지 전송
    socket.broadcast.in(roomName).emit('update', data);
  });

  socket.on('disconnect', function () {
    // 같은 소켓의 상대방에게 메시지 전송
    io.sockets.in(roomName).emit('update', {
      type: 'disconnect',
      name: 'SERVER',
      message: socket.name + '님이 나가셨습니다.',
    });
    // 방목록 변경
    io.sockets.emit('room_change', publicRooms());
  });

  // 관리자가 채팅방에 들어갈때
  socket.on('enter_room', function (input, done) {
    // 이전 소켓떠나기
    socket.leave(roomName);
    // 새 소켓 지정
    roomName = input;
    socket.join(roomName);
    done();
    // 소켓에 전송
    io.sockets.in(roomName).emit('update', {
      type: 'connect',
      name: 'SERVER',
      message: socket.name + `님이 ${roomName}방에 접속하였습니다.`,
    });
    // 방목록 변경
    io.sockets.emit('room_change', publicRooms());
  });
});

// 소켓끝-----------------------------------------------------------

server.listen(port, () => {
  console.log(port, '포트로 서버가 켜졌어요!');
});