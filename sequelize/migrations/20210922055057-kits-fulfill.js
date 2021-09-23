'use strict';

module.exports = {
  up: async(queryInterface, DataTypes) => {
    await queryInterface.addColumn('kits', 'fulfill', {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false
    });
  },

  down: async queryInterface => {
    await queryInterface.removeColumn('kits', 'fulfill');
  }
};
