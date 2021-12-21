"use strict";

module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.sequelize.query(
      `update users set "occupation" = "jobTitle" where "createdAt" < '2021-12-04' :: date and "jobTitle" is not null`
    );
    await queryInterface.sequelize.query(
      `update users set "jobTitle" = '' where "createdAt" < '2021-12-04' :: date`
    );
  },

  down: async (queryInterface) => {
    await queryInterface.sequelize.query(
      `update users set "jobTitle" = "occupation" where "createdAt" < '2021-12-04' :: date`
    );
    await queryInterface.sequelize.query(
      `update users set "occupation" = '' where "createdAt" < '2021-12-04' :: date`
    );
  },
};
