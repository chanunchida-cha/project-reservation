const { Router } = require("express");
const {
  customerAllDayReserv,
  selfRoundReserv,
  selfAllDayReserv,
  customerRoundReserv,
} = require("../controllers/reservController");
const router = Router();

router.route("/customer/round-reserv").post(customerRoundReserv);
router.route("/customer/all-day-reserv").post(customerAllDayReserv);
router.route("/partner/round-reserv").post(selfRoundReserv);
router.route("/partner/all-day-reserv").post(selfAllDayReserv);

module.exports = router;
