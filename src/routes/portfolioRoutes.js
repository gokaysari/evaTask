const express = require('express');
const router = express.Router();
const portfolioController = require('../controllers/portfolioController');

// Route to get all portfolios
router.get('/', portfolioController.getAllPortfolios);

// Route to get a portfolio by user id
router.get('/:userId', portfolioController.getPortfolioById);

// Route to create a new portfolio
router.post('/', portfolioController.createPortfolio);

// Route to update an existing portfolio
router.put('/:userId', portfolioController.updatePortfolio);

// Route to delete a portfolio
router.delete('/:userId', portfolioController.deletePortfolio);

module.exports = router;
