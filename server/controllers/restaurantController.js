const restaurants = require("../models/restaurantDB");

const mongoose = require("mongoose");

const createInfoRestaurant = async (req, res) => {
  try {
    const {
      partner_id,
      description,
      contact,
      address,
      type_rest,
      time_length,
      openday,
      rounds,
    } = req.body;
    const partnerId = mongoose.Types.ObjectId(partner_id);
    const image = req.file.filename;

    const restaurant = await restaurants.create({
      partner_id: partnerId,
      description: description,
      contact: contact,
      address: address,
      type_rest: type_rest,
      time_length: time_length,
      openday: openday,
      rounds: rounds,
      image: image,
    });

    res.status(200).json(restaurant);
  } catch (err) {
    console.log(err);
  }
};

const updateInfoRestaurant = (req, res) => {
  const { id } = req.params;
  const {
    description,
    contact,
    address,
    type_rest,
    time_length,
    openday,
    rounds,
  } = req.body;

  if (req.file) {
    const image = req.file.filename;
    restaurants.findByIdAndUpdate(
      id,
      {
        $set: {
          description: description,
          contact: contact,
          address: address,
          type_rest: type_rest,
          time_length: time_length,
          openday: openday,
          rounds: rounds,
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
          description: description,
          contact: contact,
          address: address,
          type_rest: type_rest,
          time_length: time_length,
          openday: openday,
          rounds: rounds,
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
