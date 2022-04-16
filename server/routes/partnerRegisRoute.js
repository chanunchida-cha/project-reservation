const { Router } = require("express");
const router = Router();
const { partnerRegister } = require("../controllers/regisPartnerController");

router.post("/register", partnerRegister);

module.exports = router;
