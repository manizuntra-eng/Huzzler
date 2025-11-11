
// const User = require("../models/User");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const { sendOTPEmail } = require("../utils/sendEmail");
// const path = require("path");
// const fs = require("fs");

// // ✅ Generate random OTP
// function generateOTP() {
//   return Math.floor(100000 + Math.random() * 900000).toString();
// }

// /* ================================
//    1️⃣ REGISTER + OTP FLOW
// ================================ */
// exports.registerStep1 = async (req, res) => {
//   try {
//     const { firstName, lastName, email, password, role, avatarUrl } = req.body;

//     const existing = await User.findOne({ email });
//     if (existing)
//       return res.status(400).json({ message: "Email already registered" });

//     const hashed = await bcrypt.hash(password, 10);
//     const otpCode = generateOTP();

//     const user = await User.create({
//       firstName,
//       lastName,
//       email,
//       password: hashed,
//       role,
//       avatarUrl,
//       otp: { code: otpCode, expiresAt: new Date(Date.now() + 10 * 60 * 1000) },
//     });

//     await sendOTPEmail(email, otpCode);
//     res.json({ message: "OTP sent", userId: user._id });
//   } catch (err) {
//     console.error("Register error:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// /* ================================
//    2️⃣ RESEND OTP
// ================================ */
// exports.resendOtp = async (req, res) => {
//   try {
//     const { email } = req.body;

//     const user = await User.findOne({ email });
//     if (!user) return res.status(404).json({ message: "User not found" });

//     const otpCode = generateOTP();
//     user.otp = {
//       code: otpCode,
//       expiresAt: new Date(Date.now() + 10 * 60 * 1000),
//     };
//     await user.save();

//     await sendOTPEmail(email, otpCode);
//     res.json({ message: "OTP resent successfully" });
//   } catch (err) {
//     console.error("Resend OTP error:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// /* ================================
//    3️⃣ VERIFY OTP
// ================================ */
// exports.verifyOtp = async (req, res) => {
//   try {
//     const { email, code } = req.body;

//     const user = await User.findOne({ email });
//     if (!user || !user.otp)
//       return res.status(400).json({ message: "Invalid or expired OTP" });

//     if (user.otp.code !== code)
//       return res.status(400).json({ message: "Incorrect OTP" });

//     if (user.otp.expiresAt < new Date())
//       return res.status(400).json({ message: "OTP expired" });

//     user.otp = undefined;
//     await user.save();

//     res.json({ message: "OTP verified successfully" });
//   } catch (err) {
//     console.error("Verify OTP error:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// /* ================================
//    4️⃣ SAVE DETAILS 1
// ================================ */
// exports.saveDetails1 = async (req, res) => {
//   try {
//     const { email, expertise, howHeard, location } = req.body;
//     const user = await User.findOne({ email });
//     if (!user) return res.status(404).json({ message: "User not found" });

//     user.details1 = { expertise, howHeard, location };
//     await user.save();

//     res.json({ message: "Details1 saved successfully" });
//   } catch (err) {
//     console.error("Save Details1 error:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// /* ================================
//    5️⃣ SAVE DETAILS 2 (BuildProfile)
// ================================ */
// exports.saveDetails2 = async (req, res) => {
//   try {
//     const { email, professionalTitle, experienceLevel, currentStatus, about, skills, tools } = req.body;

//     const user = await User.findOne({ email });
//     if (!user) return res.status(404).json({ message: "User not found" });

//     user.details2 = {
//       professionalTitle,
//       experienceLevel,
//       currentStatus,
//       about,
//       skills,
//       tools
//     };

//     await user.save();

//     res.status(200).json({
//       message: "✅ Details2 saved successfully!",
//       user
//     });
//   } catch (err) {
//     console.error("Save Details2 error:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// };


// /* ================================
//    6️⃣ LOGIN
// ================================ */

// // exports.login = async (req, res) => {
// //   try {
// //     const { email, password } = req.body;
// //     const user = await User.findOne({ email });

// //     if (!user) {
// //       return res.status(401).json({ message: "Invalid credentials" });
// //     }

// //     // 🧠 If user signed up via Google (no password)
// //     if (!user.password) {
// //       return res.status(400).json({
// //         message: "This account was created using Google. Please login with Google.",
// //       });
// //     }

// //     // ✅ Check password for normal users
// //     const valid = await bcrypt.compare(password, user.password);
// //     if (!valid) {
// //       return res.status(401).json({ message: "Invalid credentials" });
// //     }

// //     const token = jwt.sign(
// //       { id: user._id, role: user.role },
// //       process.env.JWT_SECRET,
// //       { expiresIn: "7d" }
// //     );

// //     res.json({
// //       token,
// //       user: {
// //         email: user.email,
// //         firstName: user.firstName,
// //         lastName: user.lastName,
// //         role: user.role,
// //         avatarUrl: user.avatarUrl,
// //         details1: user.details1,
// //         details2: user.details2,
// //       },
// //     });
// //   } catch (err) {
// //     console.error("Login error:", err);
// //     res.status(500).json({ message: "Server error" });
// //   }
// // };

// exports.login = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email });
//     if (!user) return res.status(401).json({ message: "Invalid credentials" });

//     const valid = await bcrypt.compare(password, user.password);
//     if (!valid) return res.status(401).json({ message: "Invalid credentials" });

//     const token = jwt.sign(
//       { id: user._id, role: user.role },
//       process.env.JWT_SECRET,
//       { expiresIn: "7d" }
//     );

//     res.json({
//       token,
//       user: {
//         email: user.email,
//         firstName: user.firstName,
//         lastName: user.lastName,
//         role: user.role,
//         avatarUrl: user.avatarUrl,
//         details1: user.details1,
//       },
//     });
//   } catch (err) {
//     console.error("Login error:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// };


// /* ================================
//    7️⃣ UPLOAD AVATAR
// ================================ */
// exports.uploadAvatar = async (req, res) => {
//   try {
//     const email = req.body.email;
//     if (!req.file)
//       return res.status(400).json({ message: "No file uploaded" });

//     const fileUrl = `http://localhost:5000/uploads/${req.file.filename}`;
//     const user = await User.findOneAndUpdate(
//       { email },
//       { avatarUrl: fileUrl },
//       { new: true }
//     );

//     if (!user)
//       return res.status(404).json({ message: "User not found" });

//     res.status(200).json({ url: fileUrl, message: "Avatar updated", user });
//   } catch (err) {
//     console.error("Upload Avatar Error:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// /* ================================
//    8️⃣ FETCH USER BY EMAIL
// ================================ */


// exports.getUserByEmail = async (req, res) => {
//   try {
//     const email = req.params.email;
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }
//     res.status(200).json(user);
//   } catch (err) {
//     console.error("Get user error:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// exports.linkAccounts = async (req, res) => {
//   try {
//     const { existingEmail, password, googleEmail, googleId } = req.body;
//     const user = await User.findOne({ email: existingEmail });
//     if (!user) return res.status(404).json({ message: 'Existing account not found' });

//     const ok = await bcrypt.compare(password, user.password);
//     if (!ok) return res.status(401).json({ message: 'Wrong password' });

//     // attach googleId and update avatar if missing
//     user.googleId = googleId;
//     user.avatarUrl = user.avatarUrl || (await User.findOne({ email: googleEmail }))?.avatarUrl;
//     await user.save();

//     return res.json({ message: 'Accounts linked', user });
//   } catch (err) {
//     console.error('Link accounts error', err);
//     res.status(500).json({ message: 'Server error' });
//   }
// };


const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { sendOTPEmail } = require("../utils/sendEmail");
const path = require("path");
const fs = require("fs");

// ✅ Generate random OTP
function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

/* ================================
   1️⃣ REGISTER + OTP FLOW
================================ */
exports.registerStep1 = async (req, res) => {
  try {
    const { firstName, lastName, email, password, role, avatarUrl } = req.body;

    // 🔍 Check if already registered
    const existing = await User.findOne({ email });
    if (existing)
      return res.status(400).json({ message: "Email already registered" });

    // 🔐 Hash password
    const hashed = await bcrypt.hash(password, 10);
    const otpCode = generateOTP();

    // 🧠 Create new user
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashed,
      role,
      avatarUrl,
      otp: { code: otpCode, expiresAt: new Date(Date.now() + 10 * 60 * 1000) },
    });

    await sendOTPEmail(email, otpCode);
    res.json({ message: "OTP sent successfully", userId: user._id });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/* ================================
   2️⃣ RESEND OTP
================================ */
exports.resendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const otpCode = generateOTP();
    user.otp = {
      code: otpCode,
      expiresAt: new Date(Date.now() + 10 * 60 * 1000),
    };
    await user.save();

    await sendOTPEmail(email, otpCode);
    res.json({ message: "OTP resent successfully" });
  } catch (err) {
    console.error("Resend OTP error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/* ================================
   3️⃣ VERIFY OTP
================================ */
exports.verifyOtp = async (req, res) => {
  try {
    const { email, code } = req.body;

    const user = await User.findOne({ email });
    if (!user || !user.otp)
      return res.status(400).json({ message: "Invalid or expired OTP" });

    if (user.otp.code !== code)
      return res.status(400).json({ message: "Incorrect OTP" });

    if (user.otp.expiresAt < new Date())
      return res.status(400).json({ message: "OTP expired" });

    user.otp = undefined;
    await user.save();

    res.json({ message: "OTP verified successfully" });
  } catch (err) {
    console.error("Verify OTP error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/* ================================
   4️⃣ SAVE DETAILS 1
================================ */
exports.saveDetails1 = async (req, res) => {
  try {
    const { email, expertise, howHeard, location } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    user.details1 = { expertise, howHeard, location };
    await user.save();

    res.json({ message: "Details1 saved successfully" });
  } catch (err) {
    console.error("Save Details1 error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/* ================================
   5️⃣ SAVE DETAILS 2 (BuildProfile)
================================ */
exports.saveDetails2 = async (req, res) => {
  try {
    const { email, professionalTitle, experienceLevel, currentStatus, about, skills, tools } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    user.details2 = {
      professionalTitle,
      experienceLevel,
      currentStatus,
      about,
      skills,
      tools,
    };

    await user.save();

    res.status(200).json({
      message: "✅ Details2 saved successfully!",
      user,
    });
  } catch (err) {
    console.error("Save Details2 error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/* ================================
   6️⃣ LOGIN (Fixed Version)
================================ */
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 🔍 Find user by email
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid email or password" });

    // ⚠️ If user is Google account (no password)
    if (!user.password) {
      return res.status(400).json({
        message: "This account was created using Google. Please login with Google.",
      });
    }

    // 🔐 Compare password using bcrypt
    const valid = await bcrypt.compare(password, user.password);
    if (!valid)
      return res.status(401).json({ message: "Invalid email or password" });

    // 🎟️ Generate JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      token,
      user: {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        avatarUrl: user.avatarUrl,
        details1: user.details1,
        details2: user.details2,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/* ================================
   7️⃣ UPLOAD AVATAR
================================ */
exports.uploadAvatar = async (req, res) => {
  try {
    const email = req.body.email;
    if (!req.file)
      return res.status(400).json({ message: "No file uploaded" });

    const fileUrl = `http://localhost:5000/uploads/${req.file.filename}`;
    const user = await User.findOneAndUpdate(
      { email },
      { avatarUrl: fileUrl },
      { new: true }
    );

    if (!user)
      return res.status(404).json({ message: "User not found" });

    res.status(200).json({ url: fileUrl, message: "Avatar updated", user });
  } catch (err) {
    console.error("Upload Avatar Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/* ================================
   8️⃣ FETCH USER BY EMAIL
================================ */
exports.getUserByEmail = async (req, res) => {
  try {
    const email = req.params.email;
    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (err) {
    console.error("Get user error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/* ================================
   9️⃣ LINK GOOGLE & NORMAL ACCOUNT
================================ */
exports.linkAccounts = async (req, res) => {
  try {
    const { existingEmail, password, googleEmail, googleId } = req.body;
    const user = await User.findOne({ email: existingEmail });
    if (!user) return res.status(404).json({ message: "Existing account not found" });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ message: "Wrong password" });

    // 🔗 Link googleId and update avatar
    user.googleId = googleId;
    const googleUser = await User.findOne({ email: googleEmail });
    if (googleUser && googleUser.avatarUrl) user.avatarUrl = googleUser.avatarUrl;

    await user.save();
    return res.json({ message: "Accounts linked successfully", user });
  } catch (err) {
    console.error("Link accounts error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
