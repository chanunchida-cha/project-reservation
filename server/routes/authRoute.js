const { Router } = require("express");
const router = Router();
const {
  login,
  getUser,
  resetPassword,
} = require("../controllers/authController");
const auth = require("../middlewares/auth");

router.post("/login", login);
router.get("/get-user", auth, getUser);
router.put("/reset-password", auth, resetPassword);
module.exports = router;
