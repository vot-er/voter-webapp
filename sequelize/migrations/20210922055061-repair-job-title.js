"use strict";

module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.sequelize.query(
      `update users set "occupation" = "jobTitle" where "createdAt" < '2020-12-04' :: date`
    );
  },

  down: async (queryInterface) => {
    await queryInterface.sequelize.query(
      `update users set "jobTitle" = "occupation" where "createdAt" < '2020-12-04' :: date`
    );
  },
};
