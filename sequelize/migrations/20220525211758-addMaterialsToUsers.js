'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
     await queryInterface.addColumn('users', 'siteBasedMaterials', Sequelize.TEXT );
     await queryInterface.addColumn('users', 'bulkOrderMaterials', Sequelize.TEXT );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('users', 'siteBasedMaterials');
    await queryInterface.removeColumn('users', 'bulkOrderMaterials');
  }
};
