'use strict';
module.exports = (sequelize, DataTypes) => {
  var Address = sequelize.define(
    'address',
    {
      addressLine1: {type: DataTypes.TEXT, allowNull: false},
      addressLine2: {type: DataTypes.TEXT, allowNull: false, defaultValue: ''},
      city: {type: DataTypes.TEXT, allowNull: false},
      state: {type: DataTypes.TEXT, allowNull: false},
      zipcode: {type: DataTypes.TEXT, allowNull: false},
      createdAt: {
        type: DataTypes.DATE,
      },
      updatedAt: {
        type: DataTypes.DATE,
      },
    },
    {}
  );
  return Address;
};
