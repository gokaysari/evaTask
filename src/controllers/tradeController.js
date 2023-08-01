const { validationResult } = require('express-validator');
const Trade = require('../models/trade');
const Share = require('../models/share');
const Portfolio = require('../models/portfolio');

exports.buyShare = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const share = await Share.findOne({ where: { symbol: req.body.symbol } });
    const portfolio = await Portfolio.findOne({ where: { id: req.body.portfolioId } });

    if (!share) {
      return res.status(404).send('The share with the specified SYMBOL does not exist.');
    }

    if (!portfolio) {
      return res.status(404).send('The portfolio with the specified ID does not exist.');
    }

    const newTrade = await Trade.create({
      shareSymbol: share.symbol,
      portfolioId: portfolio.id,
      type: 'BUY',
      price: share.price,
      quantity: req.body.quantity
    });

    res.status(201).json(newTrade);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.sellShare = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const share = await Share.findOne({ where: { symbol: req.body.symbol } });
    const portfolio = await Portfolio.findOne({ where: { id: req.body.portfolioId } });

    if (!share) {
      return res.status(404).send('The share with the specified SYMBOL does not exist.');
    }

    if (!portfolio) {
      return res.status(404).send('The portfolio with the specified ID does not exist.');
    }

    const sharesInPortfolio = await Trade.sum('quantity', {
      where: {
        shareSymbol: share.symbol,
        portfolioId: portfolio.id,
        type: 'BUY'
      }
    });

    const sharesSold = await Trade.sum('quantity', {
      where: {
        shareSymbol: share.symbol,
        portfolioId: portfolio.id,
        type: 'SELL'
      }
    });

    const availableShares = sharesInPortfolio - sharesSold;

    if (availableShares < req.body.quantity) {
      return res.status(400).send('Insufficient shares to sell.');
    }

    const newTrade = await Trade.create({
      shareSymbol: share.symbol,
      portfolioId: portfolio.id,
      type: 'SELL',
      price: share.price,
      quantity: req.body.quantity
    });

    res.status(201).json(newTrade);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.getTradesByPortfolio = async (req, res) => {
  try {
    const trades = await Trade.findAll({ where: { portfolioId: req.params.id } });

    if (!trades) {
      return res.status(404).send('No trades found for the specified portfolio ID.');
    }

    res.status(200).json(trades);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
