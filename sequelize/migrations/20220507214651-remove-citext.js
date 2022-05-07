'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('events', 'code', {
      type: Sequelize.TEXT,
    });
    await queryInterface.changeColumn('kits', 'code', {
      type: Sequelize.TEXT,
      unique: true,
      sparse: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('events', 'code', {
      type: 'citext',
    });
    await queryInterface.changeColumn('kits', 'code', {
      type: 'citext',
      unique: true,
      sparse: true,
    });
  }
};
