const { Router } = require("express");
const router = Router();
const {
  getPartnerVerify,
  getPartnerById,
  updateStatusPartner,
  getPartnerApprove,
  getPartnerDisApprove,
  getUsers,
  getUserById,
  createCustomer,
  deleteCustomer,
  editCustomer,
} = require("../controllers/adminController");

router.route("/verify").get(getPartnerVerify);
router.route("/customersdata").get(getUsers);
router.route("/customersdata/:id").get(getUserById);
router.route("/approve").get(getPartnerApprove);
router.route("/disapprove").get(getPartnerDisApprove);
router.route("/verify/:id").get(getPartnerById);
router.route("/updatestatus/:id").put(updateStatusPartner);
router.route("/createcustomer").post(createCustomer);
router.route("/deletecustomer/:id").delete(deleteCustomer);
router.route("/editcustomer/:id").put(editCustomer);

module.exports = router;
