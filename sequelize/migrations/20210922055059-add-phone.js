"use strict";

module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.addColumn("addresses", "phoneNumber", {
      type: DataTypes.TEXT,
      defaultValue: "",
      allowNull: false,
    });
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn("addresses", "phoneNumber");
  },
};
