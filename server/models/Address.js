"use strict";
module.exports = (sequelize, DataTypes) => {
  var Address = sequelize.define(
    "address",
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: sequelize.literal('uuid_generate_v4()'),
      },
      addressLine1: { type: DataTypes.TEXT, allowNull: false },
      addressLine2: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: "",
      },
      city: { type: DataTypes.TEXT, allowNull: false },
      state: { type: DataTypes.TEXT, allowNull: false },
      zipcode: { type: DataTypes.TEXT, allowNull: false },
      phoneNumber: { type: DataTypes.TEXT, allowNull: true },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
      },
    },
    {}
  );
  return Address;
};
