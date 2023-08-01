const express = require('express');
const router = express.Router();
const tradeController = require('../controllers/tradeController');

// Import express-validator to validate request body
const { body } = require('express-validator');

// Validate request body for 'buy' and 'sell' endpoints
const tradeValidationRules = [
  body('symbol').isLength({ min: 3, max: 3 }).withMessage('Symbol must be 3 characters long'),
  body('portfolioId').isInt().withMessage('Portfolio Id should be an integer'),
  body('quantity').isFloat({ gt: 0 }).withMessage('Quantity should be a number greater than 0')
];

// Validate request body for 'getTradesByPortfolio' endpoint
const portfolioIdValidationRules = [
  body('id').isInt().withMessage('Portfolio Id should be an integer')
];

// Route to buy a share
router.post('/buy', tradeValidationRules, tradeController.buyShare);

// Route to sell a share
router.post('/sell', tradeValidationRules, tradeController.sellShare);

// Route to get trades by portfolio id
router.get('/:id', portfolioIdValidationRules, tradeController.getTradesByPortfolio);

module.exports = router;
