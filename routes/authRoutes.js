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

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/me", authMiddleware, getCurrentUser);
router.patch("/me", authMiddleware, updateCurrentUser);
router.patch(
  "/me/photo",
  authMiddleware,
  upload.single("profileImage"),
  updateProfileImage,
);

module.exports = router;
