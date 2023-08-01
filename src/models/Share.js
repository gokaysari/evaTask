const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Share extends Model {}

Share.init({
  symbol: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  price: DataTypes.FLOAT,
}, {
  sequelize,
  modelName: 'share',
});

module.exports = Share;
