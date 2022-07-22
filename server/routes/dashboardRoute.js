const { Router } = require("express");
const {
  countAlldayReservByPartner,
  countRoundReservByPartner,
  getAlldayReservPerWeek,
  countAlldayReservTodayByPartner,
  getAlldayReservPerMonth,
  getAlldayReservPerDay,
  getAlldayReservPerYear,
  getAlldayReservNextWeek,
  getAlldayReservPending,
  getAlldayReservLastWeek,
  getAlldayReservArrived,
  getAlldayReservCheckOut,

  getAlldayReservCancel,
  countRoundReservTodayByPartner,
  getRoundReservPerDay,
  getRoundReservPerWeek,
  getRoundReservNextWeek,
  getRoundReservLastWeek,
  getRoundReservPerMonth,
  getRoundReservPerYear,
  getRoundReservPending,
  getRoundReservArrived,
  getRoundReservCheckOut,
  getRoundReservCancel,
} = require("../controllers/dashboardController");
const router = Router();

router.route("/get-count-allday-reserv/:id").get(countAlldayReservByPartner);
router
  .route("/get-count-allday-reserv-today/:id")
  .get(countAlldayReservTodayByPartner);

router.route("/get-count-allday-reserv-for-day/:id").get(getAlldayReservPerDay);
router
  .route("/get-count-allday-reserv-for-week/:id")
  .get(getAlldayReservPerWeek);
router
  .route("/get-count-allday-reserv-for-next-week/:id")
  .get(getAlldayReservNextWeek);
router
  .route("/get-count-allday-reserv-for-last-week/:id")
  .get(getAlldayReservLastWeek);

router
  .route("/get-count-allday-reserv-for-month/:id")
  .get(getAlldayReservPerMonth);
router
  .route("/get-count-allday-reserv-for-year/:id")
  .get(getAlldayReservPerYear);
router
  .route("/get-count-allday-reserv-pending/:id")
  .get(getAlldayReservPending);
router
  .route("/get-count-allday-reserv-arrived/:id")
  .get(getAlldayReservArrived);
router
  .route("/get-count-allday-reserv-checkout/:id")
  .get(getAlldayReservCheckOut);
router.route("/get-count-allday-reserv-cancel/:id").get(getAlldayReservCancel);
//---------------round-----------------------------------------------

router.route("/get-count-round-reserv/:id").get(countRoundReservByPartner);
router
  .route("/get-count-round-reserv-today/:id")
  .get(countRoundReservTodayByPartner);
router.route("/get-count-round-reserv-for-day/:id").get(getRoundReservPerDay);
router.route("/get-count-round-reserv-for-week/:id").get(getRoundReservPerWeek);
router
  .route("/get-count-round-reserv-for-next-week/:id")
  .get(getRoundReservNextWeek);
router
  .route("/get-count-round-reserv-for-last-week/:id")
  .get(getRoundReservLastWeek);

router
  .route("/get-count-round-reserv-for-month/:id")
  .get(getRoundReservPerMonth);
router.route("/get-count-round-reserv-for-year/:id").get(getRoundReservPerYear);
router.route("/get-count-round-reserv-pending/:id").get(getRoundReservPending);
router.route("/get-count-round-reserv-arrived/:id").get(getRoundReservArrived);
router
  .route("/get-count-round-reserv-checkout/:id")
  .get(getRoundReservCheckOut);
router.route("/get-count-round-reserv-cancel/:id").get(getRoundReservCancel);
module.exports = router;
