const mongoose = require("mongoose");

const restaurants = mongoose.Schema({
  partner_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "partners",
  },
  description: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  openday: {
    monday: {
      type: {
        type: String,
      },
      start: {
        type: String,
      },
      end: {
        type: String,
      },
    },
    tuesday: {
      type: {
        type: String,
      },
      start: {
        type: String,
      },
      end: {
        type: String,
      },
    },
    wednesday: {
      type: {
        type: String,
      },
      start: {
        type: String,
      },
      end: {
        type: String,
      },
    },
    thursday: {
      type: {
        type: String,
      },
      start: {
        type: String,
      },
      end: {
        type: String,
      },
    },
    friday: {
      type: {
        type: String,
      },
      start: {
        type: String,
      },
      end: {
        type: String,
      },
    },
    saturday: {
      type: {
        type: String,
      },
      start: {
        type: String,
      },
      end: {
        type: String,
      },
    },
    sunday: {
      type: {
        type: String,
      },
      start: {
        type: String,
      },
      end: {
        type: String,
      },
    },
  },
});

module.exports = mongoose.model("restaurants", restaurants);
