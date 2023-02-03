const express = require('express');
const BasketController = require('../controllers/baskets.controller');

const router = express.Router();
const basketController = new BasketController();

router.route('/').get(basketController.getBaskets).post();
router.route('/:id').patch().delete();

module.exports = router;
