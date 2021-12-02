"use strict";

module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.addColumn("users", "firstName", {
      type: DataTypes.TEXT,
      defaultValue: "",
      allowNull: false,
    });
    await queryInterface.addColumn("users", "lastName", {
      type: DataTypes.TEXT,
      defaultValue: "",
      allowNull: false,
    });
    await queryInterface.sequelize.query(
      `UPDATE users
      SET "firstName" = SPLIT_PART("name", ' ', 1),
      "lastName" = SUBSTRING("name", POSITION(' ' in "name") + 1)`
    );
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn("users", "lastName");
    await queryInterface.removeColumn("users", "firstName");
  },
};
