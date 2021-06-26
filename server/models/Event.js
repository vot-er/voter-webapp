'use strict';
module.exports = (sequelize, DataTypes) => {
  var Event = sequelize.define(
    'event',
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4
      },
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
    Event.belongsTo(models.Kit, {as: 'Kit', foreignKey: {
      name: 'kit',
      allowNull: true
    }});
  };
  return Event;
};