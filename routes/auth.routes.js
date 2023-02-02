const express = require('express');
const router = express.Router();

const AuthController = require('../controllers/auth.controller');
const authController = new AuthController();

router.post('/join', authController.join);
router.post('/login', authController.login);
router.get('/logout', authController.logout);

module.exports = router;
