const express = require('express');
const app = express();
const port = 8080;

const adminRouter = require('./routes/admin.routes');

app.use(express.json());
app.use(express.urlencoded());
app.use('/admin', adminRouter);

app.listen(port, () => {
  console.log(port, '포트로 서버가 켜졌어요!');
});
