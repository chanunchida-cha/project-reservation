const mongoose = require("mongoose");

const roundsReservs = mongoose.Schema({
  partner_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  customer_id: {
    type: mongoose.Schema.Types.ObjectId,
  },
  day: {
    type: String,
    required: true,
  },
  start: {
    type: String,
    required: true,
  },
  end: {
    type: String,
    required: true,
  },
  amount: {
    type: String,
    required: true,
  },
  table: [],
  self_reserv: {
    firstname: {
      type: String,
    },
    lastname: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
  },
});

module.exports = mongoose.model("roundsReservs", roundsReservs);
