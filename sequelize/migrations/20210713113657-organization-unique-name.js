'use strict';

module.exports = {
  up: async(queryInterface, DataTypes) => {
    await queryInterface.addConstraint('organizations', {
      type: 'unique',
      fields: ['name']
    });
    await queryInterface.addColumn('organizations', 'public', {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    });
  },

  down: async queryInterface => {
    await queryInterface.removeColumn('organizations', 'public');
    await queryInterface.removeConstraint('organizations', 'organizations_name_uk');
  }
};
