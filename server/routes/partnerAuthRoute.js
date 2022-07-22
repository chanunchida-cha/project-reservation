const { Router } = require("express");
const router = Router();
const {
  partnerLogin,
  getPartner,
  resetPassword,
} = require("../controllers/partnerAuthController");
const partnerAuth = require("../middlewares/partnerAuth");

router.post("/partner-login", partnerLogin);
router.get("/get-partner", partnerAuth, getPartner);
router.put("/reset-password", partnerAuth, resetPassword);

module.exports = router;
