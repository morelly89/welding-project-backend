const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const upload = require("../middlewares/uploadMiddleware");

const {
  signup,
  login,
  getCurrentUser,
  updateCurrentUser,
  updateProfileImage,
} = require("../controllers/authController");

const {
  validateSignup,
  validateLogin,
  validateUpdateCurrentUser,
} = require("../middlewares/validation");

const router = express.Router();

router.post("/signup", validateSignup, signup);

router.post("/login", validateLogin, login);

router.get("/me", authMiddleware, getCurrentUser);

router.patch(
  "/me",
  authMiddleware,
  validateUpdateCurrentUser,
  updateCurrentUser,
);

router.patch(
  "/me/photo",
  authMiddleware,
  upload.single("profileImage"),
  updateProfileImage,
);

module.exports = router;
