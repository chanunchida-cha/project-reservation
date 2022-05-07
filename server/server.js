const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const registerRoute = require("./routes/registerRoute");
const authRoute = require("./routes/authRoute");
const partnerRegisRoute = require("./routes/partnerRegisRoute");
const partnerAuthRoute = require("./routes/partnerAuthRoute");
const adminRoute = require("./routes/adminRoute");
const adminAuthRoute = require("./routes/adminAuthRoute");
const restaurantRoute = require("./routes/restaurantRoute");
const menuRoute = require("./routes/menuRoute")

const app = express();

//connect DB
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: false,
  })
  .then(() => {
    console.log("connect success");
  })
  .catch((err) => {
    console.log(err);
  });

//middleware
app.use(express.json());
app.use(cors());
app.use(morgan());

//route
app.use("/user", registerRoute);
app.use("/user", authRoute);
app.use("/partner", partnerRegisRoute);
app.use("/partner", partnerAuthRoute);
app.use("/partner", restaurantRoute);
app.use("/partner", menuRoute);
app.use("/admin", adminRoute);
app.use("/admin", adminAuthRoute);
app.use("/uploads", express.static("uploads"));

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(` start server in port ${port}`));
