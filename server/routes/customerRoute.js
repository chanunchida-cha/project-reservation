const { Router } = require("express");
const { updateCustomer } = require("../controllers/customerController");
const router = Router();

router.route("/profile/update/:id").put(updateCustomer);
module.exports = router;
