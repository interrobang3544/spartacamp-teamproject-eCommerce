const express = require('express');
const app = express();
const ejs = require('ejs');
const port = 4000;

const routes = require('./routes/api.route');

app.use(express.json());
app.use(routes);
app.use(express.static("static"));

app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/', (req, res) => {
  res.render('home');
})

app.listen(port, () => {
  console.log(port, '포트로 서버가 열렸어요!');
});
