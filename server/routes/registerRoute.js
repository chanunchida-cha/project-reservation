const { Router } = require("express");
const router = Router();
const {register} = require("../controllers/registerController")

router.post("/register",register)

module.exports = router;
