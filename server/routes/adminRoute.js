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
  createPartner,
  deletePartner,
  editPartner,
  getPartner,
  createAdmin,
  getAdmins,
  editAdmin,
  getAdminById,
  deleteAdmin,
} = require("../controllers/adminController");
router.route("/all-partner").get(getPartner);
router.route("/verify").get(getPartnerVerify);
router.route("/customers-data").get(getUsers);
router.route("/customers-data/:id").get(getUserById);
router.route("/approve").get(getPartnerApprove);
router.route("/disapprove").get(getPartnerDisApprove);
router.route("/verify/:id").get(getPartnerById);
router.route("/update-status/:id").put(updateStatusPartner);
router.route("/create-customer").post(createCustomer);
router.route("/delete-customer/:id").delete(deleteCustomer);
router.route("/edit-customer/:id").put(editCustomer);
router.route("/create-partner").post(createPartner);
router.route("/delete-partner/:id").delete(deletePartner);
router.route("/edit-partner/:id").put(editPartner);
router.route("/admins-data").get(getAdmins);
router.route("/admins-data/:id").get(getAdminById);
router.route("/create-admin").post(createAdmin);
router.route("/edit-admin/:id").put(editAdmin);
router.route("/delete-admin/:id").delete(deleteAdmin);

module.exports = router;
