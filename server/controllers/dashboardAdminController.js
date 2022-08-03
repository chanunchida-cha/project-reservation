const roundsReservs = require("../models/roundsReservDB");
const allDayReservs = require("../models/allDayReservDB");
const Users = require("../models/userDB");
const partners = require("../models/partnerDB");
const admins = require("../models/adminDB");
const restaurants = require("../models/restaurantDB");
const mongoose = require("mongoose");

const countCustomer = async (req, res) => {
  try {
    const response = await Users.aggregate([
      {
        $count: "count",
      },
    ]);

    res.json(response[0]);
  } catch (err) {
    console.log(err);
  }
};

const countPartner = async (req, res) => {
  try {
    const response = await partners.aggregate([
      {
        $count: "count",
      },
    ]);

    res.json(response[0]);
  } catch (err) {
    console.log(err);
  }
};

const countAdmin = async (req, res) => {
  try {
    const response = await admins.aggregate([
      {
        $count: "count",
      },
    ]);

    res.json(response[0]);
  } catch (err) {
    console.log(err);
  }
};

const countRestInfo = async (req, res) => {
  try {
    const response = await restaurants.aggregate([
      {
        $count: "count",
      },
    ]);

    res.json(response[0]);
  } catch (err) {
    console.log(err);
  }
};
const countPartnerVerification = async (req, res) => {
  try {
    const response = await partners.aggregate([
      {
        $match: { status: "verification" },
      },
      {
        $count: "count",
      },
    ]);

    res.json(response[0]);
  } catch (err) {
    console.log(err);
  }
};
const countPartnerApprove = async (req, res) => {
  try {
    const response = await partners.aggregate([
      {
        $match: { status: "approve" },
      },
      {
        $count: "count",
      },
    ]);

    res.json(response[0]);
  } catch (err) {
    console.log(err);
  }
};
const countPartnerDisApprove = async (req, res) => {
  try {
    const response = await partners.aggregate([
      {
        $match: { status: "disapprove" },
      },
      {
        $count: "count",
      },
    ]);

    res.json(response[0]);
  } catch (err) {
    console.log(err);
  }
};

const groupPartnerByTypeAllDay = async (req, res) => {
  try {
    const response = await restaurants.aggregate([
      {
        $match: { type_rest: "allDay" },
      },
      {
        $count: "count",
      },
    ]);

    res.json(response[0]);
  } catch (err) {
    console.log(err);
  }
};
const groupPartnerByTypeRound = async (req, res) => {
  try {
    const response = await restaurants.aggregate([
      {
        $match: { type_rest: "rounds" },
      },
      {
        $count: "count",
      },
    ]);

    res.json(response[0]);
  } catch (err) {
    console.log(err);
  }
};

const groupReservByPartnerForWeek = async (req, res) => {
  try {
    const response1 = await allDayReservs.aggregate([
      {
        $group: {
          _id: {
            partner_id: "$partner_id",
            year: { $year: "$day" },
            month: { $month: "$day" },
            week: {
              $floor: { $add: [{ $divide: [{ $dayOfMonth: "$day" }, 7] }, 1] },
            },
          },
          count: { $count: {} },
        },
      },
      {
        $lookup: {
          from: "partners",
          localField: "_id.partner_id",
          foreignField: "_id",
          as: "information",
        },
      },
      {
        $unwind: "$information",
      },
    ]);
    const response2 = await roundsReservs.aggregate([
      {
        $group: {
          _id: {
            partner_id: "$partner_id",
            year: { $year: "$day" },
            month: { $month: "$day" },
            week: {
              $floor: { $add: [{ $divide: [{ $dayOfMonth: "$day" }, 7] }, 1] },
            },
          },
          count: { $count: {} },
        },
      },
      {
        $lookup: {
          from: "partners",
          localField: "_id.partner_id",
          foreignField: "_id",
          as: "information",
        },
      },
      {
        $unwind: "$information",
      },
    ]);

    const response = response1.concat(response2);
    res.json(response);
  } catch (err) {
    console.log(err);
  }
};

const groupReservByPartnerForMonth = async (req, res) => {
  try {
    const response1 = await allDayReservs.aggregate([
      {
        $group: {
          _id: {
            partner_id: "$partner_id",

            year: { $year: "$day" },
            month: { $month: "$day" },
          },
          count: { $count: {} },
        },
      },
      {
        $lookup: {
          from: "partners",
          localField: "_id.partner_id",
          foreignField: "_id",
          as: "information",
        },
      },
      {
        $unwind: "$information",
      },
    ]);
    const response2 = await roundsReservs.aggregate([
      {
        $group: {
          _id: {
            partner_id: "$partner_id",
            year: { $year: "$day" },
            month: { $month: "$day" },
          },
          count: { $count: {} },
        },
      },
      {
        $lookup: {
          from: "partners",
          localField: "_id.partner_id",
          foreignField: "_id",
          as: "information",
        },
      },

      {
        $unwind: "$information",
      },
    ]);

    const response = response1.concat(response2);
    res.json(response);
  } catch (err) {
    console.log(err);
  }
};
const groupReservByPartnerForYear = async (req, res) => {
  try {
    const response1 = await allDayReservs.aggregate([
      {
        $group: {
          _id: {
            partner_id: "$partner_id",

            year: { $year: "$day" },
          },
          count: { $count: {} },
        },
      },
      {
        $lookup: {
          from: "partners",
          localField: "_id.partner_id",
          foreignField: "_id",
          as: "information",
        },
      },
      {
        $unwind: "$information",
      },
    ]);
    const response2 = await roundsReservs.aggregate([
      {
        $group: {
          _id: {
            partner_id: "$partner_id",

            year: { $year: "$day" },
          },
          count: { $count: {} },
        },
      },
      {
        $lookup: {
          from: "partners",
          localField: "_id.partner_id",
          foreignField: "_id",
          as: "information",
        },
      },
      {
        $unwind: "$information",
      },
    ]);

    const response = response1.concat(response2);
    res.json(response);
  } catch (err) {
    console.log(err);
  }
};
module.exports = {
  countCustomer,
  countPartner,
  countAdmin,
  countRestInfo,
  countPartnerVerification,
  countPartnerApprove,
  countPartnerDisApprove,
  groupPartnerByTypeAllDay,
  groupPartnerByTypeRound,
  groupReservByPartnerForWeek,
  groupReservByPartnerForMonth,
  groupReservByPartnerForYear,
};
