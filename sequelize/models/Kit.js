'use strict';
module.exports = (sequelize, DataTypes) => {
  var Kit = sequelize.define(
    'kit',
    {
      code: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      }
    },
    {}
  );
  Kit.associate = function(models) {
    Kit.hasOne(models.Address, {as: 'ShippingAddress', foreignKey: {
      name: 'shippingAddress',
      allowNull: true
    }});
  };
  return Kit;
};
