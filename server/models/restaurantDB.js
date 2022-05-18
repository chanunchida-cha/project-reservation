const mongoose = require("mongoose");

const info_openday = {
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
  type_rest: {
    type: String,
  },
  time_length: {
    type: String,
  },
  rounds: {
    type: Array,
  },
  openday: {
    monday: info_openday,
    tuesday: info_openday,
    wednesday: info_openday,
    thursday: info_openday,
    friday: info_openday,
    saturday: info_openday,
    sunday: info_openday,
  },
});

module.exports = mongoose.model("restaurants", restaurants);
