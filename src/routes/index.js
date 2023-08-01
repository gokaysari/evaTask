const express = require('express');
const router = express.Router();

// Require the other route files
const userRoutes = require('./userRoutes');
const portfolioRoutes = require('./portfolioRoutes');
const shareRoutes = require('./shareRoutes');
const tradeRoutes = require('./tradeRoutes');

// Use the routes
router.use('/users', userRoutes);
router.use('/portfolios', portfolioRoutes);
router.use('/shares', shareRoutes);
router.use('/trades', tradeRoutes);

module.exports = router;
