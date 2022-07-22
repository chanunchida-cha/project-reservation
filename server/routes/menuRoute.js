const { Router } = require("express");
const {
  createMenu,
  updateMenu,
  getMenu,
  deleteMenu,
  getMenuByRest,
  getMenuById,
} = require("../controllers/menuController");
const upload = require("../middlewares/upload");
const partnerAuth = require("../middlewares/partnerAuth");
const router = Router();

router.route("/create-menu").post(upload, createMenu);
router.route("/update-menu/:id").put(upload, partnerAuth, updateMenu);
router.route("/get-menu").get(getMenu);
router.route("/get-menu/:id").get(getMenuByRest);
router.route("/get-menu-by-id/:id").get(getMenuById);
router.route("/delete-menu/:id").delete(deleteMenu);

module.exports = router;
