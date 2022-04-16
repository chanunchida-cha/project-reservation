const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const registerRoute = require("./routes/registerRoute");
const authRoute = require("./routes/authRoute");
const partnerRegisRoute = require("./routes/partnerRegisRoute");
const partnerAuthRoute = require("./routes/partnerAuthRoute");
const adminRoute = require("./routes/adminRoute")

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
  .catch(() => {
    console.log(err);
  });

//middleware
app.use(express.json());
app.use(cors());
app.use(morgan());

//route
app.use("/users", registerRoute);
app.use("/user", authRoute);
app.use("/partner", partnerRegisRoute);
app.use("/partner", partnerAuthRoute);
app.use("/admin",adminRoute)

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(` start server in port ${port}`));
