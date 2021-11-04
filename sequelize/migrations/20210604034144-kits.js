'use strict';

module.exports = {
  up: async(queryInterface, DataTypes) => {
    await queryInterface.createTable('addresses', {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4
      },
      addressLine1: {type: DataTypes.TEXT, allowNull: false},
      addressLine2: {type: DataTypes.TEXT, allowNull: false, defaultValue: ''},
      city: {type: DataTypes.TEXT, allowNull: false},
      state: {type: DataTypes.TEXT, allowNull: false},
      zipcode: {type: DataTypes.TEXT, allowNull: false},
      phonenumber: {type: DataTypes.TEXT, allowNull: true},
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false
      },
    });
    await queryInterface.createTable('kits', {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4
      },
      user: {
        type: DataTypes.UUID,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      code: {
        type: DataTypes.TEXT,
        unique: true,
        sparse: true
      },
      shippingAddress: {
        type: DataTypes.UUID,
        references: {
          model: 'addresses',
          key: 'id'
        }
      },
      createdAt: {
        type: DataTypes.DATE,
      },
      updatedAt: {
        type: DataTypes.DATE,
      },
    });
  },

  down: async queryInterface => {
    await queryInterface.dropTable('kits');
    await queryInterface.dropTable('addresses');
  }
};
