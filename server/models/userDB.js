const mongoose = require("mongoose");

const user = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  confirmPass: {
    type: String,
    required: true,
  },
  token: {
    type: String,
   
  },
});

module.exports = mongoose.model("Users", user);
