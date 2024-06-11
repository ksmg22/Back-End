const express = require("express");
const router = express.Router();
const groupController = require("../../controllers/grupos.controller");

router.get("/", groupController.getAllGroupsUser);
router.get("/:id", groupController.getGroupById);
router.post("/", groupController.createGroup);
router.put("/:id", groupController.updateGroup);
router.delete("/:id", groupController.deleteGroup);

module.exports = router;
