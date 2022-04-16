const { Router } = require("express");
const router = Router();
const {getAllPartner,getPartnerById} = require("../controllers/adminController")

router.route("/").get(getAllPartner);
router.route("/:id").get(getPartnerById);

module.exports = router;
