"use strict";

module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.addColumn("users", "stateOfWork", {
      type: DataTypes.TEXT,
    });
    await queryInterface.addColumn("users", "occupation", {
      type: DataTypes.TEXT,
    });
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn("users", "occupation");
    await queryInterface.removeColumn("users", "stateOfWork");
  },
};
