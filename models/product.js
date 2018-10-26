'use strict';
const sequelize = require('sequelize');
const Op = sequelize.Op;

module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    date: DataTypes.DATE
  }, {});
  Product.associate = function (models) {
    Product.belongsToMany(models.User, {
      through: models.Transaction
    })
    Product.hasMany(models.Transaction)
  };

  Product.prototype.setPrice = function () {
    return `Rp. ${this.price}`;
  }

  Product.findLowPrice = function () {
    return new Promise((resolve, reject) => {
      Product.findAll({
          where: {
            price : {
              [Op.lt]: 400000
            }
          }
        })
        .then(data => {
          console.log('THEN');
          
          resolve(data)
        })
        .catch((err) => {
          console.log('reject');
          
          reject(err)
        })
    })
  }

  return Product;
};