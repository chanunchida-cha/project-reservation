const restaurants = require("../models/restaurantDB");
const partners = require("../models/partnerDB");

const createInfoRestaurant = async (req, res) => {
  try {
    const { partner_id, description, contact, openday } = req.body;

    const restaurant = await restaurants.create({
      partner_id: partner_id,
      description: description,
      contact: contact,
      openday: openday,
    });

    res.status(200).json(restaurant);
  } catch (err) {
    console.log(err);
  }
};

const updateInfoRestaurant = (req, res) => {
  const { id } = req.params;
  restaurants.findByIdAndUpdate(
    id,
    {
      $set: req.body,
    },
    (err, restaurant) => {
      if (err) {
        console.log(err);
      } else {
        res.json(restaurant);
      }
    }
  );
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
};
