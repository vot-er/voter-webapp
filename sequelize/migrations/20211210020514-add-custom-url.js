"use strict";

module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.addColumn("organizations", "customUrl", {
      type: DataTypes.TEXT,
      allowNull: true,
    });
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn("organizations", "customUrl");
  },
};
