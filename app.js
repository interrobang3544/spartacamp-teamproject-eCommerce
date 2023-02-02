const express = require('express');
const app = express();
const port = 8080;

const adminRouter = require('./routes/admin.routes');
const authRouter = require('./routes/auth.routes');
const usersRouter = require('./routes/users.routes');

app.use(express.json());
app.use(express.urlencoded());
app.use('/admin', adminRouter);
app.use('/api/auth', authRouter);

app.listen(port, () => {
  console.log(port, '포트로 서버가 켜졌어요!');
});
