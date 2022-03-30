"use strict";

module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.addColumn("kits", "shipped", {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    });
    await queryInterface.addColumn("kits", "shippedAt", {
      type: DataTypes.DATE,
      defaultValue: null,
      allowNull: true,
    });
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn("kits", "shipped");
    await queryInterface.removeColumn("kits", "shippedAt");
  },
};
