const User = require("../models/user");
const bcrypt = require("bcrypt");
const { UserDetails } = require("../models/userDetails");

async function createUser(req, res) {
  try {
    const body = req.body;
    if (!body || !body.userName || !body.email || !body.password) {
      return res.status(400).json({ msg: "All Fields are required.." });
    }

    const hashedPassword = await bcrypt.hash(body.password, 10);

    //creating a json for userdetails
    const userDetails = {
      firstName: body.firstName,
      address: body.address,
      city: body.city,
    };

    //setting the userdetails the value of created userdetails json & rest values from body.
    const user = await User.create(
      {
        userName: body.userName,
        email: body.email,
        password: hashedPassword,
        create_time: body.create_time,
        UserDetails: userDetails,
      },
      {
        include: {
          model: UserDetails, //name of model which we need to show if the user is inserted
          as: "UserDetails", // alias name which should be used to refer the model.
        },
      }
    );

    //normalising the User json based on the values that needs to be returned.
    const normalisedUser = {
      userName: user.userName,
      email: user.email,
      password: user.password,
      create_time: user.create_time,
      firstName: user.UserDetails.firstName,
      address: user.UserDetails.address,
      city: user.UserDetails.city,
    };

    //returning the json object with success code of 201 & users json with succes message.
    return res.status(201).json({ msg: "success", user: normalisedUser });
  } catch (error) {
    console.error("Error in createUser:", error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
}

module.exports = {
  createUser,
};
