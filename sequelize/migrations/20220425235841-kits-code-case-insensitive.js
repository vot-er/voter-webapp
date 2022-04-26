'use strict';

module.exports = {
  async up (queryInterface, DataTypes) {
    await queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "citext";');
    await queryInterface.changeColumn('kits', 'code', {
      type: 'citext',
      unique: true,
      sparse: true,
    });
  },

  async down (queryInterface, DataTypes) {
    await queryInterface.sequelize.query('DROP EXTENSION "citext";');
    await queryInterface.changeColumn('kits', 'code', {
      type: DataTypes.TEXT,
      unique: true,
      sparse: true,
    });
  }
};
