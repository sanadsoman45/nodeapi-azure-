const { where } = require("sequelize");
const User = require("../models/user");
const { UserDetails } = require("../models/userDetails");

async function getUsers(req, res) {
  try {
    const users = await User.findAll({
      include: {
        model: UserDetails,
        as: "UserDetails",
      },
    });

    //normalising the array rather than having nested json as map takes each object and returns a new array with the transformed values.
    const formattedUsers = users.map((user) => ({
      userName: user.userName,
      email: user.email,
      password: user.password,
      firstName: user.UserDetails.firstName,
      address: user.UserDetails.address,
      city: user.UserDetails.city,
    }));

    return res.status(201).json({
      msg: "success",
      user: formattedUsers,
    });
  } catch (error) {
    throw error;
  }
}

async function getUserByUserName(req, res) {
  try {
    if (!req.body || !req.body.userName) {
      return res.status(400).json({ msg: "User Name is Required." });
    } else {
      const user = await User.findOne({
        where: { userName: req.body.userName },
        include: {
          model: UserDetails,
          as: "UserDetails",
        },
      });

      console.log(user);
      if (user != null) {
        const formattedUsers = {
          userName: user.userName,
          email: user.email,
          password: user.password,
          firstName: user.UserDetails.firstName,
          address: user.UserDetails.address,
          city: user.UserDetails.city,
        };
        return res.status(201).json({ msg: "Success", user: formattedUsers });
      }
      return res.status(200).json({
        msg: "success",
        user: `No User Found For ${req.body.userName}`,
      });
    }
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getUsers,
  getUserByUserName,
};
