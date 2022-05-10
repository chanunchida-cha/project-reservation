const menus = require("../models/menuDB");
const partners = require("../models/partnerDB");
const mongoose = require("mongoose");
const createMenu = async (req, res) => {
  try {
    const { partner_id, name, description, price } = req.body;
    const partnerId = mongoose.Types.ObjectId(partner_id);
    const image = req.file.originalname;

    if (!(partner_id && name  && price)) {
      res.status(400).json({ error: "All input is requires" });
    }
    const menu = await menus.create({
      partner_id: partnerId,
      name: name,
      description: description,
      price: price,
      image: image,
    });
    res.status(200).json(menu);
  } catch (err) {
    res.status(400).send({
      err,
    });
    console.log(err);
  }
};

const updateMenu = (req, res) => {
  const { id } = req.params;
  const { partner_id, name, description, price } = req.body;
  const partnerId = mongoose.Types.ObjectId(partner_id);

  if (req.file) {
    const image = req.file.filename;
    menus.findByIdAndUpdate(
      id,
      {
        $set: {
          partner_id: partnerId,
          name: name,
          description: description,
          price: price,
          image: image,
        },
      },
      (err, menu) => {
        if (err) {
          console.log(err);
        } else {
          res.json(menu);
        }
      }
    );
  } else {
    menus.findByIdAndUpdate(
      id,
      {
        $set: {
          partner_id: partnerId,
          name: name,
          description: description,
          price: price,
        },
      },
      (err, menu) => {
        if (err) {
          console.log(err);
        } else {
          res.json(menu);
        }
      }
    );
  }
};

const getMenu = (req, res) => {
  partners
    .aggregate([
      {
        $lookup: {
          from: "menus",
          localField: "_id",
          foreignField: "partner_id",
          as: "menu",
        },
      },
    ])
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      console.log(err);
    });
};

const getMenuByRest = (req, res) => {
  const { id } = req.params;
  menus
    .aggregate([
      {
        $match: {
          partner_id: mongoose.Types.ObjectId(id),
        },
      },
    ])
    .then((responce) => {
      res.json(responce);
    })
    .catch((err) => {
      console.log(err);
    });
};

const getMenuById = (req, res) => {
  const { id } = req.params;
  menus.findById(id, (err, user) => {
    if (err) {
      console.log(err);
    } else {
      res.json(user);
    }
  });
};

const deleteMenu = (req, res) => {
  const { id } = req.params;
  menus.findByIdAndDelete(id, (err) => {
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
  createMenu,
  updateMenu,
  getMenu,
  getMenuByRest,
  getMenuById,
  deleteMenu,
};
