const express = require('express');
const router = express.Router();

const authMiddleware = require('../middlewares/auth');

const BasketsController = require('../controllers/baskets.controller');
const basketsController = new BasketsController();

router.post('/', authMiddleware, basketsController.CreateBasket);

module.exports = router;