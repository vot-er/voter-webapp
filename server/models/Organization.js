'use strict';
module.exports = (sequelize, DataTypes) => {
  var Organization = sequelize.define(
    'organization',
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4
      },
      name: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true
      },
    },
    {}
  );
  Organization.associate = function(models) {
    // associations can be defined here
  };
  return Organization;
};
