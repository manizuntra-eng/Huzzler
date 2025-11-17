// src/pages/FreelancerDetails.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./FreelancerDetails.css";

export default function FreelancerDetails() {
  const navigate = useNavigate();

  const expertiseOptions = [
    "Graphics & Design",
    "Programming & Tech",
    "Digital Marketing",
    "Writing & Translation",
    "Video & Animation",
    "Music & Audio",
    "AI Services",
    "Data",
    "Business",
    "Finance",
    "Photography",
    "Lifestyle",
    "Consulting",
    "Personal Growth & Hobbies",
  ];

  const referralOptions = ["LinkedIn", "Facebook", "X", "Instagram", "Other"];

  const [expertise, setExpertise] = useState("");
  const [locationText, setLocationText] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [referral, setReferral] = useState("");

  const handleNext = () => {
    if (!expertise) return alert("Please select your expertise.");
    if (!locationText.trim()) return alert("Please enter your location.");
    if (!linkedin.trim()) return alert("Enter a valid LinkedIn URL.");
    if (!referral) return alert("Please select how you heard about us.");

    navigate("/professional-status", {
      state: {
        expertise,
        location: locationText.trim(),
        referral,
        linkedin: linkedin.trim(),
      },
    });
  };

  return (
    <div className="freelancer-container">
      <div className="freelancer-card">
        <img src="/assets/huzzler.png" alt="logo" className="logo" />

        <h2>Sign up as Freelancer</h2>
        <p className="subtitle">
          We’d like to get to know you better – this will only take a moment.
        </p>

        {/* Expertise */}
        <label>What is your expertise?</label>
        <select
          value={expertise}
          onChange={(e) => setExpertise(e.target.value)}
          className="input"
        >
          <option value="">Select...</option>
          {expertiseOptions.map((e) => (
            <option key={e} value={e}>
              {e}
            </option>
          ))}
        </select>

        {/* Location */}
        <label>Where are you located?</label>
        <input
          type="text"
          placeholder="Eg. Chennai, India"
          value={locationText}
          onChange={(e) => setLocationText(e.target.value)}
          className="input"
        />

        {/* LinkedIn */}
        <label>LinkedIn Profile</label>
        <input
          type="text"
          placeholder="https://www.linkedin.com/in/username"
          value={linkedin}
          onChange={(e) => setLinkedin(e.target.value)}
          className="input"
        />

        {/* Referral */}
        <label>How did you hear about us?</label>
        <select
          value={referral}
          onChange={(e) => setReferral(e.target.value)}
          className="input"
        >
          <option value="">Select...</option>
          {referralOptions.map((e) => (
            <option key={e} value={e}>
              {e}
            </option>
          ))}
        </select>

        <button className="yellow-btn" onClick={handleNext}>
          Continue
        </button>
      </div>
    </div>
  );
}
