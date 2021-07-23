'use strict';

module.exports = {
  up: async queryInterface => {
    await queryInterface.removeConstraint('organizations', 'organizations_name_uk');
  },

  down: async queryInterface => {
    await queryInterface.addConstraint('organizations', {
      type: 'unique',
      fields: ['name']
    });
  }
};
