/*eslint no-process-env:0*/

// Development specific configuration
// ==================================
module.exports = {
  sequelize: {
    uri: process.env.DATABASE_URL || 'postgres://',
    dialect: 'postgres',
    logging: false,
    storage: 'dev.postgres',
    define: {
      timestamps: true
    }
  },
  email: {
    name: 'VotER',
    address: process.env.NOTIFICATIONS_EMAIL
  },
  forceHttps: false,
  // Seed database on startup
  seedDB: true

};
