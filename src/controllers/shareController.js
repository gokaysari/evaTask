const { validationResult } = require('express-validator');
const Share = require('../models/share');

exports.createShare = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const newShare = await Share.create(req.body);
    res.status(201).json(newShare);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.getAllShares = async (req, res) => {
  try {
    const shares = await Share.findAll();
    res.status(200).json(shares);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.getShareBySymbol = async (req, res) => {
  try {
    const share = await Share.findOne({ where: { symbol: req.params.symbol } });
    if (share) {
      res.status(200).json(share);
    } else {
      res.status(404).send('Share with the specified symbol does not exists');
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.updateShare = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const updatedShare = await Share.update(req.body, { where: { symbol: req.params.symbol } });
    if (updatedShare[0] === 0) {
      return res.status(404).send('The share with the specified Symbol does not exist.');
    }
    res.status(200).json(updatedShare);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.deleteShare = async (req, res) => {
  try {
    const share = await Share.destroy({ where: { symbol: req.params.symbol } });
    if (!share) {
      return res.status(404).send('The share with the specified Symbol does not exist.');
    }
    res.status(200).json(share);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
