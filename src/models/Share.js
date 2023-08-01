const { Model, DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../config/database');

class Share extends Model {}

Share.init({
  symbol: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false
  },
  price: {
    type: DataTypes.DOUBLE,
    allowNull: false
  },
}, {
  sequelize,
  modelName: 'Share',
  timestamps: false
});

module.exports = Share;
