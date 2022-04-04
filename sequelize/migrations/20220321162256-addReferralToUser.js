'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn("users", "referral", {
      type: Sequelize.TEXT,
      allowNull: true,
    });
  },

  async down (queryInterface) {
    await queryInterface.removeColumn("users", "referral");
  }
};
