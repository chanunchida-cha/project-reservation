const mongoose = require("mongoose");
var Double = require("mongodb").Double;

const menus = mongoose.Schema({
  partner_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    trim: true,
    required: true,
  },
});

module.exports = mongoose.model("menus", menus);
