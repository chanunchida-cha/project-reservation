const { Router } = require("express");
const router = Router();
const {
  adminLogin,
  getAdmin,
  resetPassword,
} = require("../controllers/adminAuthController");

const adminAuth = require("../middlewares/adminAuth");

router.post("/admin-login", adminLogin);
router.get("/get-admin", adminAuth, getAdmin);
router.put("/reset-password", adminAuth, resetPassword);

module.exports = router;
