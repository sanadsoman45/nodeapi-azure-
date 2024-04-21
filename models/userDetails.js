const { DataTypes } = require("sequelize");
const { sequelize } = require("../config");
require("dotenv").config();

const UserDetails = sequelize.define(process.env.db_user_Detailstable, {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = {
  UserDetails,
};
