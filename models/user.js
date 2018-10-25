'use strict';
const bcrypt = require("bcryptjs");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      validate: {
        isUnique: (value, cb) => {
          User.findAll({
            where: {
              username: value
            }
          })
          .then(data => {
            if(data.length > 0){
              cb("Username already exist")
            }else{
              cb()
            }
          })
          .catch((err) => {
            throw err
          })
        }
      }
    },    
    password: DataTypes.STRING,
    salt: DataTypes.STRING
  }, {
    hooks:
    {
      beforeCreate(user, options)  {
        return bcrypt.hash(user.password, 10)
            .then(hash => {
                user.password = hash;
            })
            .catch(err => { 
                throw new Error(); 
            });
      }
    }
  });
  User.associate = function(models) {
    User.belongsToMany(models.Product, {through: models.Transaction})
    User.hasMany(models.Transaction)
  };
  return User;
};