const { Router } = require("express");
const {
  createInfoRestaurant,
  updateInfoRestaurant,
  deleteInfoRestaurant,
  getInfoRestaurant,
} = require("../controllers/restaurantController");
const router = Router();

router.route("/createinfo").post(createInfoRestaurant);
router.route("/updateinfo/:id").put(updateInfoRestaurant);
router.route("/deleteinfo/:id").delete(deleteInfoRestaurant);
router.route("/getallinfo").get(getInfoRestaurant)

module.exports = router;
