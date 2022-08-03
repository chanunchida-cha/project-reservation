const Users = require("../models/userDB");

const updateCustomer = async (req, res) => {
  Users.findByIdAndUpdate(
    req.user.user_id,
    {
      $set: req.body,
    },
    (err, data) => {
      if (err) {
        console.log(err);
      } else {
        res.json(data);
      }
    }
  );
};


module.exports={
    updateCustomer,
  
}