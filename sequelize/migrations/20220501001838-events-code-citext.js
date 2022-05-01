'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('events', 'code', {
      type: 'citext',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('events', 'code', {
      type: Sequelize.TEXT,
    });
  }
};
