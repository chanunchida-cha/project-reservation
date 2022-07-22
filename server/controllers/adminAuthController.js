const admins = require("../models/adminDB");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const adminLogin = async (req, res) => {
  const { username, password } = req.body;
  try {
    if (!(username && password)) {
      res.status(400).json({ error: "All input is requires" });
    }

    const admin = await admins.findOne({
      username: username,
    });

    if (admin && (await bcrypt.compare(password, admin.password))) {
      const token = jwt.sign(
        { admin_id: admin._id, username },
        process.env.JWT_SECRET,
        {
          expiresIn: "5h",
        }
      );
      admin.token = token;
      res.status(200).json(admin);
    }
    res.status(404).json({ error: "check username or password " });
  } catch (err) {
    console.log(err);
  }
};

const getAdmin = async (req, res) => {
  try {
    const admin = await admins.findById(req.admin.admin_id).select("-password");
    if (!admin) throw Error("admin does not exist");
    res.json(admin);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
};
const resetPassword = async (req, res) => {
  try {
    const { oldPassWord, newPassWord, confirmNewPassWord } = req.body;
    // encrytedPassword = await bcrypt.hash(oldPassWord, 10);
    const admin = await admins.findById(req.admin.admin_id);

    if (newPassWord != confirmNewPassWord) {
      res.status(400).json({ error: "Please check password" });
    }
    encrytedPassword = await bcrypt.hash(newPassWord, 10);
    if (await bcrypt.compare(oldPassWord, admin.password)) {
      await admins.findByIdAndUpdate(
        {
          _id: req.admin.admin_id,
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
  adminLogin,
  getAdmin,
  resetPassword,
};
