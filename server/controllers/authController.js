const Users = require("../models/userDB");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    if (!(username && password)) {
      res.status(400).json({ error: "All input is requires" });
    }

    const user = await Users.findOne({
      username: username,
    });

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        { user_id: user._id, username },
        process.env.JWT_SECRET,
        {
          expiresIn: "5h",
        }
      );
      user.token = token;
      res.status(200).json(user);
    }
    res.status(404).json({ error: "check username or password " });
  } catch (err) {
    console.log(err);
  }
};

const getUser = async (req, res) => {
  try {
    const user = await Users.findById(req.user.user_id).select("-password");
    if (!user) throw Error("User does not exist");
    res.json(user);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
};

module.exports = {
  login,
  getUser,
};
// const { username, password } = req.body;
// const user = await Users.findOne({ user: username, password: password });
// if (user && user.password === password) {
//   const token = jwt.sign(
//     {
//       username: user.username,
//       password: user.password,
//     },
//     process.env.JWT_SECRET,
//     { expiresIn: "1d" }
//   );
//   return res.json({ token, username });
// } else {
//   return res.status(404).json({ error: "check username or password " });
// }

// const user = Users.findOne({
//     username: req.body.username,
//     password: req.body.password,
//   });
//   if (user) {
//     const token = jwt.sign(
//       {
//         username: user.username,
//         password: user.password,
//       },
//       process.env.JWT_SECRET,
//       { expiresIn: "1d" }
//     );
//     return res.json({ status: "ok", token });
//   } else {
//     return res.jon({ status: "error" });
//   }
