const { Router } = require("express");
const {
  createTable,
  getTableByRest,
  updateTable,
  deleteTable,
  getTable,
  getTableById,
} = require("../controllers/tableController");
const router = Router();

router.route("/createtable").post(createTable);
router.route("/gettable").get(getTable);
router.route("/gettable/:id").get(getTableByRest);
router.route("/updatetable/:id").put(updateTable);
router.route("/deletetable/:id").delete(deleteTable);
router.route("/gettablebyid/:id").get(getTableById);

module.exports = router;
