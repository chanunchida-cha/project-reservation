const { Router } = require("express");
const {
  customerAllDayReserv,
  selfRoundReserv,
  selfAllDayReserv,
  customerRoundReserv,
  getAllDayReserv,
  getAllDayReservToday,
  getAllDayReservByID,
  getRoundReserv,
  getRoundReservToday,
  getRoundReservByID,
  updateSelfAllDayReserv,
  updateCustomerAllDayReserv,
  updateSelfRoundReserv,
  updateCustomerRoundReserv,
  allDayDelete,
  roundDelete,
  updateStatusAllDay,
  updateStatusRound,
  getRoundReservByCustomerPending,
  getAlldayReservByCustomerPending,
  getRoundReservByCustomerArrived,
  getAlldayReservByCustomerArrived,
  getRoundReservByCustomerHistory,
  getAlldayReservByCustomerHistory,
} = require("../controllers/reservController");
const partnerAuth = require("../middlewares/partnerAuth");
const router = Router();

router.route("/customer/round-reserv").post(customerRoundReserv);
router.route("/customer/all-day-reserv").post(customerAllDayReserv);
router.route("/partner/round-reserv").post(selfRoundReserv);
router.route("/partner/all-day-reserv").post(selfAllDayReserv);
router.route("/get-all-day-reserv/:id").get(getAllDayReserv);
router.route("/get-all-day-reserv-today/:id").get(getAllDayReservToday);
router.route("/get-all-day-reserv-by-id/:id").get(getAllDayReservByID);
router.route("/get-round-reserv/:id").get(getRoundReserv);
router.route("/get-round-reserv-today/:id").get(getRoundReservToday);
router.route("/get-round-reserv-by-id/:id").get(getRoundReservByID);
router
  .route("/partner/update-self-all-day-reserv/:id")
  .put(updateSelfAllDayReserv);
router
  .route("/partner/update-customer-all-day-reserv/:id")
  .put(updateCustomerAllDayReserv);
router
  .route("/partner/update-self-round-day-reserv/:id")
  .put(updateSelfRoundReserv);

router
  .route("/partner/update-customer-round-day-reserv/:id")
  .put( updateCustomerRoundReserv);

router.route("/partner/delete-all-day-reserv/:id").delete(allDayDelete);
router.route("/partner/delete-round-reserv/:id").delete(roundDelete);

router
  .route("/partner/update-status-all-day-reserv/:id")
  .put(updateStatusAllDay);
router.route("/partner/update-status-round-reserv/:id").put(updateStatusRound);

router
  .route("/customer/get-round-reserv-pending/:id")
  .get(getRoundReservByCustomerPending);
router
  .route("/customer/get-all-day-reserv-pending/:id")
  .get(getAlldayReservByCustomerPending);
router
  .route("/customer/get-round-reserv-arrived/:id")
  .get(getRoundReservByCustomerArrived);
router
  .route("/customer/get-all-day-reserv-arrived/:id")
  .get(getAlldayReservByCustomerArrived);
router
  .route("/customer/get-round-reserv-history/:id")
  .get(getRoundReservByCustomerHistory);
router
  .route("/customer/get-all-day-reserv-history/:id")
  .get(getAlldayReservByCustomerHistory);

module.exports = router;
