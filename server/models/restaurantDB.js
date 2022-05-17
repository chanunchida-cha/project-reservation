const mongoose = require("mongoose");

const info = {
  type: {
    type: String,
  },
  start: {
    type: String,
  },
  end: {
    type: String,
  },
};

const restaurants = mongoose.Schema({
  partner_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    trim: true,
  },

  openday: {
    monday: info,
    tuesday: info,
    wednesday: info,
    thursday: info,
    friday: info,
    saturday: info,
    sunday: info,
  },
});

module.exports = mongoose.model("restaurants", restaurants);
