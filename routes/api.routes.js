const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/auth');

const ApiController = require('../controllers/api.controller');
const apiController = new ApiController();

router.post('/join', apiController.join);
router.post('/login', apiController.login);
router.get('/logout', apiController.logout);

//토큰검증API
router.get('/login/check', authMiddleware, async (req, res) => {
  res.json({ user: res.locals.user });
});

module.exports = router;
