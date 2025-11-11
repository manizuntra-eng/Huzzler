const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
  {
    userEmail: { type: String, required: true }, // who created it
    title: String,
    description: String,
    category: String,
    price: Number,
    deliveryDays: Number,
    skills: [String],
    tools: [String],
    requirements: String,
    images: [String], // store URLs
  },
  { timestamps: true }
);

module.exports = mongoose.model("Service", serviceSchema);
