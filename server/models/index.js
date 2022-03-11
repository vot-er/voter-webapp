"use strict";
import Address from "./Address";
import Event from "./Event";
import Kit from "./Kit";
import Organization from "./Organization";
import Session from "./Session";
import User from "./User";
import config from "../config/environment";
import Sequelize from "sequelize";

var db = {};

const sequelize = new Sequelize(config.sequelize.uri, config.sequelize);

function importModel(model) {
  return model(sequelize, Sequelize.DataTypes);
}

db.User = importModel(User);
db.Kit = importModel(Kit);
db.Event = importModel(Event);
db.Organization = importModel(Organization);
db.Session = importModel(Session);
db.Address = importModel(Address);

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
