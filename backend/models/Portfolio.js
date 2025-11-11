const mongoose = require("mongoose");

const portfolioSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    projectTitle: { type: String, required: true },
    projectDescription: { type: String, required: true },
    skills: { type: [String], default: [] },
    tools: { type: [String], default: [] },
    projectURL: { type: String },
    imageUrl: { type: String }, // 🆕 store uploaded image path
  },
  { timestamps: true }
);

module.exports = mongoose.model("Portfolio", portfolioSchema);
