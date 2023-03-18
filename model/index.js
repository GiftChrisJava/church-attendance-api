// access dabase configurations
const dbConfig = require("../config/db");

// get sequelize
const { Sequelize, DataTypes } = require("sequelize");

// creating a sequelize instance
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.DIALECT,
  operatorsAliases: false,
});

// authenticate
sequelize
  .authenticate()
  .then(() => {
    console.log("connected...");
  })
  .catch(console.error());

// working with the database
const database = {}; // a database object

database.Sequelize = Sequelize;
database.sequelize = sequelize;

// defining entities in the db
const contact = require("./contact")(sequelize, DataTypes);
const organisation = require("./organisation")(sequelize, DataTypes);
const member = require("./member")(sequelize, DataTypes);
const attendance = require("./attendance")(sequelize, DataTypes);

// associations between a member, attendance, contact and an organisation
member.belongsTo(organisation, {
  foreignKey: "orgId",
});

member.hasMany(attendance, {
  foreignKey: "memberId",
});

member.hasMany(contact, {
  foreignKey: "memberId",
});

contact.belongsTo(member, {
  foreignKey: "memberId",
});

// assoc btwn org, member and attendance
organisation.hasMany(member, {
  foreignKey: "orgId",
});

organisation.hasMany(attendance, {
  foreignKey: "orgId",
});

// associations between attendance, member and org
attendance.belongsTo(member, {
  foreignKey: "memberId",
});

attendance.belongsTo(organisation, {
  foreignKey: "orgId",
});

database.contact = contact;
database.member = member;
database.organisation = organisation;
database.attendance = attendance;

// sequelize the database or creating the actual db with defines entities
database.sequelize.sync({ force: false }).then(() => {
  console.log("re-sync done!");
});

// export the database
module.exports = database;
