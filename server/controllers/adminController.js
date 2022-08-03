const partners = require("../models/partnerDB");
const Users = require("../models/userDB");
const admins = require("../models/adminDB");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { json } = require("express");

const getPartner = (req, res) => {
  partners.find((err, partners) => {
    if (err) {
      console.log(err);
    } else {
      res.json(partners);
    }
  });
};
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

const updateStatusPartner = async (req, res) => {
  const { id } = req.params;
  const admin = await admins.findById(req.admin.admin_id);

  if (admin !== undefined) {
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
  } else {
    res.status(400).json({ err: "ไม่มีสิทธิแก้ไข" });
  }
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

const editCustomer =async (req, res) => {
  const { id } = req.params;
  const admin = await admins.findById(req.admin.admin_id);
  if(admin !== undefined){
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
  }else {
    res.status(400).json({ err: "ไม่มีสิทธิแก้ไข" });
  }
};

const createPartner = async (req, res) => {
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

const deletePartner = (req, res) => {
  const { id } = req.params;
  partners.findByIdAndDelete(id, (err) => {
    if (err) {
      console.log(err);
    } else {
      res.status(200).json({
        status: "delete success",
      });
    }
  });
};

const editPartner =async (req, res) => {
  const { id } = req.params;
  const admin = await admins.findById(req.admin.admin_id);
  if(admin !== undefined){
  partners.findByIdAndUpdate(
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
  }else{
    res.status(400).json({ err: "ไม่มีสิทธิแก้ไข" });
  }
};

const getAdmins = (req, res) => {
  admins.find((err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.json(data);
    }
  });
};

const getAdminById = (req, res) => {
  const { id } = req.params;
  admins.findById(id, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.json(data);
    }
  });
};

const createAdmin = async (req, res) => {
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

    const oldAdmin = await admins.findOne({ email, username });

    if (oldAdmin) {
      res.status(400).json({ error: "Admin already exist" });
    }
    if (password != confirmPass) {
      res.status(400).json({ error: "Please check password" });
    }

    encrytedPassword = await bcrypt.hash(password, 10);
    encrytedConfirmPassword = await bcrypt.hash(confirmPass, 10);

    //create user
    const admin = await admins.create({
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
      { admin_id: admin._id, email },
      process.env.JWT_SECRET,
      {
        expiresIn: "2h",
      }
    );

    admin.token = token;
    res.status(200).json(admin);
  } catch (err) {
    console.log(err);
  }
};

const editAdmin = async (req, res) => {
  const { id } = req.params;
  const admin = await admins.findById(req.admin.admin_id);
  if( admin !== undefined){
  admins.findByIdAndUpdate(
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
  }else{
    res.status(400).json({ err: "ไม่มีสิทธิแก้ไข" });
  }
};

const deleteAdmin = (req, res) => {
  const { id } = req.params;
  admins.findByIdAndDelete(id, (err) => {
    if (err) {
      console.log(err);
    } else {
      res.status(200).json({
        status: "delete success",
      });
    }
  });
};

module.exports = {
  getPartner,
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
  createPartner,
  deletePartner,
  editPartner,
  getAdmins,
  getAdminById,
  createAdmin,
  editAdmin,
  deleteAdmin,
};
