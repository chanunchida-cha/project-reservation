const { Router } = require("express");
const {
  createInfoRestaurant,
  updateInfoRestaurant,
  deleteInfoRestaurant,
  getInfoRestaurant,
  getInfoRestaurantById,
} = require("../controllers/restaurantController");
const upload = require("../middlewares/upload");
const router = Router();

router.route("/createinfo").post(upload, createInfoRestaurant);
router.route("/updateinfo/:id").put(upload, updateInfoRestaurant);
router.route("/deleteinfo/:id").delete(deleteInfoRestaurant);
router.route("/getallinfo").get(getInfoRestaurant);
router.route("/getallinfo/:id").get(getInfoRestaurantById);

module.exports = router;
