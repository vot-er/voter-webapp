'use strict';
module.exports = (sequelize, DataTypes) => {
  var Order = sequelize.define(
    'order',
    {
      firstName: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      stateOfWork: {
        type: DataTypes.TEXT,
      },
      airtableId: {
        type: DataTypes.TEXT,
      },
    },
    {}
  );
  Order.associate = function(models) {
    // associations can be defined here
  };
  return Order;
};
