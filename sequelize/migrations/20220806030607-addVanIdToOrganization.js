'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('organizations', 'vanId', Sequelize.INTEGER );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('organizations', 'vanId');
  }
};
