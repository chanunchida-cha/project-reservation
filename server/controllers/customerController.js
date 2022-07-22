const Users = require("../models/userDB");

const updateCustomer = async (req, res) => {
  const { id } = req.params;
  Users.findByIdAndUpdate(
    id,
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