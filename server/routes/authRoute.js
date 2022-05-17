const { Router } = require("express");
const router = Router();
const { login, getUser } = require("../controllers/authController");
const auth = require("../middlewares/auth");

router.post("/login", login);
router.get("/get-user", auth, getUser);

module.exports = router;
