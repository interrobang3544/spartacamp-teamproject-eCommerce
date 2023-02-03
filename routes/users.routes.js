const express = require('express');
const router = express.Router();

const authMiddleware = require('../middlewares/auth');

const UsersController = require('../controllers/users.controller');
const usersController = new UsersController();

router.get('/', authMiddleware, usersController.getUserData);
router.put('/', authMiddleware, usersController.changeUserData);

module.exports = router;
