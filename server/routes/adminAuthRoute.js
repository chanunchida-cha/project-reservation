const { Router } = require("express");
const router = Router();
const { adminLogin, getAdmin } = require("../controllers/adminAuthController");
const adminAuth = require("../middlewares/adminAuth");

router.post("/admin-login", adminLogin);
router.get("/get-admin", adminAuth, getAdmin);

module.exports = router;
