"use strict";

module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable("organizations", {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
      },
      updatedAt: {
        type: DataTypes.DATE,
      },
    });
    await queryInterface.createTable("events", {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
      },
      type: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      code: DataTypes.TEXT,
      destination: DataTypes.TEXT,
      ip: DataTypes.TEXT,
      userAgent: DataTypes.TEXT,
      device: DataTypes.TEXT,
      browser: DataTypes.TEXT,
      os: DataTypes.TEXT,
      platform: DataTypes.TEXT,
      organization: {
        type: DataTypes.UUID,
        references: {
          model: "organizations",
          key: "id",
        },
      },
      user: {
        type: DataTypes.UUID,
        references: {
          model: "users",
          key: "id",
        },
      },
      kit: {
        type: DataTypes.UUID,
        references: {
          model: "kits",
          key: "id",
        },
      },
      createdAt: {
        type: DataTypes.DATE,
      },
      updatedAt: {
        type: DataTypes.DATE,
      },
    });
    await queryInterface.addColumn("users", "organization", {
      type: DataTypes.UUID,
      references: {
        model: "organizations",
        key: "id",
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn("users", "organization");
    await queryInterface.dropTable("events");
    await queryInterface.dropTable("organizations");
  },
};
