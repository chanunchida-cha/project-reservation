const roundsReservs = require("../models/roundsReservDB");
const allDayReservs = require("../models/allDayReservDB");
const restaurants = require("../models/restaurantDB");
const tables = require("../models/tableDB");
const mongoose = require("mongoose");

const customerRoundReserv = async (req, res) => {
  try {
    const { partner_id, day, start, end, amount, customer_id } = req.body;
    const partnerId = mongoose.Types.ObjectId(partner_id);
    const customerId = mongoose.Types.ObjectId(customer_id);
    const alltables = await tables.find({
      partner_id: partnerId,
    });
    const partnerInfo = await restaurants.findOne({
      partner_id: partnerId,
    });
    const dayOfWeekName = new Date(day).toLocaleString("default", {
      weekday: "long",
    });
    const reservs = await roundsReservs.find({
      $and: [
        { partner_id: partnerId },
        { day: new Date(day).toLocaleDateString("en-GB") },
        { start: start },
        { end: end },
      ],
    });
    const reserved_tables = [];
    const allTable = [];
    const table = [];
    let seatAmount = Number(amount);
    alltables.forEach((tables) => {
      allTable.push(tables);
    });

    reservs.forEach((reserv) => {
      reserv.table.forEach((table) => {
        reserved_tables.push(table);
      });
    });
    const remaining_tables = allTable.filter((tableNo) => {
      let found = false;
      for (const reservedTable of reserved_tables) {
        if (tableNo.table_no === reservedTable) {
          found = true;
        }
      }
      return !found;
    });
    const reservedTable = (n, remaining_tables) => {
      const max_reamaining = [];
      remaining_tables.forEach((remaining_table) => {
        max_reamaining.push(Number(remaining_table.seat));
      });

      const maxSeat = Math.max(...max_reamaining);
      const total_reamining_n = remaining_tables.reduce(
        (prev, cur) => Number(cur.seat) + Number(prev.seat),
        0
      );
      if (n <= 0) {
        return res.status(400).json({ error: "กรุณากรอกจำนวนคนใหม่" });
      } else if (n > total_reamining_n) {
        return res.status(400).json({ error: "โต๊ะไม่พอรองรับ" });
      } else if (n <= maxSeat) {
        const Numseats = remaining_tables.filter((remaining_table) => {
          let found = false;
          if (remaining_table.seat >= seatAmount) {
            found = true;
          }
          return found;
        });

        const minSeats = Numseats.reduce((prev, cur) =>
          Number(cur.seat) < Number(prev.seat) ? cur : prev
        );

        table.push(minSeats.table_no);
      } else if (n > maxSeat) {
        const maxSeats = remaining_tables.reduce((prev, cur) =>
          Number(cur.seat) > Number(prev.seat) ? cur : prev
        );

        seatAmount -= maxSeats.seat;
        table.push(maxSeats.table_no);

        const remain_n = remaining_tables.filter((remaining_table) => {
          let found = false;
          if (maxSeats.table_no === remaining_table.table_no) {
            found = true;
          }

          return !found;
        });

        return reservedTable(seatAmount, remain_n);
      }
    };
    if (
      partnerInfo.openday[dayOfWeekName.toLocaleLowerCase()].type === "close"
    ) {
      return res
        .status(400)
        .json({ error: "ไม่สามารถจองคิวได้ เนื่องจากร้านปิด1" });
    } else if (remaining_tables.length === 0) {
      return res.status(400).json({ error: "รอบเวลานี้ โต๊ะเต็มแล้ว" });
    }
    reservedTable(seatAmount, remaining_tables);
    // if (remaining_tables) {
    //   return res.status(400).json(remaining_tables);
    // }
    if (table) {
      return res.status(400).json(table);
    }

    const roundsReserv = await roundsReservs.create({
      partner_id: partnerId,
      customer_id: customerId,
      day: new Date(day).toLocaleDateString("en-GB"),
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
    const { partner_id, day, start, amount, customer_id } = req.body;
    const partnerId = mongoose.Types.ObjectId(partner_id);
    const customerId = mongoose.Types.ObjectId(customer_id);
    const partnerInfo = await restaurants.findOne({
      partner_id: partnerId,
    });
    var startTime = new Date(start).getTime();
    startTime += partnerInfo.time_length * 60 * 1000;
    const end = new Date(startTime).toLocaleTimeString("it-IT");
    const dayOfWeekName = new Date(day).toLocaleString("default", {
      weekday: "long",
    });
    const reservs = await allDayReservs.find({
      $and: [
        { partner_id: partnerId },
        { day: new Date(day).toLocaleDateString("en-GB") },
        {
          $or: [
            { start: { $gte: new Date(start).toLocaleTimeString("it-IT") } },
            {
              end: { $gt: new Date(start).toLocaleTimeString("it-IT") },
            },
          ],
        },

        {
          $or: [
            {
              start: { $lt: end },
            },
            {
              end: { $lte: end },
            },
          ],
        },
      ],
    });
    const alltables = await tables.find({
      partner_id: partnerId,
    });

    const reserved_tables = [];
    const allTable = [];
    const table = [];
    let seatAmount = Number(amount);

    reservs.forEach((reserv) => {
      reserv.table.forEach((table) => {
        reserved_tables.push(table);
      });
    });
    alltables.forEach((tables) => {
      allTable.push(tables);
    });

    const remaining_tables = allTable.filter((tableNo) => {
      let found = false;
      for (const reservedTable of reserved_tables) {
        if (tableNo.table_no === reservedTable) {
          found = true;
        }
      }
      return !found;
    });

    const reservedTable = (n, remaining_tables) => {
      const max_reamaining = [];
      remaining_tables.forEach((remaining_table) => {
        max_reamaining.push(Number(remaining_table.seat));
      });

      const maxSeat = Math.max(...max_reamaining);
      const total_reamining_n = remaining_tables.reduce(
        (prev, cur) => Number(cur.seat) + Number(prev.seat),
        0
      );
      if (n <= 0) {
        return res.status(400).json({ error: "กรุณากรอกจำนวนคนใหม่" });
      } else if (n > total_reamining_n) {
        return res.status(400).json({ error: "โต๊ะไม่พอรองรับ" });
      } else if (n <= maxSeat) {
        const Numseats = remaining_tables.filter((remaining_table) => {
          let found = false;
          if (remaining_table.seat >= seatAmount) {
            found = true;
          }
          return found;
        });

        const minSeats = Numseats.reduce((prev, cur) =>
          Number(cur.seat) < Number(prev.seat) ? cur : prev
        );

        table.push(minSeats.table_no);
      } else if (n > maxSeat) {
        const maxSeats = remaining_tables.reduce((prev, cur) =>
          Number(cur.seat) > Number(prev.seat) ? cur : prev
        );

        seatAmount -= maxSeats.seat;
        table.push(maxSeats.table_no);

        const remain_n = remaining_tables.filter((remaining_table) => {
          let found = false;
          if (maxSeats.table_no === remaining_table.table_no) {
            found = true;
          }

          return !found;
        });

        return reservedTable(seatAmount, remain_n);
      }
    };
    if (
      partnerInfo.openday[dayOfWeekName.toLocaleLowerCase()].type === "close"
    ) {
      return res
        .status(400)
        .json({ error: "ไม่สามารถจองคิวได้ เนื่องจากร้านปิด1" });
    } else if (
      partnerInfo.openday[dayOfWeekName.toLocaleLowerCase()].end <=
      new Date(start).toLocaleTimeString("it-IT")
    ) {
      return res
        .status(400)
        .json({ error: "ไม่สามารถจองคิวได้ เนื่องจากร้านปิด2" });
    } else if (
      partnerInfo.openday[dayOfWeekName.toLocaleLowerCase()].start >
      new Date(start).toLocaleTimeString("it-IT")
    ) {
      return res
        .status(400)
        .json({ error: "ไม่สามารถจองคิวได้ เนื่องจากร้านปิด3" });
    } else if (remaining_tables.length === 0) {
      return res.status(400).json({ error: "รอบเวลานี้ โต๊ะเต็มแล้ว" });
    }

    reservedTable(seatAmount, remaining_tables);
    // if (remaining_tables) {
    //   return res.status(400).json(remaining_tables);
    // }
    // if (table) {
    //   return res.status(400).json(table);
    // }
    const allDayReserv = await allDayReservs.create({
      partner_id: partnerId,
      customer_id: customerId,
      day: new Date(day).toLocaleDateString("en-GB"),
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
    const { partner_id, day, start, end, amount, self_reserv } = req.body;
    const partnerId = mongoose.Types.ObjectId(partner_id);
    const alltables = await tables.find({
      partner_id: partnerId,
    });
    const partnerInfo = await restaurants.findOne({
      partner_id: partnerId,
    });
    const dayOfWeekName = new Date(day).toLocaleString("default", {
      weekday: "long",
    });
    const reservs = await roundsReservs.find({
      $and: [
        { partner_id: partnerId },
        { day: new Date(day).toLocaleDateString("en-GB") },
        { start: start },
        { end: end },
      ],
    });
    const reserved_tables = [];
    const allTable = [];
    const table = [];
    let seatAmount = Number(amount);
    alltables.forEach((tables) => {
      allTable.push(tables);
    });

    reservs.forEach((reserv) => {
      reserv.table.forEach((table) => {
        reserved_tables.push(table);
      });
    });
    const remaining_tables = allTable.filter((tableNo) => {
      let found = false;
      for (const reservedTable of reserved_tables) {
        if (tableNo.table_no === reservedTable) {
          found = true;
        }
      }
      return !found;
    });
    const reservedTable = (n, remaining_tables) => {
      const max_reamaining = [];
      remaining_tables.forEach((remaining_table) => {
        max_reamaining.push(Number(remaining_table.seat));
      });

      const maxSeat = Math.max(...max_reamaining);
      const total_reamining_n = remaining_tables.reduce(
        (prev, cur) => Number(cur.seat) + Number(prev.seat),
        0
      );
      if (n <= 0) {
        return res.status(400).json({ error: "กรุณากรอกจำนวนคนใหม่" });
      } else if (n > total_reamining_n) {
        return res.status(400).json({ error: "โต๊ะไม่พอรองรับ" });
      } else if (n <= maxSeat) {
        const Numseats = remaining_tables.filter((remaining_table) => {
          let found = false;
          if (remaining_table.seat >= seatAmount) {
            found = true;
          }
          return found;
        });

        const minSeats = Numseats.reduce((prev, cur) =>
          Number(cur.seat) < Number(prev.seat) ? cur : prev
        );

        table.push(minSeats.table_no);
      } else if (n > maxSeat) {
        const maxSeats = remaining_tables.reduce((prev, cur) =>
          Number(cur.seat) > Number(prev.seat) ? cur : prev
        );

        seatAmount -= maxSeats.seat;
        table.push(maxSeats.table_no);

        const remain_n = remaining_tables.filter((remaining_table) => {
          let found = false;
          if (maxSeats.table_no === remaining_table.table_no) {
            found = true;
          }

          return !found;
        });

        return reservedTable(seatAmount, remain_n);
      }
    };
    if (
      partnerInfo.openday[dayOfWeekName.toLocaleLowerCase()].type === "close"
    ) {
      return res
        .status(400)
        .json({ error: "ไม่สามารถจองคิวได้ เนื่องจากร้านปิด1" });
    } else if (remaining_tables.length === 0) {
      return res.status(400).json({ error: "รอบเวลานี้ โต๊ะเต็มแล้ว" });
    }
    reservedTable(seatAmount, remaining_tables);
    // if (remaining_tables) {
    //   return res.status(400).json(remaining_tables);
    // }
    // if (table) {
    //   return res.status(400).json(table);
    // }
    // if (reservs) {
    //   return res.status(400).json(reservs);
    // }
    // if (allTable) {
    //   return res.status(400).json(allTable);
    // }
    const roundsReserv = await roundsReservs.create({
      partner_id: partnerId,
      self_reserv: self_reserv,
      day: new Date(day).toLocaleDateString("en-GB"),
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
    const { partner_id, day, start, amount, self_reserv } = req.body;
    const partnerId = mongoose.Types.ObjectId(partner_id);

    const partnerInfo = await restaurants.findOne({
      partner_id: partnerId,
    });

    var startTime = new Date(start).getTime();
    startTime += partnerInfo.time_length * 60 * 1000;
    const end = new Date(startTime).toLocaleTimeString("it-IT");
    const dayOfWeekName = new Date(day).toLocaleString("default", {
      weekday: "long",
    });

    const reservs = await allDayReservs.find({
      $and: [
        { partner_id: partnerId },
        { day: new Date(day).toLocaleDateString("en-GB") },
        {
          $or: [
            { start: { $gte: new Date(start).toLocaleTimeString("it-IT") } },
            {
              end: { $gt: new Date(start).toLocaleTimeString("it-IT") },
            },
          ],
        },

        {
          $or: [
            {
              start: { $lt: end },
            },
            {
              end: { $lte: end },
            },
          ],
        },
      ],
    });
    const alltables = await tables.find({
      partner_id: partnerId,
    });

    const reserved_tables = [];
    const allTable = [];
    const table = [];
    let seatAmount = Number(amount);

    reservs.forEach((reserv) => {
      reserv.table.forEach((table) => {
        reserved_tables.push(table);
      });
    });
    alltables.forEach((tables) => {
      allTable.push(tables);
    });

    const remaining_tables = allTable.filter((tableNo) => {
      let found = false;
      for (const reservedTable of reserved_tables) {
        if (tableNo.table_no === reservedTable) {
          found = true;
        }
      }
      return !found;
    });

    // let sort_remaining_tables = remaining_tables;
    // sort_remaining_tables.sort((a, b) => {
    //   return b.seat - a.seat;
    // });

    const reservedTable = (n, remaining_tables) => {
      const max_reamaining = [];
      remaining_tables.forEach((remaining_table) => {
        max_reamaining.push(Number(remaining_table.seat));
      });

      const maxSeat = Math.max(...max_reamaining);
      const total_reamining_n = remaining_tables.reduce(
        (prev, cur) => Number(cur.seat) + Number(prev.seat),
        0
      );
      if (n <= 0) {
        return res.status(400).json({ error: "กรุณากรอกจำนวนคนใหม่" });
      } else if (n > total_reamining_n) {
        return res.status(400).json({ error: "โต๊ะไม่พอรองรับ" });
      } else if (n <= maxSeat) {
        const Numseats = remaining_tables.filter((remaining_table) => {
          let found = false;
          if (remaining_table.seat >= seatAmount) {
            found = true;
          }
          return found;
        });

        const minSeats = Numseats.reduce((prev, cur) =>
          Number(cur.seat) < Number(prev.seat) ? cur : prev
        );

        table.push(minSeats.table_no);
      } else if (n > maxSeat) {
        const maxSeats = remaining_tables.reduce((prev, cur) =>
          Number(cur.seat) > Number(prev.seat) ? cur : prev
        );

        seatAmount -= maxSeats.seat;
        table.push(maxSeats.table_no);

        const remain_n = remaining_tables.filter((remaining_table) => {
          let found = false;
          if (maxSeats.table_no === remaining_table.table_no) {
            found = true;
          }

          return !found;
        });

        return reservedTable(seatAmount, remain_n);
      }
    };

    if (
      partnerInfo.openday[dayOfWeekName.toLocaleLowerCase()].type === "close"
    ) {
      return res
        .status(400)
        .json({ error: "ไม่สามารถจองคิวได้ เนื่องจากร้านปิด1" });
    } else if (
      partnerInfo.openday[dayOfWeekName.toLocaleLowerCase()].end <=
      new Date(start).toLocaleTimeString("it-IT")
    ) {
      return res
        .status(400)
        .json({ error: "ไม่สามารถจองคิวได้ เนื่องจากร้านปิด2" });
    } else if (
      partnerInfo.openday[dayOfWeekName.toLocaleLowerCase()].start >
      new Date(start).toLocaleTimeString("it-IT")
    ) {
      return res
        .status(400)
        .json({ error: "ไม่สามารถจองคิวได้ เนื่องจากร้านปิด3" });
    } else if (remaining_tables.length === 0) {
      return res.status(400).json({ error: "รอบเวลานี้ โต๊ะเต็มแล้ว" });
    }

    reservedTable(seatAmount, remaining_tables);
    if (table) {
      return res.status(400).json(table);
    }

    // if (remaining_tables) {
    //   return res.status(400).json(remaining_tables);
    // }

    const allDayReserv = await allDayReservs.create({
      partner_id: partnerId,
      self_reserv: self_reserv,
      day: new Date(day).toLocaleDateString("en-GB"),
      start: new Date(start).toLocaleTimeString("it-IT"),
      end: end,
      amount: amount,
      table: table,
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
