const { Router } = require("express");
const router = Router();
const { login, getUser } = require("../controllers/authController");
const auth = require("../middlewares/auth");
const Users = require("../models/userDB");

router.post("/login", login);
router.get("/getuser", auth, getUser);

module.exports = router;
