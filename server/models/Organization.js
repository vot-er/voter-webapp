"use strict";
module.exports = (sequelize, DataTypes) => {
  var Organization = sequelize.define(
    "organization",
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: sequelize.literal('uuid_generate_v4()'),
      },
      name: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true,
      },
      customUrl: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      public: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {}
  );
  Organization.associate = function (models) {
    Organization.hasMany(models.User, { foreignKey: "organization" });
  };
  return Organization;
};
