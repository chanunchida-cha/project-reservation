const { Router } = require("express");
const { updateCustomer } = require("../controllers/customerController");
const router = Router();
const auth = require("../middlewares/auth");

router.put("/profile/update", auth, updateCustomer);

module.exports = router;
