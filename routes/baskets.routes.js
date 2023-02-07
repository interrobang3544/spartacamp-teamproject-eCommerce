const express = require('express');
const BasketController = require('../controllers/baskets.controller');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();
const basketController = new BasketController();

router.route('/').get(authMiddleware, basketController.getBaskets).post();
router
  .route('/:id')
  .patch(authMiddleware, basketController.patchBasketQuantity)
  .delete(authMiddleware, basketController.deleteBasket);
router.post('/order', authMiddleware, basketController.orderBasket);

module.exports = router;
