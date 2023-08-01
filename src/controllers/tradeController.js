const { User, Portfolio, Share, Transaction } = require('../models');

const buy = async (req, res) => {
  const { userID, portfolioID, shareID, amount } = req.body;

  const user = await User.findByPk(userID);
  if (!user) return res.status(404).json({ error: 'User not found' });

  const portfolio = await Portfolio.findOne({ where: { id: portfolioID, userID: userID } });
  if (!portfolio) return res.status(404).json({ error: 'Portfolio not found for the given user' });

  const share = await Share.findByPk(shareID);
  if (!share) return res.status(404).json({ error: 'Share not found' });

  const transaction = await Transaction.create({
    type: 'BUY',
    shareID: shareID,
    portfolioID: portfolioID,
    rate: share.rate,
    amount: amount
  });

  res.json(transaction);
};

const sell = async (req, res) => {
  const { userID, portfolioID, shareID, amount } = req.body;

  const user = await User.findByPk(userID);
  if (!user) return res.status(404).json({ error: 'User not found' });

  const portfolio = await Portfolio.findOne({ where: { id: portfolioID, userID: userID } });
  if (!portfolio) return res.status(404).json({ error: 'Portfolio not found for the given user' });

  const share = await Share.findByPk(shareID);
  if (!share) return res.status(404).json({ error: 'Share not found' });

  const ownedShares = await Transaction.findOne({
    where: { shareID: shareID, portfolioID: portfolioID },
    attributes: [
      [sequelize.fn('sum', sequelize.col('amount')), 'totalShares']
    ],
    group: ['transaction.type']
  });

  if (!ownedShares || (ownedShares.get('totalShares') < amount)) return res.status(400).json({ error: 'Insufficient shares to sell' });

  const transaction = await Transaction.create({
    type: 'SELL',
    shareID: shareID,
    portfolioID: portfolioID,
    rate: share.rate,
    amount: amount
  });

  res.json(transaction);
};

module.exports = {
  buy,
  sell
};
