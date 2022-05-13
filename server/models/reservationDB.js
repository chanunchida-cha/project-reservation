const mongoose = require("mongoose");

const reservations = mongoose.Schema({
  partner_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  customer_id: {
    type: mongoose.Schema.Types.ObjectId,
  },
});

module.exports = mongoose.model("reservations", reservations);
