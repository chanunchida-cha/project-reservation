const partners = require("../models/partnerDB");

const getPartnerVerify = (req, res) => {
  partners.find({ status: "verification" }, (err, partners) => {
    if (err) {
      console.log(err);
    } else {
      res.json(partners);
    }
  });
};
const getPartnerApprove = (req, res) => {
  partners.find({ status: "approve" }, (err, partners) => {
    if (err) {
      console.log(err);
    } else {
      res.json(partners);
    }
  });
};

const getPartnerById = (req, res) => {
  const { id } = req.params;
  partners.findById(id, (err, partner) => {
    if (err) {
      console.log(err);
    } else {
      res.json(partner);
    }
  });
};

const updateStatusPartner = (req, res) => {
  const { id } = req.params;
  partners.findByIdAndUpdate(
    id,
    {
      $set: req.body,
    },
    (err, partner) => {
      if (err) {
        console.log(err);
      } else {
        res.json(partner);
      }
    }
  );
};

module.exports = {
  getPartnerVerify,
  getPartnerApprove,
  getPartnerById,
  updateStatusPartner,
};
