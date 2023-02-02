const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/auth');

const UsersController = require('../controllers/users.controller');
const usersController = new UsersController();

router.get('/users/', authMiddleware, usersController.getUserData);
// router.put('/users/', authMiddleware, usersController.changeUserData);

module.exports = router;
