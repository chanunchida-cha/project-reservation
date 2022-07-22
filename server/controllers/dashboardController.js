const roundsReservs = require("../models/roundsReservDB");
const allDayReservs = require("../models/allDayReservDB");
const mongoose = require("mongoose");

const countAlldayReservByPartner = async (req, res) => {
  try {
    const { id } = req.params;
    const partnerId = await mongoose.Types.ObjectId(id);
    const response = await allDayReservs.aggregate([
      {
        $match: { partner_id: partnerId },
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

const countRoundReservByPartner = async (req, res) => {
  try {
    const { id } = req.params;
    const partnerId = await mongoose.Types.ObjectId(id);
    const response = await roundsReservs.aggregate([
      {
        $match: { partner_id: partnerId },
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

const countAlldayReservTodayByPartner = async (req, res) => {
  try {
    const date = `${new Date().toLocaleDateString().split("/").join("-")}z`;
    const { id } = req.params;
    const partnerId = await mongoose.Types.ObjectId(id);
    const response = await allDayReservs.aggregate([
      {
        $match: { partner_id: partnerId, day: new Date(date) },
      },

      {
        $count: "count",
      },
    ]);

    res.json(response[0]);
    console.log(new Date().toLocaleDateString());
  } catch (err) {
    console.log(err);
  }
};
const countRoundReservTodayByPartner = async (req, res) => {
  try {
    const date = `${new Date().toLocaleDateString().split("/").join("-")}z`;
    const { id } = req.params;
    const partnerId = await mongoose.Types.ObjectId(id);
    const response = await roundsReservs.aggregate([
      {
        $match: { partner_id: partnerId, day: new Date(date) },
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

const getAlldayReservLastWeek = async (req, res) => {
  try {
    const today = new Date();
    const { id } = req.params;
    const partnerId = await mongoose.Types.ObjectId(id);

    const response = await allDayReservs.aggregate([
      {
        $match: {
          partner_id: partnerId,
          $and: [
            {
              day: {
                $gte: new Date(
                  today.getFullYear(),
                  today.getMonth(),
                  today.getDate() - 7
                ),
              },
            },
            { day: { $lt: new Date(today) } },
          ],
        },
      },

      {
        $count: "count",
      },
    ]);
    res.json(response[0]);
    console.log(
      new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7)
    );
  } catch (err) {
    console.log(err);
  }
};
const getRoundReservLastWeek = async (req, res) => {
  try {
    const today = new Date();
    const { id } = req.params;
    const partnerId = await mongoose.Types.ObjectId(id);

    const response = await roundsReservs.aggregate([
      {
        $match: {
          partner_id: partnerId,
          $and: [
            {
              day: {
                $gte: new Date(
                  today.getFullYear(),
                  today.getMonth(),
                  today.getDate() - 7
                ),
              },
            },
            { day: { $lt: new Date(today) } },
          ],
        },
      },

      {
        $count: "count",
      },
    ]);
    res.json(response[0]);
    console.log(
      new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7)
    );
  } catch (err) {
    console.log(err);
  }
};
const getAlldayReservNextWeek = async (req, res) => {
  try {
    const today = new Date();
    const { id } = req.params;
    const partnerId = await mongoose.Types.ObjectId(id);

    const response = await allDayReservs.aggregate([
      {
        $match: {
          partner_id: partnerId,
          $and: [
            { day: { $gt: new Date(today) } },
            {
              day: {
                $lte: new Date(
                  today.getFullYear(),
                  today.getMonth(),
                  today.getDate() + 7
                ),
              },
            },
          ],
        },
      },

      {
        $count: "count",
      },
    ]);
    res.json(response[0]);
    console.log(
      new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7)
    );
  } catch (err) {
    console.log(err);
  }
};
const getRoundReservNextWeek = async (req, res) => {
  try {
    const today = new Date();
    const { id } = req.params;
    const partnerId = await mongoose.Types.ObjectId(id);

    const response = await roundsReservs.aggregate([
      {
        $match: {
          partner_id: partnerId,
          $and: [
            { day: { $gt: new Date(today) } },
            {
              day: {
                $lte: new Date(
                  today.getFullYear(),
                  today.getMonth(),
                  today.getDate() + 7
                ),
              },
            },
          ],
        },
      },

      {
        $count: "count",
      },
    ]);
    res.json(response[0]);
    console.log(
      new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7)
    );
  } catch (err) {
    console.log(err);
  }
};

const getAlldayReservPerDay = async (req, res) => {
  try {
    const { id } = req.params;
    const partnerId = await mongoose.Types.ObjectId(id);

    const response = await allDayReservs.aggregate([
      {
        $match: {
          partner_id: partnerId,
        },
      },

      {
        $group: {
          _id: {
            day: { $dayOfMonth: "$day" },
            year: { $year: "$day" },
            month: { $month: "$day" },
          },
          count: { $count: {} },
        },
      },
    ]);
    res.json(response);
  } catch (err) {
    console.log(err);
  }
};
const getRoundReservPerDay = async (req, res) => {
  try {
    const { id } = req.params;
    const partnerId = await mongoose.Types.ObjectId(id);

    const response = await roundsReservs.aggregate([
      {
        $match: {
          partner_id: partnerId,
        },
      },

      {
        $group: {
          _id: {
            day: { $dayOfMonth: "$day" },
            year: { $year: "$day" },
            month: { $month: "$day" },
          },
          count: { $count: {} },
        },
      },
    ]);
    res.json(response);
  } catch (err) {
    console.log(err);
  }
};
const getAlldayReservPerWeek = async (req, res) => {
  try {
    const { id } = req.params;
    const partnerId = await mongoose.Types.ObjectId(id);

    const response = await allDayReservs.aggregate([
      {
        $match: {
          partner_id: partnerId,
        },
      },

      {
        $group: {
          _id: {
            year: { $year: "$day" },
            month: { $month: "$day" },
            week: {
              $floor: { $add: [{ $divide: [{ $dayOfMonth: "$day" }, 7] }, 1] },
            },
          },

          count: { $count: {} },
        },
      },
    ]);
    res.json(response);
  } catch (err) {
    console.log(err);
  }
};
const getRoundReservPerWeek = async (req, res) => {
  try {
    const { id } = req.params;
    const partnerId = await mongoose.Types.ObjectId(id);

    const response = await roundsReservs.aggregate([
      {
        $match: {
          partner_id: partnerId,
        },
      },

      {
        $group: {
          _id: {
            year: { $year: "$day" },
            month: { $month: "$day" },
            week: {
              $floor: { $add: [{ $divide: [{ $dayOfMonth: "$day" }, 7] }, 1] },
            },
          },

          count: { $count: {} },
        },
      },
    ]);
    res.json(response);
  } catch (err) {
    console.log(err);
  }
};

const getAlldayReservPerMonth = async (req, res) => {
  try {
    const { id } = req.params;
    const partnerId = await mongoose.Types.ObjectId(id);

    const response = await allDayReservs.aggregate([
      {
        $match: {
          partner_id: partnerId,
        },
      },

      {
        $group: {
          _id: {
            year: { $year: "$day" },
            month: { $month: "$day" },
          },
          count: { $count: {} },
        },
      },
    ]);
    res.json(response);
  } catch (err) {
    console.log(err);
  }
};
const getRoundReservPerMonth = async (req, res) => {
  try {
    const { id } = req.params;
    const partnerId = await mongoose.Types.ObjectId(id);

    const response = await roundsReservs.aggregate([
      {
        $match: {
          partner_id: partnerId,
        },
      },

      {
        $group: {
          _id: {
            year: { $year: "$day" },
            month: { $month: "$day" },
          },
          count: { $count: {} },
        },
      },
    ]);
    res.json(response);
  } catch (err) {
    console.log(err);
  }
};

const getAlldayReservPerYear = async (req, res) => {
  try {
    const { id } = req.params;
    const partnerId = await mongoose.Types.ObjectId(id);

    const response = await allDayReservs.aggregate([
      {
        $match: {
          partner_id: partnerId,
        },
      },

      {
        $group: {
          _id: { $year: "$day" },
          count: { $count: {} },
        },
      },
    ]);
    res.json(response);
  } catch (err) {
    console.log(err);
  }
};
const getRoundReservPerYear = async (req, res) => {
  try {
    const { id } = req.params;
    const partnerId = await mongoose.Types.ObjectId(id);

    const response = await roundsReservs.aggregate([
      {
        $match: {
          partner_id: partnerId,
        },
      },

      {
        $group: {
          _id: { $year: "$day" },
          count: { $count: {} },
        },
      },
    ]);
    res.json(response);
  } catch (err) {
    console.log(err);
  }
};

const getAlldayReservPending = async (req, res) => {
  try {
    const { id } = req.params;
    const partnerId = await mongoose.Types.ObjectId(id);

    const response = await allDayReservs.aggregate([
      {
        $match: {
          partner_id: partnerId,
          status: "pending",
        },
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
const getAlldayReservArrived = async (req, res) => {
  try {
    const { id } = req.params;
    const partnerId = await mongoose.Types.ObjectId(id);

    const response = await allDayReservs.aggregate([
      {
        $match: {
          partner_id: partnerId,
          status: "arrived",
        },
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
const getAlldayReservCheckOut = async (req, res) => {
  try {
    const { id } = req.params;
    const partnerId = await mongoose.Types.ObjectId(id);

    const response = await allDayReservs.aggregate([
      {
        $match: {
          partner_id: partnerId,
          status: "checkout",
        },
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
const getAlldayReservCancel = async (req, res) => {
  try {
    const { id } = req.params;
    const partnerId = await mongoose.Types.ObjectId(id);

    const response = await allDayReservs.aggregate([
      {
        $match: {
          partner_id: partnerId,
          status: "cancel",
        },
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
const getRoundReservPending = async (req, res) => {
  try {
    const { id } = req.params;
    const partnerId = await mongoose.Types.ObjectId(id);

    const response = await roundsReservs.aggregate([
      {
        $match: {
          partner_id: partnerId,
          status: "pending",
        },
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
const getRoundReservArrived = async (req, res) => {
  try {
    const { id } = req.params;
    const partnerId = await mongoose.Types.ObjectId(id);

    const response = await roundsReservs.aggregate([
      {
        $match: {
          partner_id: partnerId,
          status: "arrived",
        },
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
const getRoundReservCheckOut = async (req, res) => {
  try {
    const { id } = req.params;
    const partnerId = await mongoose.Types.ObjectId(id);

    const response = await roundsReservs.aggregate([
      {
        $match: {
          partner_id: partnerId,
          status: "checkout",
        },
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
const getRoundReservCancel = async (req, res) => {
  try {
    const { id } = req.params;
    const partnerId = await mongoose.Types.ObjectId(id);

    const response = await roundsReservs.aggregate([
      {
        $match: {
          partner_id: partnerId,
          status: "cancel",
        },
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

module.exports = {
  countAlldayReservByPartner,
  countRoundReservByPartner,
  countAlldayReservTodayByPartner,
  countRoundReservTodayByPartner,
  getAlldayReservPerWeek,
  getRoundReservPerWeek,
  getAlldayReservPerDay,
  getRoundReservPerDay,
  getAlldayReservNextWeek,
  getRoundReservNextWeek,
  getAlldayReservLastWeek,
  getRoundReservLastWeek,
  getAlldayReservPerMonth,
  getRoundReservPerMonth,
  getAlldayReservPerYear,
  getRoundReservPerYear,
  getAlldayReservPending,
  getRoundReservPending,
  getAlldayReservArrived,
  getRoundReservArrived,
  getAlldayReservCheckOut,
  getRoundReservCheckOut,
  getAlldayReservCancel,
  getRoundReservCancel,
};
