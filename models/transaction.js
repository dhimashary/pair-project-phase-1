'use strict';
module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define('Transaction', {
    UserId: DataTypes.INTEGER,
    ProductId: DataTypes.INTEGER,
    TotalPrice: DataTypes.INTEGER
  }, {});
  Transaction.associate = function(models) {
    // associations can be defined here
    Transaction.belongsTo(models.Product)
  };
  return Transaction;
};