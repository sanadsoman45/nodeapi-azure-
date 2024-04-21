const User = require("./models/user");
const {sequelize} = require("./config"); 

async function syncDatabase() {
  try {
    await sequelize.sync(); 
    // await sequelize.sync();
    console.log("Database synchronized successfully");
  } catch (error) {
    console.error("Error synchronizing database:", error);
  }
}

module.exports = {
    syncDatabase
}