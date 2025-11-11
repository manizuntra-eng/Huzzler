
// const mongoose = require("mongoose");

// const otpSchema = new mongoose.Schema(
//   {
//     code: String,
//     expiresAt: Date,
//   },
//   { _id: false }
// );

// const userSchema = new mongoose.Schema(
//   {
//     firstName: String,
//     lastName: String,
//     email: { type: String, unique: true, required: true },
//     password: String,
//     role: {
//       type: String,
//       enum: ["client", "freelancer"],
//       default: "freelancer",
//     },
//     avatarUrl: String,

//     otp: otpSchema,

//     // ✅ Details1 (from earlier step)
//     details1: {
//       expertise: [String],
//       howHeard: [String],
//       location: String,
//     },

//     // ✅ Expanded Details2 (for Build Profile)
//     details2: {
//       professionalTitle: String,
//       about: String,            // new field for profile description
//       experienceLevel: String,  // optional, can keep if needed
//       currentStatus: String,    // optional, can keep if needed
//       skills: [String],         // ✅ new
//       tools: [String],          // ✅ new
//     },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("User", userSchema);

const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
  code: String,
  expiresAt: Date
}, { _id: false });

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true, required: true },
  password: String,
  role: { type: String, enum: ['client', 'freelancer'], default: 'freelancer' },
  avatarUrl: String,
  otp: otpSchema,
  details1: {
    expertise: [String],
    howHeard: [String],
    location: String
  },
  details2: {
    professionalTitle: String,
    experienceLevel: String,
    currentStatus: String,
    about: String,
    skills: [String],
    tools: [String]
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
