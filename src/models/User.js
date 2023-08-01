const { Model, DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../config/database'); // this path should be to your sequelize instance

class User extends Model {}

User.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  }
}, {
  sequelize,  // This is where you pass the instance
  modelName: 'User',
  timestamps: false, // Assuming you do not need timestamp fields "createdAt" and "updatedAt"
  // Other model options go here
});

module.exports = User;
