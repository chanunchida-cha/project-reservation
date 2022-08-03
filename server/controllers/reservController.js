const roundsReservs = require("../models/roundsReservDB");
const allDayReservs = require("../models/allDayReservDB");
const restaurants = require("../models/restaurantDB");
const partners = require("../models/partnerDB");
const tables = require("../models/tableDB");
const Users = require("../models/userDB");
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

    const reservtotal = await roundsReservs.aggregate([
      { $match: { partner_id: partnerId } },
    ]);
    const reservs = await roundsReservs.find({
      $and: [
        { partner_id: partnerId },
        { day: new Date(day).toISOString() },
        { start: start },
        { end: end },
        {
          $or: [{ status: "pending" }, { status: "arrived" }],
        },
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

    const roundsReserv = await roundsReservs.create({
      reservNumber: `cq${reservtotal.length + 1}`,
      partner_id: partnerId,
      customer_id: customerId,
      day: new Date(day).toISOString(),
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

    const reservtotal = await allDayReservs.aggregate([
      { $match: { partner_id: partnerId } },
    ]);
    const reservs = await allDayReservs.find({
      $and: [
        { partner_id: partnerId },
        { day: new Date(day).toISOString() },
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
        {
          $or: [{ status: "pending" }, { status: "arrived" }],
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

    const allDayReserv = await allDayReservs.create({
      reservNumber: `cq${reservtotal.length + 1}`,
      partner_id: partnerId,
      customer_id: customerId,
      day: new Date(day).toISOString(),
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

    const reservtotal = await roundsReservs.aggregate([
      { $match: { partner_id: partnerId } },
    ]);
    const reservs = await roundsReservs.find({
      $and: [
        { partner_id: partnerId },
        { day: new Date(day).toISOString() },
        { start: start },
        { end: end },
        {
          $or: [{ status: "pending" }, { status: "arrived" }],
        },
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

    const roundsReserv = await roundsReservs.create({
      reservNumber: `cq${reservtotal.length + 1}`,
      partner_id: partnerId,
      self_reserv: self_reserv,
      day: new Date(day).toISOString(),
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

    const reservtotal = await allDayReservs.aggregate([
      { $match: { partner_id: partnerId } },
    ]);

    const reservs = await allDayReservs.find({
      $and: [
        { partner_id: partnerId },
        { day: new Date(day).toISOString() },
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
        {
          $or: [{ status: "pending" }, { status: "arrived" }],
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

    const allDayReserv = await allDayReservs.create({
      reservNumber: `cq${reservtotal.length + 1}`,
      partner_id: partnerId,
      self_reserv: self_reserv,
      day: new Date(day).toISOString(),
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

const getAllDayReserv = async (req, res) => {
  const { id } = req.params;

  const Id = mongoose.Types.ObjectId(id);
  allDayReservs
    .aggregate([
      {
        $match: {
          partner_id: Id,
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "customer_id",
          foreignField: "_id",
          as: "customer",
        },
      },
      {
        $sort: { day: 1 },
      },
    ])
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      console.log(err);
    });
};

const getAllDayReservToday = (req, res) => {
  const { id } = req.params;
  const date = `${new Date().toLocaleDateString().split("/").join("-")}z`;
  allDayReservs
    .aggregate([
      {
        $match: {
          partner_id: mongoose.Types.ObjectId(id),
          day: new Date(date),
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "customer_id",
          foreignField: "_id",
          as: "customer",
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

const getAllDayReservByID = (req, res) => {
  const { id } = req.params;
  allDayReservs
    .aggregate([
      {
        $match: {
          _id: mongoose.Types.ObjectId(id),
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "customer_id",
          foreignField: "_id",
          as: "customer",
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
const getRoundReserv = (req, res) => {
  const { id } = req.params;
  roundsReservs
    .aggregate([
      {
        $match: {
          partner_id: mongoose.Types.ObjectId(id),
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "customer_id",
          foreignField: "_id",
          as: "customer",
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
const getRoundReservToday = (req, res) => {
  const { id } = req.params;
  const date = `${new Date().toLocaleDateString().split("/").join("-")}z`;
  roundsReservs
    .aggregate([
      {
        $match: {
          partner_id: mongoose.Types.ObjectId(id),
          day: new Date(date),
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "customer_id",
          foreignField: "_id",
          as: "customer",
        },
      },
    ])
    .then((response) => {
      res.json(response);
      console.log(new Date(date));
    })
    .catch((err) => {
      console.log(err);
    });
};

const getRoundReservByID = (req, res) => {
  const { id } = req.params;

  roundsReservs
    .aggregate([
      {
        $match: {
          _id: mongoose.Types.ObjectId(id),
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "customer_id",
          foreignField: "_id",
          as: "customer",
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

const updateSelfAllDayReserv = async (req, res) => {
  try {
    const { id } = req.params;
    const { partner_id, day, start, amount, self_reserv, table } = req.body;
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
        { day: new Date(day).toISOString() },
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
        {
          $or: [{ status: "pending" }, { status: "arrived" }],
        },
      ],
    });

    //โต๊ะทั้งหมด
    const alltables = await tables.find({
      partner_id: partnerId,
    });
    //โต๊ะของการจอง id นี้
    const myReservTables = await allDayReservs.aggregate([
      {
        $match: {
          _id: mongoose.Types.ObjectId(id),
        },
      },
    ]);
    const reserved_tables = [];
    const myReservTable = [];
    const remain_n = [];
    let newTables = [];
    let seatAmount = Number(amount);
    reservs.forEach((reserv) => {
      reserv.table.forEach((table) => {
        reserved_tables.push(table);
      });
    });
    myReservTables.forEach((reservTable) => {
      myReservTable.push(...reservTable.table);
    });

    // reserved_tables.push(myReservTable);

    let isReservTable = [];

    //ถ้ารอบเวลาภายในนี้ให้เอาโต๊ะ id นี้ออก
    let dupArrs = reserved_tables.filter((dupArr, index) => {
      return reserved_tables.indexOf(dupArr) !== index;
    });
    if (
      new Date(myReservTables[0].day).toISOString() ===
        new Date(day).toISOString() &&
      (myReservTables[0].start >= new Date(start).toLocaleTimeString("it-IT") ||
        myReservTables[0].end > new Date(start).toLocaleTimeString("it-IT")) &&
      (myReservTables[0].start < end || myReservTables[0].end <= end)
    ) {
      isReservTable = reserved_tables.filter((reservedTable) => {
        let found = false;
        for (const myTable of myReservTable) {
          if (reservedTable === myTable) {
            found = true;
          }
        }
        return !found;
      });
      if (dupArrs.length > 0) {
        isReservTable.push(...dupArrs);
      }
    } else {
      isReservTable = [...reserved_tables];
    }

    const remaining_tables = alltables.filter((tableNo) => {
      let found = false;
      for (const reservedTable of isReservTable) {
        if (tableNo.table_no === reservedTable) {
          found = true;
        }
      }
      return !found;
    });

    //โต๊ะที่จองได้
    remaining_tables.forEach((remaining_table) => {
      remain_n.push(remaining_table.table_no);
    });
    const duplicateTable = isReservTable.filter((remain) => {
      let found = false;
      for (const theTable of table) {
        if (theTable === remain) {
          found = true;
        }
      }
      return found;
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

        newTables.push(minSeats.table_no);
      } else if (n > maxSeat) {
        const maxSeats = remaining_tables.reduce((prev, cur) =>
          Number(cur.seat) > Number(prev.seat) ? cur : prev
        );

        seatAmount -= maxSeats.seat;
        newTables.push(maxSeats.table_no);

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

    if (amount !== myReservTables[0].amount) {
      reservedTable(seatAmount, remaining_tables);
    } else newTables = [...table];

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
    } else if (remain_n.length === 0) {
      return res.status(400).json({ error: "รอบเวลานี้ โต๊ะเต็มแล้ว" });
    } else if (duplicateTable.length >= 1) {
      return res.status(400).json({ error: "โต๊ะนี้ถูกจองแล้ว" });
    }

    allDayReservs.findByIdAndUpdate(
      id,
      {
        $set: {
          self_reserv: self_reserv,
          day: new Date(day).toISOString(),
          start: new Date(start).toLocaleTimeString("it-IT"),
          end: end,
          amount: amount,
          table: newTables,
        },
      },
      (err, update) => {
        if (err) {
          console.log(err);
        } else {
          res.status(200).json(update);
        }
      }
    );
  } catch (err) {
    console.log(err);
  }
};

const updateCustomerAllDayReserv = async (req, res) => {
  try {
    const { id } = req.params;
    const { partner_id, day, start, amount, customer_id, table } = req.body;
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
        { day: new Date(day).toISOString() },
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
        {
          $or: [{ status: "pending" }, { status: "arrived" }],
        },
      ],
    });
    //โต๊ะทั้งหมด
    const alltables = await tables.find({
      partner_id: partnerId,
    });
    //โต๊ะของการจอง id นี้
    const myReservTables = await allDayReservs.aggregate([
      {
        $match: {
          _id: mongoose.Types.ObjectId(id),
        },
      },
    ]);
    const reserved_tables = [];
    const remain_n = [];
    const myReservTable = [];

    let newTables = [];
    let seatAmount = Number(amount);
    reservs.forEach((reserv) => {
      reserv.table.forEach((table) => {
        reserved_tables.push(table);
      });
    });
    myReservTables.forEach((reservTable) => {
      myReservTable.push(...reservTable.table);
    });
    let isReservTable = [];
    //เอาโต๊ะของรอบจองนี้ออก
    let dupArrs = reserved_tables.filter((dupArr, index) => {
      return reserved_tables.indexOf(dupArr) !== index;
    });
    if (
      new Date(myReservTables[0].day).toISOString() ===
        new Date(day).toISOString() &&
      (myReservTables[0].start >= new Date(start).toLocaleTimeString("it-IT") ||
        myReservTables[0].end > new Date(start).toLocaleTimeString("it-IT")) &&
      (myReservTables[0].start < end || myReservTables[0].end <= end)
    ) {
      isReservTable = reserved_tables.filter((reservedTable) => {
        let found = false;
        for (const myTable of myReservTable) {
          if (reservedTable === myTable) {
            found = true;
          }
        }
        return !found;
      });
      if (dupArrs.length > 0) {
        isReservTable.push(...dupArrs);
      }
    } else {
      isReservTable = [...reserved_tables];
    }
    const remaining_tables = alltables.filter((tableNo) => {
      let found = false;
      for (const reservedTable of isReservTable) {
        if (tableNo.table_no === reservedTable) {
          found = true;
        }
      }
      return !found;
    });
    //โต๊ะที่จองได้
    remaining_tables.forEach((remaining_table) => {
      remain_n.push(remaining_table.table_no);
    });
    const duplicateTable = isReservTable.filter((remain) => {
      let found = false;
      for (const theTable of table) {
        if (theTable === remain) {
          found = true;
        }
      }
      return found;
    });
    // if (remaining_tables) {
    //   return res.status(400).json(remaining_tables);
    // }

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

        newTables.push(minSeats.table_no);
      } else if (n > maxSeat) {
        const maxSeats = remaining_tables.reduce((prev, cur) =>
          Number(cur.seat) > Number(prev.seat) ? cur : prev
        );

        seatAmount -= maxSeats.seat;
        newTables.push(maxSeats.table_no);

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

    if (amount !== myReservTables[0].amount) {
      reservedTable(seatAmount, remaining_tables);
    } else newTables = [...table];

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
    } else if (remain_n.length === 0) {
      return res.status(400).json({ error: "รอบเวลานี้ โต๊ะเต็มแล้ว" });
    } else if (duplicateTable.length >= 1) {
      return res.status(400).json({ error: "โต๊ะนี้ถูกจองแล้ว" });
    }

    allDayReservs.findByIdAndUpdate(
      id,
      {
        $set: {
          customer_id: customer_id,
          day: new Date(day).toISOString(),
          start: new Date(start).toLocaleTimeString("it-IT"),
          end: end,
          amount: amount,
          table: table,
        },
      },
      (err, update) => {
        if (err) {
          console.log(err);
        } else {
          res.status(200).json(update);
        }
      }
    );
  } catch (err) {
    console.log(err);
  }
};

const updateSelfRoundReserv = async (req, res) => {
  try {
    const { id } = req.params;
    const { partner_id, day, start, end, amount, self_reserv, table } =
      req.body;
    const partnerId = mongoose.Types.ObjectId(partner_id);
    const partnerInfo = await restaurants.findOne({
      partner_id: partnerId,
    });
    const dayOfWeekName = new Date(day).toLocaleString("default", {
      weekday: "long",
    });

    const reservs = await roundsReservs.find({
      $and: [
        { partner_id: partnerId },
        { day: new Date(day).toISOString() },
        { start: start },
        { end: end },
        {
          $or: [{ status: "pending" }, { status: "arrived" }],
        },
      ],
    });
    const myReservTables = await roundsReservs.aggregate([
      {
        $match: {
          _id: mongoose.Types.ObjectId(id),
        },
      },
    ]);
    const alltables = await tables.find({
      partner_id: partnerId,
    });
    const reserved_tables = [];
    const remain_n = [];
    const myReservTable = [];
    let newTables = [];
    let seatAmount = Number(amount);

    //โต๊ะที่ถูกจองในเวลาที่ครอบคลุม
    reservs.forEach((reserv) => {
      reserv.table.forEach((table) => {
        reserved_tables.push(table);
      });
    });
    myReservTables.forEach((reservTable) => {
      myReservTable.push(...reservTable.table);
    });

    //หาว่ามีโต๊ะซ้ำไหม
    let dupArrs = reserved_tables.filter((dupArr, index) => {
      return reserved_tables.indexOf(dupArr) !== index;
    });

    //เอาโต๊ะของรอบจองนี้ออก
    let isReservTable = [];
    if (
      new Date(myReservTables[0].day).toISOString() ===
        new Date(day).toISOString() &&
      myReservTables[0].start === start
    ) {
      isReservTable = reserved_tables.filter((reservedTable) => {
        let found = false;
        for (const myTable of myReservTable) {
          if (reservedTable === myTable) {
            found = true;
          }
        }
        return !found;
      });
      if (dupArrs.length > 0) {
        isReservTable.push(...dupArrs);
      }
    } else {
      isReservTable = [...reserved_tables];
    }
    //โต๊ะที่เหลือ filter out โต๊ะที่ถูกจองในเวลานั้นออกแล้ว
    const remaining_tables = alltables.filter((tableNo) => {
      let found = false;
      for (const reservedTable of isReservTable) {
        if (tableNo.table_no === reservedTable) {
          found = true;
        }
      }
      return !found;
    });
    //โต๊ะที่จองได้
    remaining_tables.forEach((remaining_table) => {
      remain_n.push(remaining_table.table_no);
    });

    const duplicateTable = isReservTable.filter((remain) => {
      let found = false;
      for (const theTable of table) {
        if (theTable === remain) {
          found = true;
        }
      }
      return found;
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

        newTables.push(minSeats.table_no);
      } else if (n > maxSeat) {
        const maxSeats = remaining_tables.reduce((prev, cur) =>
          Number(cur.seat) > Number(prev.seat) ? cur : prev
        );

        seatAmount -= maxSeats.seat;
        newTables.push(maxSeats.table_no);

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

    if (amount !== myReservTables[0].amount) {
      reservedTable(seatAmount, remaining_tables);
    } else newTables = [...table];

    if (
      partnerInfo.openday[dayOfWeekName.toLocaleLowerCase()].type === "close"
    ) {
      return res
        .status(400)
        .json({ error: "ไม่สามารถจองคิวได้ เนื่องจากร้านปิด1" });
    } else if (remain_n.length === 0) {
      return res.status(400).json({ error: "รอบเวลานี้ โต๊ะเต็มแล้ว" });
    } else if (duplicateTable.length >= 1) {
      return res.status(400).json({ error: "โต๊ะนี้ถูกจองแล้ว" });
    }

    roundsReservs.findByIdAndUpdate(
      id,
      {
        $set: {
          self_reserv: self_reserv,
          day: new Date(day).toISOString(),
          start: start,
          end: end,
          amount: amount,
          table: newTables,
        },
      },
      (err, update) => {
        if (err) {
          console.log(err);
        } else {
          res.status(200).json(update);
        }
      }
    );
    // res.status(200).json("update success");
  } catch (err) {
    console.log(err);
  }
};

const updateCustomerRoundReserv = async (req, res) => {
  try {
    const { id } = req.params;
    const { partner_id, day, start, end, amount, customer_id, table } =
      req.body;
    const partnerId = mongoose.Types.ObjectId(partner_id);
    const partnerInfo = await restaurants.findOne({
      partner_id: partnerId,
    });
    const dayOfWeekName = new Date(day).toLocaleString("default", {
      weekday: "long",
    });

    const reservs = await roundsReservs.find({
      $and: [
        { partner_id: partnerId },
        { day: new Date(day).toISOString() },
        { start: start },
        { end: end },
        {
          $or: [{ status: "pending" }, { status: "arrived" }],
        },
      ],
    });
    const alltables = await tables.find({
      partner_id: partnerId,
    });
    const myReservTables = await roundsReservs.aggregate([
      {
        $match: {
          _id: mongoose.Types.ObjectId(id),
        },
      },
    ]);

    const reserved_tables = [];
    const remain_n = [];
    const myReservTable = [];
    let newTables = [];
    let seatAmount = Number(amount);

    //โต๊ะที่ถูกจองในเวลาที่ครอบคลุม
    reservs.forEach((reserv) => {
      reserv.table.forEach((table) => {
        reserved_tables.push(table);
      });
    });

    //โต๊ะของการจองนี้
    reservs.forEach((reserv) => {
      reserv.table.forEach((table) => {
        reserved_tables.push(table);
      });
    });
    myReservTables.forEach((reservTable) => {
      myReservTable.push(...reservTable.table);
    });

    //หาว่ามีโต๊ะซ้ำไหม
    let dupArrs = reserved_tables.filter((dupArr, index) => {
      return reserved_tables.indexOf(dupArr) !== index;
    });

    //เอาโต๊ะของรอบจองนี้ออก
    let isReservTable = [];

    if (
      new Date(myReservTables[0].day).toISOString() ===
        new Date(day).toISOString() &&
      myReservTables[0].start === start
    ) {
      isReservTable = reserved_tables.filter((reservedTable) => {
        let found = false;
        for (const myTable of myReservTable) {
          if (reservedTable === myTable) {
            found = true;
          }
        }
        return !found;
      });
      if (dupArrs.length > 0) {
        isReservTable.push(...dupArrs);
      }
    } else {
      isReservTable = [...reserved_tables];
    }
    //โต๊ะที่เหลือ filter out โต๊ะที่ถูกจองในเวลานั้นออกแล้ว
    const remaining_tables = alltables.filter((tableNo) => {
      let found = false;
      for (const reservedTable of isReservTable) {
        if (tableNo.table_no === reservedTable) {
          found = true;
        }
      }
      return !found;
    });
    //โต๊ะที่จองได้
    remaining_tables.forEach((remaining_table) => {
      remain_n.push(remaining_table.table_no);
    });

    const duplicateTable = isReservTable.filter((remain) => {
      let found = false;
      for (const theTable of table) {
        if (theTable === remain) {
          found = true;
        }
      }
      return found;
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

        newTables.push(minSeats.table_no);
      } else if (n > maxSeat) {
        const maxSeats = remaining_tables.reduce((prev, cur) =>
          Number(cur.seat) > Number(prev.seat) ? cur : prev
        );

        seatAmount -= maxSeats.seat;
        newTables.push(maxSeats.table_no);

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

    if (amount !== myReservTables[0].amount) {
      reservedTable(seatAmount, remaining_tables);
    } else newTables = [...table];

    if (
      partnerInfo.openday[dayOfWeekName.toLocaleLowerCase()].type === "close"
    ) {
      return res
        .status(400)
        .json({ error: "ไม่สามารถจองคิวได้ เนื่องจากร้านปิด1" });
    } else if (remain_n.length === 0) {
      return res.status(400).json({ error: "รอบเวลานี้ โต๊ะเต็มแล้ว" });
    } else if (duplicateTable.length >= 1) {
      return res.status(400).json({ error: "โต๊ะนี้ถูกจองแล้ว" });
    }

    roundsReservs.findByIdAndUpdate(
      id,
      {
        $set: {
          customer_id: customer_id,
          day: new Date(day).toISOString(),
          start: start,
          end: end,
          amount: amount,
          table: newTables,
        },
      },
      (err, update) => {
        if (err) {
          console.log(err);
        } else {
          res.status(200).json(update);
        }
      }
    );
    // res.status(200).json("update success");
  } catch (err) {
    console.log(err);
  }
};

const allDayDelete = (req, res) => {
  const { id } = req.params;
  allDayReservs.findByIdAndDelete(id, (err) => {
    if (err) {
      console.log(err);
    } else {
      res.status(200).json({
        status: "delete success",
      });
    }
  });
};

const roundDelete = (req, res) => {
  const { id } = req.params;
  roundsReservs.findByIdAndDelete(id, (err) => {
    if (err) {
      console.log(err);
    } else {
      res.status(200).json({
        status: "delete success",
      });
    }
  });
};
const updateStatusAllDay = (req, res) => {
  const { id } = req.params;
  allDayReservs.findByIdAndUpdate(
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
const updateStatusRound = (req, res) => {
  const { id } = req.params;
  roundsReservs.findByIdAndUpdate(
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

const getRoundReservByCustomerPending = async (req, res) => {
  const { id } = req.params;
  const date = new Date().toISOString().split("T", 1);
  roundsReservs
    .aggregate([
      {
        $match: {
          customer_id: mongoose.Types.ObjectId(id),
          day: { $gte: new Date(date) },
          status: "pending",
        },
      },
      {
        $lookup: {
          from: "partners",
          localField: "partner_id",
          foreignField: "_id",
          as: "partner",
        },
      },
      {
        $unwind: "$partner",
      },
    ])
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      console.log(err);
    });
};
const getAlldayReservByCustomerPending = async (req, res) => {
  const { id } = req.params;
  const date = new Date().toISOString().split("T", 1);
  allDayReservs
    .aggregate([
      {
        $match: {
          customer_id: mongoose.Types.ObjectId(id),
          day: { $gte: new Date(date) },
          status: "pending",
        },
      },
      {
        $lookup: {
          from: "partners",
          localField: "partner_id",
          foreignField: "_id",
          as: "partner",
        },
      },
      {
        $unwind: "$partner",
      },
    ])
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      console.log(err);
    });
};
const getRoundReservByCustomerArrived = async (req, res) => {
  const { id } = req.params;
  const date = new Date().toISOString().split("T", 1);
  roundsReservs
    .aggregate([
      {
        $match: {
          customer_id: mongoose.Types.ObjectId(id),
          day: { $gte: new Date(date) },
          status: "arrived",
        },
      },
      {
        $lookup: {
          from: "partners",
          localField: "partner_id",
          foreignField: "_id",
          as: "partner",
        },
      },
      {
        $unwind: "$partner",
      },
    ])
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      console.log(err);
    });
};
const getAlldayReservByCustomerArrived = async (req, res) => {
  const { id } = req.params;
  const date = new Date().toISOString().split("T", 1);
  allDayReservs
    .aggregate([
      {
        $match: {
          customer_id: mongoose.Types.ObjectId(id),
          day: { $gte: new Date(date) },
          status: "arrived",
        },
      },
      {
        $lookup: {
          from: "partners",
          localField: "partner_id",
          foreignField: "_id",
          as: "partner",
        },
      },
      {
        $unwind: "$partner",
      },
    ])
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      console.log(err);
    });
};
const getRoundReservByCustomerHistory = async (req, res) => {
  const { id } = req.params;

  roundsReservs
    .aggregate([
      {
        $match: {
          customer_id: mongoose.Types.ObjectId(id),
        },
      },
      {
        $lookup: {
          from: "partners",
          localField: "partner_id",
          foreignField: "_id",
          as: "partner",
        },
      },
      {
        $unwind: "$partner",
      },
    ])
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      console.log(err);
    });
};
const getAlldayReservByCustomerHistory = async (req, res) => {
  const { id } = req.params;

  allDayReservs
    .aggregate([
      {
        $match: {
          customer_id: mongoose.Types.ObjectId(id),
        },
      },
      {
        $lookup: {
          from: "partners",
          localField: "partner_id",
          foreignField: "_id",
          as: "partner",
        },
      },
      {
        $unwind: "$partner",
      },
    ])
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      console.log(err);
    });
};
module.exports = {
  customerRoundReserv,
  customerAllDayReserv,
  selfRoundReserv,
  selfAllDayReserv,
  getAllDayReserv,
  getAllDayReservToday,
  getAllDayReservByID,
  getRoundReserv,
  getRoundReservToday,
  getRoundReservByID,
  updateSelfAllDayReserv,
  updateCustomerAllDayReserv,
  updateSelfRoundReserv,
  updateCustomerRoundReserv,
  allDayDelete,
  roundDelete,
  updateStatusAllDay,
  updateStatusRound,
  getRoundReservByCustomerPending,
  getAlldayReservByCustomerPending,
  getRoundReservByCustomerArrived,
  getAlldayReservByCustomerArrived,
  getRoundReservByCustomerHistory,
  getAlldayReservByCustomerHistory,
};
