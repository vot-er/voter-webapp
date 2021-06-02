'use strict';
module.exports = (sequelize, DataTypes) => {
  var Organization = sequelize.define(
    'organization',
    {
      name: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      airtableId: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {}
  );
  Organization.associate = function(models) {
    // associations can be defined here
  };
  return Organization;
};
