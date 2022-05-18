const mongoose = require("mongoose");

const settingreservs = mongoose.Schema({
  partner_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  settingreserv: {
    timeLength: {
      type: String,
    },
  },
});

module.exports = mongoose.model("settingreservs", settingreservs);
