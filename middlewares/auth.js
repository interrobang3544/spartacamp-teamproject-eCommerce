const jwt = require('jsonwebtoken');
const { User } = require('../models');

module.exports = async (req, res, next) => {
  const { cookie } = req.headers;
  if (!cookie) {
    return res.status(401).json({ message: '로그인 후 이용가능합니다.' });
  }

  let [authType, authToken] = cookie.split('=');

  // console.log(authToken);
  // console.log(authToken.includes('connect.sid'));
  // 소셜로그인 인증
  if (authToken.includes('connect.sid')) {
    authToken = authToken.split(';')[0];
    // console.log(authToken);
  }

  if (!authToken || authType !== 'accessToken') {
    res.status(401).send({
      message: '로그인 후 이용가능합니다.',
    });
    return;
  }
  try {
    const { userId } = jwt.verify(
      authToken,
      'my-secrect-key' //secretkey
    );

    User.findByPk(userId).then((user) => {
      res.locals.user = user;
      next();
    });
  } catch (error) {
    return res.status(401).json({ message: '로그인 후 이용가능합니다!' });
  }
};
