'use strict';

const {DataTypes} = require('sequelize');
module.exports = {
  up: async queryInterface => {
    await queryInterface.removeColumn('users', 'occupation');
  },

  down: async queryInterface => {
    await queryInterface.addColumn('users', 'occupation', DataTypes.TEXT);
  }
};
