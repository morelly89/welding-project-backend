const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");

const {
  createProjectRequest,
  getProjectRequests,
  deleteProjectRequest,
} = require("../controllers/projectRequestController");

const {
  validateProjectRequest,
  validateRequestId,
} = require("../middlewares/validation");

const router = express.Router();

router.post("/", authMiddleware, validateProjectRequest, createProjectRequest);

router.get("/", authMiddleware, getProjectRequests);

router.delete(
  "/:requestId",
  authMiddleware,
  validateRequestId,
  deleteProjectRequest,
);

module.exports = router;
