module.exports = (sequelize, DataTypes) => {
    const Transaction = sequelize.define('Transaction', {
      type: {
        type: DataTypes.ENUM,
        values: ['BUY', 'SELL'],
        allowNull: false,
      },
      shareID: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      portfolioID: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      rate: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    });
  
    return Transaction;
  };
  