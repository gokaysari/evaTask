const express = require('express');
const router = express.Router();

const { tradeController } = require('../controllers');

router.post('/buy', tradeController.buy);
router.post('/sell', tradeController.sell);

module.exports = router;
