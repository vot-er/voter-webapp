/**
 * Sequelize initialization module
 */

"use strict";

import config from "../config/environment";
import Sequelize from "sequelize";

// Fixes bug where decimal is parsed as string
Sequelize.postgres.DECIMAL.parse = (value) => parseFloat(value);

export { Sequelize };
export const sequelize = new Sequelize(config.sequelize.uri, config.sequelize);

export const Session = require("./session/session.model").default(
  sequelize,
  Sequelize
);
export const User = require("../api/user/user.model").default(
  sequelize,
  Sequelize
);
