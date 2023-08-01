const { Model, DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../config/database');

class Portfolio extends Model {}

Portfolio.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'Portfolio',
  timestamps: false
});

module.exports = Portfolio;
