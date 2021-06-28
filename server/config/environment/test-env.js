/*eslint no-process-env:0*/

// Test specific configuration
// ===========================
module.exports = {
  port: 9090,
  forceHttps: false,
  sequelize: {
    uri: process.env.DATABASE_URL || 'postgres://',
    dialect: 'postgres',
    logging: false,
    storage: 'dev.postgres',
    define: {
      timestamps: true
    }
  },
};
