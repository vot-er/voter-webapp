'use strict';
module.exports = (sequelize, DataTypes) => {
  var Event = sequelize.define(
    'event',
    {
      type: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      code: DataTypes.TEXT,
      destination: DataTypes.TEXT,
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      ip: DataTypes.TEXT,
      userAgent: DataTypes.TEXT,
      device: DataTypes.TEXT,
      browser: DataTypes.TEXT,
      os: DataTypes.TEXT,
      platform: DataTypes.TEXT,
    },
    {}
  );
  Event.associate = function(models) {
    // associations can be defined here
  };
  return Event;
};
