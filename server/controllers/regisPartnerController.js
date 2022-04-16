const partners = require("../models/partnerDB");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const partnerRegister = async (req, res) => {
  try {
    const {
      restaurantName,
      firstname,
      lastname,
      username,
      email,
      password,
      confirmPass,
      phoneNumber,
      address,
    } = req.body;
    if (
      !(
        restaurantName &&
        firstname &&
        lastname &&
        username &&
        email &&
        password &&
        confirmPass &&
        phoneNumber &&
        address
      )
    ) {
      res.status(400).json({ error: "All input is requires" });
    }

    const oldPartner = await partners.findOne({
      restaurantName,
      email,
      username,
    });
    if (oldPartner) {
      res.status(400).json({ error: "user already exist" });
    }
    if (password != confirmPass) {
      res.status(400).json({ error: "Please check password" });
    }

    encrytedPassword = await bcrypt.hash(password, 10);
    encrytedConfirmPassword = await bcrypt.hash(confirmPass, 10);

    const partner = await partners.create({
      restaurantName: restaurantName,
      firstname: firstname,
      lastname: lastname,
      username: username,
      password: encrytedPassword,
      confirmPass: encrytedConfirmPassword,
      email: email.toLowerCase(),
      phoneNumber: phoneNumber,
      address: address,
    });
    const token = jwt.sign(
      { partner_id: partner._id, email },
      process.env.JWT_SECRET,
      {
        expiresIn: "2h",
      }
    );

    partner.token = token;
    res.status(200).json(partner);
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};

module.exports ={
  partnerRegister
}