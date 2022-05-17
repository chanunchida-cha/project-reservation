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

router.route("/create-info").post(upload, createInfoRestaurant);
router.route("/update-info/:id").put(upload, updateInfoRestaurant);
router.route("/delete-info/:id").delete(deleteInfoRestaurant);
router.route("/get-all-info").get(getInfoRestaurant);
router.route("/get-all-info/:id").get(getInfoRestaurantById);

module.exports = router;
