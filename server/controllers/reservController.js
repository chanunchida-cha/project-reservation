const roundsReservs = require("../models/roundsReservDB");
const allDayReservs = require("../models/allDayReservDB");
const restaurants = require("../models/restaurantDB");
const tables = require("../models/tableDB");
const mongoose = require("mongoose");

const customerRoundReserv = async (req, res) => {
  try {
    const { partner_id, day, start, end, amount, table, customer_id } =
      req.body;
    const partnerId = mongoose.Types.ObjectId(partner_id);
    const customerId = mongoose.Types.ObjectId(customer_id);

    const roundsReserv = await roundsReservs.create({
      partner_id: partnerId,
      customer_id: customerId,
      day: day,
      start: start,
      end: end,
      amount: amount,
      table: table,
    });
    res.status(200).json(roundsReserv);
  } catch (err) {
    console.log(err);
  }
};

const customerAllDayReserv = async (req, res) => {
  try {
    const { partner_id, day, start, amount, table, time_length, customer_id } =
      req.body;
    const partnerId = mongoose.Types.ObjectId(partner_id);
    const customerId = mongoose.Types.ObjectId(customer_id);
    var startTime = new Date(start).getTime();
    startTime += time_length * 60 * 1000;
    const end = new Date(startTime).toLocaleTimeString();
    const allDayReserv = await allDayReservs.create({
      partner_id: partnerId,
      customer_id: customerId,
      day: day.toLocaleDateString("en-GB"),
      start: new Date(start).toLocaleTimeString(),
      end: end,
      amount: amount,
      table: table,
    });

    res.status(200).json(allDayReserv);
  } catch (err) {
    console.log(err);
  }
};

const selfRoundReserv = async (req, res) => {
  try {
    const { partner_id, day, start, end, amount, table, self_reserv } =
      req.body;
    const partnerId = mongoose.Types.ObjectId(partner_id);
    const roundsReserv = await roundsReservs.create({
      partner_id: partnerId,
      self_reserv: self_reserv,
      day: day,
      start: start,
      end: end,
      amount: amount,
      table: table,
    });
    res.status(200).json(roundsReserv);
  } catch (err) {
    console.log(err);
  }
};

const selfAllDayReserv = async (req, res) => {
  try {
    const { partner_id, day, start, amount, time_length, self_reserv } =
      req.body;
    const partnerId = mongoose.Types.ObjectId(partner_id);
    var startTime = new Date(start).getTime();
    startTime += time_length * 60 * 1000;
    const end = new Date(startTime).toLocaleTimeString("it-IT");
    const dayOfWeekName = new Date(day).toLocaleString("default", {
      weekday: "long",
    });

    const tableAmount = await tables.findOne({
      partner_id: partnerId,
      seat: amount,
    });

    const partnerInfo = restaurants.aggregate([
      {
        $match: {
          partner_id: partnerId,
        },
      },
      {
        $lookup: {
          from: "partners",
          localField: "partner_id",
          foreignField: "_id",
          as: "information",
        },
      },
    ]);
    if (partnerInfo) {
      (await partnerInfo).map((info) => {
        if (info.openday[dayOfWeekName.toLocaleLowerCase()].type === "close") {
          res
            .status(400)
            .json({ error: "ไม่สามารถจองคิวได้ เนื่องจากร้านปิด" });
        }
        if (
          info.openday[dayOfWeekName.toLocaleLowerCase()].end <=
          new Date(start).toLocaleTimeString("it-IT")
        ) {
          res
            .status(400)
            .json({ error: "ไม่สามารถจองคิวได้ เนื่องจากร้านปิด" });
        }
        if (
          info.openday[dayOfWeekName.toLocaleLowerCase()].start >
          new Date(start).toLocaleTimeString("it-IT")
        ) {
          res
            .status(400)
            .json({ error: "ไม่สามารถจองคิวได้ เนื่องจากร้านปิด" });
        }
      });
    }
    const allDayReserv = await allDayReservs.create({
      partner_id: partnerId,
      self_reserv: self_reserv,
      day: new Date(day).toLocaleDateString("en-GB"),
      start: new Date(start).toLocaleTimeString("it-IT"),
      end: end,
      amount: amount,
      table: tableAmount.table_no,
    });
    res.status(200).json(allDayReserv);
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  customerRoundReserv,
  customerAllDayReserv,
  selfRoundReserv,
  selfAllDayReserv,
};
