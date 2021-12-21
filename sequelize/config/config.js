require("dotenv").config();
const parse = require("pg-connection-string").parse;
const parsed = parse(process.env.DATABASE_URL || "");

module.exports = {
  development: {
    username: parsed.user || "",
    password: parsed.password || null,
    database: parsed.database || "",
    host: parsed.host || "127.0.0.1",
    port: parsed.port || "5432",
    dialect: "postgres",
    define: {
      timestamps: true,
    },
  },
  test: {
    username: parsed.user,
    password: parsed.password,
    database: parsed.database,
    host: parsed.host,
    port: parsed.port,
    dialect: "postgres",
    define: {
      timestamps: true,
    },
  },
  production: {
    username: parsed.user,
    password: parsed.password,
    database: parsed.database,
    host: parsed.host,
    port: parsed.port,
    dialect: "postgres",
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
