"use strict";
module.exports = (sequelize, DataTypes) => {
  var Kit = sequelize.define(
    "kit",
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: sequelize.literal('uuid_generate_v4()'),
      },
      user: {
        type: DataTypes.UUID,
        references: {
          model: "users",
          key: "id",
        },
      },
      code: {
        type: 'citext',
        unique: true,
        sparse: true,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      shipped: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      shippedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      fulfill: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false,
      },
    },
    {}
  );
  Kit.associate = function (models) {
    Kit.belongsTo(models.User, { as: "User", foreignKey: "user" });
    Kit.belongsTo(models.Address, {
      as: "ShippingAddress",
      foreignKey: "shippingAddress",
    });
  };
  return Kit;
};
