const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  createProjectRequest,
  getProjectRequests,
  deleteProjectRequest,
} = require("../controllers/projectRequestController");

const router = express.Router();

router.post("/", authMiddleware, createProjectRequest);
router.get("/", authMiddleware, getProjectRequests);
router.delete("/:requestId", authMiddleware, deleteProjectRequest);

module.exports = router;
