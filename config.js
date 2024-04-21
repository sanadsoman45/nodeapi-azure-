require("dotenv").config();
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.db_database,
  process.env.db_user,
  process.env.db_password,
  {
    host: process.env.db_host,
    port: process.env.db_port || 3306,
    dialect: process.env.db_dialect, 
    connectTimeout: process.env.db_connection_timeout,
  }
);

module.exports = {sequelize};
