const restaurants = require("../models/restaurantDB");
const partners = require("../models/partnerDB");
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

const updateInfoRestaurant = async (req, res) => {
  const {
    description,
    contact,
    address,
    type_rest,
    time_length,
    openday,
    rounds,
  } = req.body;

  const restInfo = await restaurants.aggregate([
    {
      $match: {
        partner_id: mongoose.Types.ObjectId(req.partner.partner_id),
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
  ]);

  if (restInfo.length > 0) {
    if (req.file) {
      const image = req.file.filename;
      restaurants.findByIdAndUpdate(
        restInfo[0]._id,
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
        restInfo[0]._id,
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
  } else {
    res.status(400).json({ error: "ไม่มีสิทธิแก้ไข" });
  }
  console.log(restInfo[0]._id);
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
      {
        $unwind: "$information",
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
      {
        $unwind: "$information",
      },
    ])
    .then((response) => {
      res.json(response);
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
