const { Router } = require("express");
const router = Router();
const { adminLogin, getAdmin } = require("../controllers/adminAuthController");
const adminAuth = require("../middlewares/adminAuth");

router.post("/adminlogin", adminLogin);
router.get("/getadmin", adminAuth, getAdmin);

module.exports = router;
