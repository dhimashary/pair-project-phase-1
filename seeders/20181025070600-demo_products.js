'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Products', [{
      name : 'Event Marathon',
      price : 200000,
      date:new Date(),
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name : 'Sing event',
      price : 200000,
      date:new Date(),
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name : 'Coldplay concert',
      price : 300000,
      date:new Date(),
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Products', null, {});
  }
};
