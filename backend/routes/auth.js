const express = require("express");
const multer = require("multer");
const path = require("path");
const router = express.Router();

const {
  registerStep1,
  resendOtp,
  verifyOtp,
  saveDetails1,
  saveDetails2,
  login,
  uploadAvatar,
  getUserByEmail
} = require("../controllers/authController");



// ✅ Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, `${Date.now()}${path.extname(file.originalname)}`)
});
const upload = multer({ storage });

// ✅ Routes
router.post("/register", registerStep1);
router.post("/resend-otp", resendOtp);
router.post("/verify-otp", verifyOtp);
router.post("/login", login);
router.post("/details1", saveDetails1);
router.post("/save-details2", saveDetails2);
router.post("/upload-avatar", upload.single("avatar"), uploadAvatar);
router.get("/user/:email", getUserByEmail);
router.get('/test', (req, res) => {
  console.log("✅ /api/auth/test endpoint hit!");
  res.json({ message: "Backend connected successfully 🔥" });
});




module.exports = router;
