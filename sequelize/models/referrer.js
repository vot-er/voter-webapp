'use strict';
module.exports = (sequelize, DataTypes) => {
  var Referrer = sequelize.define(
    'referrer',
    {
      code: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true,
      },
    },
    {}
  );
  Referrer.associate = function(models) {
    // associations can be defined here
  };
  Referrer.put = async function(referrer) {
    const existing = await Referrer.findOne({
      code: referrer.code,
    });
    if (existing) return existing;
    return Referrer.create(referrer);
  };
  return Referrer;
};
