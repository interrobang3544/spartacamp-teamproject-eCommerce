const express = require('express');
const router = express.Router();
const passport = require('passport');

const authMiddleware = require('../middlewares/auth');

const ApiController = require('../controllers/api.controller');
const apiController = new ApiController();

router.post('/join', apiController.join);
router.post('/login', apiController.login);
router.get('/logout', apiController.logout);

// 카카오 소셜로그인
//* 카카오로 로그인하기 라우터 ***********************
//? /kakao로 요청오면, 카카오 로그인 페이지로 가게 되고, 카카오 서버를 통해 카카오 로그인을 하게 되면, 다음 라우터로 요청한다.
router.get('/kakao', passport.authenticate('kakao'));

//? 위에서 카카오 서버 로그인이 되면, 카카오 redirect url 설정에 따라 이쪽 라우터로 오게 된다.
router.get(
  '/kakao/callback',
  //? 그리고 passport 로그인 전략에 의해 kakaoStrategy로 가서 카카오계정 정보와 DB를 비교해서 회원가입시키거나 로그인 처리하게 한다.
  passport.authenticate('kakao', {
    failureRedirect: '/', // kakaoStrategy에서 실패한다면 실행
  }),
  // kakaoStrategy에서 성공한다면 콜백 실행
  (req, res) => {
    res.redirect('/');
  }
);

//토큰검증API
router.get('/login/check', authMiddleware, async (req, res) => {
  res.json({ user: res.locals.user });
});

module.exports = router;
