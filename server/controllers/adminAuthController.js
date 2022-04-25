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
          expiresIn: "2h",
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

module.exports = {
  adminLogin,
  getAdmin,
};
