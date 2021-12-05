"use strict";

module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.addColumn("users", "occupation", {
      type: DataTypes.TEXT,
      defaultValue: "",
      allowNull: false,
    });
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn("users", "occupation");
  },
};
