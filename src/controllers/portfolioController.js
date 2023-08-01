const { validationResult } = require('express-validator');
const Portfolio = require('../models/portfolio');

exports.createPortfolio = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const newPortfolio = await Portfolio.create(req.body);
    res.status(201).json(newPortfolio);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.getAllPortfolios = async (req, res) => {
  try {
    const portfolios = await Portfolio.findAll();
    res.status(200).json(portfolios);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.getPortfolioById = async (req, res) => {
  try {
    const portfolio = await Portfolio.findOne({ where: { id: req.params.id } });
    if (portfolio) {
      res.status(200).json(portfolio);
    } else {
      res.status(404).send('Portfolio with the specified ID does not exists');
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.updatePortfolio = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const updatedPortfolio = await Portfolio.update(req.body, { where: { id: req.params.id } });
    if (updatedPortfolio[0] === 0) {
      return res.status(404).send('The portfolio with the specified ID does not exist.');
    }
    res.status(200).json(updatedPortfolio);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.deletePortfolio = async (req, res) => {
  try {
    const portfolio = await Portfolio.destroy({ where: { id: req.params.id } });
    if (!portfolio) {
      return res.status(404).send('The portfolio with the specified ID does not exist.');
    }
    res.status(200).json(portfolio);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
