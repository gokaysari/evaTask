const { Model, DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../config/database');

class Trade extends Model {}

Trade.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  shareSymbol: {
    type: DataTypes.STRING,
    allowNull: false
  },
  portfolioId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  type: {
    type: DataTypes.ENUM('BUY', 'SELL'),
    allowNull: false
  },
  price: {
    type: DataTypes.DOUBLE,
    allowNull: false
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'Trade',
  timestamps: false
});

module.exports = Trade;
