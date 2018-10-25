'use strict';
const bcrypt = require("bcryptjs");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: DataTypes.STRING,
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
    // associations can be defined here
  };
  return User;
};