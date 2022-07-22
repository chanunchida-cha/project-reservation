const Users = require("../models/userDB");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    if (!(username && password)) {
      res.status(400).json({ error: "All input is requires" });
    }

    const user = await Users.findOne({
      username: username,
    });

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        { user_id: user._id, username },
        process.env.JWT_SECRET,
        {
          expiresIn: "5h",
        }
      );
      user.token = token;
      res.status(200).json(user);
    }
    res.status(404).json({ error: "check username or password " });
  } catch (err) {
    console.log(err);
  }
};

const getUser = async (req, res) => {
  try {
    const user = await Users.findById(req.user.user_id);
    if (!user) throw Error("User does not exist");
    res.json(user);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { oldPassWord, newPassWord, confirmNewPassWord } = req.body;
    // encrytedPassword = await bcrypt.hash(oldPassWord, 10);
    const user = await Users.findById(req.user.user_id);

    if (newPassWord != confirmNewPassWord) {
      res.status(400).json({ error: "Please check password" });
    }
    encrytedPassword = await bcrypt.hash(newPassWord, 10);
    if (await bcrypt.compare(oldPassWord, user.password)) {
      await Users.findByIdAndUpdate(
        {
          _id: req.user.user_id,
        },
        {
          password: encrytedPassword,
        }
      );
      res.status(200).json({ msg: "reset password " });
    }
    res.status(400).json({ err: "กรุณาเช็ครหัสผ่านใหม่อีกครั้ง" });
  } catch (err) {
    console.log(err);
  }
};
module.exports = {
  login,
  getUser,
  resetPassword,
};
