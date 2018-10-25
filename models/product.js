'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    date: DataTypes.DATE
  }, {});
  Product.associate = function(models) {
    // associations can be defined here
  };
  return Product;
};