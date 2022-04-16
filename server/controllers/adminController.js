const partners = require("../models/partnerDB");

const getAllPartner = (req, res) => {
    partners.find((err,partners)=>{
      if (err) {
        console.log(err);
    } else {
        res.json(partners);
    }
  
    })
  };

const getPartnerById = (req,res)=>{
    let id = req.params.id;
    partners.findById(id , (err,partner)=>{
        if (err) {
            console.log(err);
        } else {
            res.json(partner);
        }
      
    })

}


  module.exports ={
      getAllPartner,
      getPartnerById
  }