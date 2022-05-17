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

router.route("/create-table").post(createTable);
router.route("/get-table").get(getTable);
router.route("/get-table/:id").get(getTableByRest);
router.route("/update-table/:id").put(updateTable);
router.route("/delete-table/:id").delete(deleteTable);
router.route("/get-table-by-id/:id").get(getTableById);

module.exports = router;
