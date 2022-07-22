const Users = require("../models/userDB");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const {
      username,
      firstname,
      lastname,
      email,
      phoneNumber,
      password,
      confirmPass,
    } = req.body;

    if (!(username && email && phoneNumber && password && confirmPass)) {
      res.status(400).json({ error: "All input is requires" });
    }

    const oldUser = await Users.findOne({ email, username });

    if (oldUser) {
      res.status(400).json({ error: "user already exist" });
    }
    if (password != confirmPass) {
      res.status(400).json({ error: "Please check password" });
    }

    encrytedPassword = await bcrypt.hash(password, 10);
    encrytedConfirmPassword = await bcrypt.hash(confirmPass, 10);

    //create user
    const user = await Users.create({
      username: username,
      firstname: firstname,
      lastname: lastname,
      email: email.toLowerCase(),
      phoneNumber: phoneNumber,
      password: encrytedPassword,
      confirmPass: encrytedConfirmPassword,
    });

    //creat token

    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.JWT_SECRET,
      {
        expiresIn: "5h",
      }
    );

    user.token = token;
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  register,
};
