const { Router } = require("express");
const router = Router();
const {partnerLogin , getPartner} =require("../controllers/partnerAuthController");
const partnerAuth = require("../middlewares/partnerAuth")

router.post("/partnerlogin",partnerLogin)
router.get("/getpartner",partnerAuth,getPartner)

module.exports = router