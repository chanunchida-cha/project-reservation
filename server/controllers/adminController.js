const partners = require("../models/partnerDB");
const Users = require("../models/userDB");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { json } = require("express");

const getPartnerVerify = (req, res) => {
  partners.find({ status: "verification" }, (err, partners) => {
    if (err) {
      console.log(err);
    } else {
      res.json(partners);
    }
  });
};
const getPartnerApprove = (req, res) => {
  partners.find({ status: "approve" }, (err, partners) => {
    if (err) {
      console.log(err);
    } else {
      res.json(partners);
    }
  });
};
const getPartnerDisApprove = (req, res) => {
  partners.find({ status: "disapprove" }, (err, partners) => {
    if (err) {
      console.log(err);
    } else {
      res.json(partners);
    }
  });
};

const getUsers = (req, res) => {
  Users.find((err, users) => {
    if (err) {
      console.log(err);
    } else {
      res.json(users);
    }
  });
};
const getUserById = (req, res) => {
  const { id } = req.params;
  Users.findById(id, (err, user) => {
    if (err) {
      console.log(err);
    } else {
      res.json(user);
    }
  });
};

const getPartnerById = (req, res) => {
  const { id } = req.params;
  partners.findById(id, (err, partner) => {
    if (err) {
      console.log(err);
    } else {
      res.json(partner);
    }
  });
};

const updateStatusPartner = (req, res) => {
  const { id } = req.params;
  partners.findByIdAndUpdate(
    id,
    {
      $set: req.body,
    },
    (err, partner) => {
      if (err) {
        console.log(err);
      } else {
        res.json(partner);
      }
    }
  );
};

const createCustomer = async (req, res) => {
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
        expiresIn: "2h",
      }
    );

    user.token = token;
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
  }
};

const deleteCustomer = (req, res) => {
  const { id } = req.params;
  Users.findByIdAndDelete(id, (err) => {
    if (err) {
      console.log(err);
    } else {
      res.status(200).json({
        status: "delete success",
      });
    }
  });
};

const editCustomer = (req, res) => {
  const { id } = req.params;
  Users.findByIdAndUpdate(
    id,
    {
      $set: req.body,
    },
    (err, data) => {
      if (err) {
        console.log(err);
      } else {
        res.json(data);
      }
    }
  );
};

module.exports = {
  getPartnerVerify,
  getPartnerApprove,
  getPartnerById,
  updateStatusPartner,
  getPartnerDisApprove,
  getUsers,
  getUserById,
  createCustomer,
  deleteCustomer,
  editCustomer,
};
