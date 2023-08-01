const Sequelize = require('sequelize');
const databaseConfig = require('../config/database');

const sequelize = new Sequelize(databaseConfig.database, databaseConfig.username, databaseConfig.password, databaseConfig.options);

const User = require('./User');
const Portfolio = require('./Portfolio');
const Share = require('./Share');
const Trade = require('./Trade');

// Initialize models
const models = {
  User: User.init(sequelize, Sequelize),
  Portfolio: Portfolio.init(sequelize, Sequelize),
  Share: Share.init(sequelize, Sequelize),
  Trade: Trade.init(sequelize, Sequelize)
}

// Define the relationships between the models
User.hasOne(Portfolio, { foreignKey: 'userId', onDelete: 'CASCADE' });
Portfolio.belongsTo(User, { foreignKey: 'userId' });

Portfolio.hasMany(Trade, { foreignKey: 'portfolioId', onDelete: 'CASCADE' });
Trade.belongsTo(Portfolio, { foreignKey: 'portfolioId' });

Share.hasMany(Trade, { foreignKey: 'shareSymbol', onDelete: 'CASCADE' });
Trade.belongsTo(Share, { foreignKey: 'shareSymbol' });

module.exports = {
  ...models,
  sequelize
};
