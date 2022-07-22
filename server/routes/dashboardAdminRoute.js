const { Router } = require("express");
const {
  countCustomer,
  countPartnerVerification,
  countPartnerApprove,
  countPartnerDisApprove,
  groupPartnerByType,
  countPartner,
  countRestInfo,
  groupPartnerByTypeAllDay,
  groupPartnerByTypeRound,
  countAdmin,
  groupReservByPartnerForDay,
  groupReservByPartnerForMonth,
  groupReservByPartnerForWeek,
  groupReservByPartnerForYear,
} = require("../controllers/dashboardAdminController");
const router = Router();

router.route("/get-count-customer").get(countCustomer);
router.route("/get-count-partner").get(countPartner);
router.route("/get-count-admin").get(countAdmin);
router.route("/get-count-rest-info").get(countRestInfo);
router.route("/get-count-partner-verification").get(countPartnerVerification);
router.route("/get-count-partner-approve").get(countPartnerApprove);
router.route("/get-count-partner-disapprove").get(countPartnerDisApprove);
router
  .route("/get-count-partner-group-type-allday")
  .get(groupPartnerByTypeAllDay);
router
  .route("/get-count-partner-group-type-round")
  .get(groupPartnerByTypeRound);
router
  .route("/get-count-group-partner-for-week")
  .get(groupReservByPartnerForWeek);
router
  .route("/get-count-group-partner-for-month")
  .get(groupReservByPartnerForMonth);
router
  .route("/get-count-group-partner-for-year")
  .get(groupReservByPartnerForYear);

module.exports = router;
