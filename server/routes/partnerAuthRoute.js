const { Router } = require("express");
const router = Router();
const {
  partnerLogin,
  getPartner,
} = require("../controllers/partnerAuthController");
const partnerAuth = require("../middlewares/partnerAuth");

router.post("/partner-login", partnerLogin);
router.get("/get-partner", partnerAuth, getPartner);

module.exports = router;
