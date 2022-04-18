const { Router } = require("express");
const router = Router();
const {
  getPartnerVerify,
  getPartnerById,
  updateStatusPartner,
  getPartnerApprove,
} = require("../controllers/adminController");

router.route("/verify").get(getPartnerVerify);
router.route("/approve").get(getPartnerApprove);
router.route("/verify/:id").get(getPartnerById);
router.route("/updatestatus/:id").put(updateStatusPartner);

module.exports = router;
