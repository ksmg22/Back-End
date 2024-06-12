const express = require("express");
const router = express.Router();
const groupController = require("../../controllers/grupos.controller");

router.post("/", groupController.createGroupHandler);
router.get("/", groupController.getAllGroupsHandler);
router.get("/:id", groupController.getGroupByIdHandler);
router.put("/:id", groupController.updateGroupHandler);
router.delete("/:id", groupController.deleteGroupHandler);

module.exports = router;
