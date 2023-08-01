const express = require('express');
const router = express.Router();

const tradeRoutes = require('./tradeRoutes');

router.use('/trade', tradeRoutes);

module.exports = router;
