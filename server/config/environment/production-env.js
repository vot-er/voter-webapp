/*eslint no-process-env:0*/

// Production specific configuration
// =================================

// Heroku URI provided
module.exports = {
  // Server IP
  ip: process.env.OPENSHIFT_NODEJS_IP || process.env.IP || "0.0.0.0",

  // Server port
  port: process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 8080,

  forceHttps: process.env.FORCE_HTTPS !== "false",

  redis: {
    uri: process.env.REDIS_URL || "redis://",
  },

  // Postgres connection options
  sequelize: {
    uri: process.env.DATABASE_URL || "postgres://",
    dialect: "postgres",
    protocol: "postgres",
    logging: false,
    storage: "dist.postgres",
    ssl: true,
    define: {
      timestamps: true,
    },
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
};
