'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    date: DataTypes.DATE
  }, {});
  Product.associate = function(models) {
    Product.belongsToMany(models.User, { through: models.Transaction})
    Product.hasMany(models.Transaction)
  };
  return Product;
};