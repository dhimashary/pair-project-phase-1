'use strict';
const bcrypt = require("bcryptjs");
module.exports = (sequelize, DataTypes) => {
  const Admin = sequelize.define('Admin', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    salt: DataTypes.STRING
  }, {
    hooks:
    {
      beforeCreate(admin, options)  {
        return bcrypt.hash(admin.password, 10)
            .then(hash => {
                admin.password = hash;
            })
            .catch(err => { 
                throw new Error(); 
            });
      }
    }
  });
  Admin.associate = function(models) {
    // associations can be defined here
  };
  return Admin;
};