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
const router = Router();

router.route("/createmenu").post(upload, createMenu);
router.route("/updatemenu/:id").put(upload, updateMenu);
router.route("/getmenu").get(getMenu);
router.route("/getmenu/:id").get(getMenuByRest);
router.route("/getmenubyid/:id").get(getMenuById);
router.route("/deletemenu/:id").delete(deleteMenu);

module.exports = router;
