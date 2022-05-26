const tables = require("../models/tableDB");
const partners = require("../models/partnerDB");

const mongoose = require("mongoose");
const createTable = async (req, res) => {
  try {
    const { partner_id, table_no, seat } = req.body;
    const partnerId = mongoose.Types.ObjectId(partner_id);
    const table = await tables.create({
      partner_id: partnerId,
      table_no: table_no,
      seat: seat,
    });
    res.status(200).json(table);
  } catch (err) {
    res.status(400).send({
      err,
    });
    console.log(err);
  }
};

const getTable = (req, res) => {
  partners
    .aggregate([
      {
        $lookup: {
          from: "tables",
          localField: "_id",
          foreignField: "partner_id",
          as: "table",
        },
      },
    ])
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      console.log(err);
    });
};
const getTableByRest = (req, res) => {
  const { id } = req.params;
  tables
    .aggregate([
      {
        $match: {
          partner_id: mongoose.Types.ObjectId(id),
        },
      },
    ])
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      console.log(err);
    });
};
const getTableById = (req, res) => {
  const { id } = req.params;
  tables.findById(id, (err, user) => {
    if (err) {
      console.log(err);
    } else {
      res.json(user);
    }
  });
};

const updateTable = async (req, res) => {
  const { id } = req.params;
  const { partner_id, table_no, seat } = req.body;
  const partnerId = mongoose.Types.ObjectId(partner_id);

  tables.findByIdAndUpdate(
    id,
    {
      $set: {
        partner_id: partnerId,
        table_no: table_no,
        seat: seat,
      },
    },
    (err, menu) => {
      if (err) {
        console.log(err);
      } else {
        res.json(menu);
      }
    }
  );
};

const deleteTable = (req, res) => {
  const { id } = req.params;
  tables.findByIdAndDelete(id, (err) => {
    if (err) {
      console.log(err);
    } else {
      res.status(200).json({
        status: "delete success",
      });
    }
  });
};

module.exports = {
  createTable,
  getTableByRest,
  updateTable,
  deleteTable,
  getTable,
  getTableById,
};
