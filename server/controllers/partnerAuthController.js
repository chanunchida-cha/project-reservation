const partners = require("../models/partnerDB");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const partnerLogin = async (req, res) => {
  const { username, password } = req.body;
  try {
    if (!(username && password)) {
      res.status(400).json({ error: "All input is requires" });
    }

    const partner = await partners.findOne({
      username: username,
    });

    if (partner && (await bcrypt.compare(password, partner.password))) {
      const token = jwt.sign(
        { partner_id: partner._id, username },
        process.env.JWT_SECRET,
        {
          expiresIn: "5h",
        }
      );

      partner.token = token;
      res.status(200).json(partner);
    }
    res.status(404).json({ error: "check username or password " });
  } catch (err) {
    console.log(err);
  }
};

const getPartner = async (req, res) => {
  try {
    const partner = await partners
      .findById(req.partner.partner_id)
      .select("-password");
    if (!partner) throw Error("Partner does not exist");
    res.json(partner);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { oldPassWord, newPassWord, confirmNewPassWord } = req.body;
    // encrytedPassword = await bcrypt.hash(oldPassWord, 10);
    const partner = await partners.findById(req.partner.partner_id);

    if (newPassWord != confirmNewPassWord) {
      res.status(400).json({ error: "Please check password" });
    }
    encrytedPassword = await bcrypt.hash(newPassWord, 10);
    if (await bcrypt.compare(oldPassWord, partner.password)) {
      await partners.findByIdAndUpdate(
        {
          _id: req.partner.partner_id,
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
}

module.exports = {
  partnerLogin,
  getPartner,
  resetPassword
};
