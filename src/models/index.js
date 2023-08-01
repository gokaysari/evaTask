const Sequelize = require('sequelize');

// Update these details according to your database
const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'postgres',
});

const User = require('./User')(sequelize, Sequelize.DataTypes);
const Portfolio = require('./Portfolio')(sequelize, Sequelize.DataTypes);
const Share = require('./Share')(sequelize, Sequelize.DataTypes);
const Transaction = require('./Transaction')(sequelize, Sequelize.DataTypes);

module.exports = {
  User,
  Portfolio,
  Share,
  Transaction,
};
