"use strict";

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.renameColumn("users", "occupation", "jobTitle");
  },

  down: async (queryInterface) => {
    await queryInterface.renameColumn("users", "jobTitle", "occupation");
  },
};
