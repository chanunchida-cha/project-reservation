const restaurants = require("../models/restaurantDB");

const mongoose = require("mongoose");

const createInfoRestaurant = async (req, res) => {
  try {
    const { partner_id, description, contact, address, openday } = req.body;
    const partnerId = mongoose.Types.ObjectId(partner_id);
    const image = req.file.originalname;

    const restaurant = await restaurants.create({
      partner_id: partnerId,
      description: description,
      contact: contact,
      address: address,
      openday: openday,
      image: image,
    });

    res.status(200).json(restaurant);
  } catch (err) {
    console.log(err);
  }
};

const updateInfoRestaurant = (req, res) => {
  const { id } = req.params;
  const { partner_id, description, contact, address, openday } = req.body;
  const partnerId = mongoose.Types.ObjectId(partner_id);
  // if (!(partnerId && description && image && contact && address && openday)) {
  //   res.status(400).json({ error: "All input is requires" });
  // }
  if (req.file) {
    const image = req.file.filename;
    restaurants.findByIdAndUpdate(
      id,
      {
        $set: {
          partner_id: partnerId,
          description: description,
          contact: contact,
          address: address,
          openday: openday,
          image: image,
        },
      },
      (err, restaurant) => {
        if (err) {
          console.log(err);
        } else {
          res.json(restaurant);
        }
      }
    );
  } else {
    restaurants.findByIdAndUpdate(
      id,
      {
        $set: {
          partner_id: partnerId,
          description: description,
          contact: contact,
          address: address,
          openday: openday,
        },
      },
      (err, restaurant) => {
        if (err) {
          console.log(err);
        } else {
          res.json(restaurant);
        }
      }
    );
  }
};

const deleteInfoRestaurant = (req, res) => {
  const { id } = req.params;
  restaurants.findByIdAndDelete(id, (err) => {
    if (err) {
      console.log(err);
    } else {
      res.status(200).json({
        status: "delete success",
      });
    }
  });
};

const getInfoRestaurant = (req, res) => {
  restaurants
    .aggregate([
      {
        $lookup: {
          from: "partners",
          localField: "partner_id",
          foreignField: "_id",
          as: "information",
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

const getInfoRestaurantById = (req, res) => {
  const { id } = req.params;
  restaurants
    .aggregate([
      {
        $match: {
          partner_id: mongoose.Types.ObjectId(id),
        },
      },
      {
        $lookup: {
          from: "partners",
          localField: "partner_id",
          foreignField: "_id",
          as: "information",
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

module.exports = {
  createInfoRestaurant,
  updateInfoRestaurant,
  deleteInfoRestaurant,
  getInfoRestaurant,
  getInfoRestaurantById,
};
