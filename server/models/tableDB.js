const mongoose = require("mongoose");

const tables = mongoose.Schema({
  partner_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  table_no: {
    type: String,
    required: true,
  },
  seat: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("tables", tables);
