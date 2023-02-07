const express = require('express');
const router = express.Router();

const BasketsController = require('../controllers/baskets.controller');
const basketsController = new BasketsController();

router.post('/', basketsController.CreateBasket);

module.exports = router;