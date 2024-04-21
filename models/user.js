const { DataTypes } = require("sequelize");
const {sequelize} = require("../config");
const { UserDetails } = require("./userDetails");
require("dotenv").config();

const User = sequelize.define(
  process.env.db_table,
  {
    userName: {
      unique:true,
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

User.hasOne(UserDetails,{as:"UserDetails"});
UserDetails.belongsTo(User);
module.exports = User;
