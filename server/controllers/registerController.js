const Users = require("../models/userDB");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const { username, email, password, confirmPass } = req.body;

    if (!(username && email && password && confirmPass)) {
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
      email: email.toLowerCase(),
      password: encrytedPassword,
      confirmPass: encrytedConfirmPassword,
    });

    //creat token

    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.JWT_SECRET,
      {
        expiresIn: "2h",
      }
    );

    user.token = token;
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
  }
};
