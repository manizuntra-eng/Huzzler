// src/pages/ProfessionalStatus.jsx
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { db, auth } from "../firbase/Firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import "./ProfessionalStatus.css";

export default function ProfessionalStatus() {
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state || {};

  const [professionalTitle, setProfessionalTitle] = useState("");
  const [experience, setExperience] = useState("");
  const [status, setStatus] = useState("Professional");

  const experienceOptions = ["Beginner", "Intermediate", "Expert"];

  const handleSave = async () => {
    if (!professionalTitle.trim()) return alert("Please enter your professional title.");
    if (!experience) return alert("Please select your experience level.");

    const userId = auth.currentUser?.uid;
    if (!userId) return alert("User not logged in.");

    const payload = {
      expertise: data.expertise,
      location: data.location,
      referral: data.referral,
      linkedin: data.linkedin,
      professional_title: professionalTitle,
      experience_level: experience,
      current_status: status,
      role: "freelancer",
      profileCompleted: true,
      updated_at: serverTimestamp(),
    };

    try {
      await setDoc(doc(db, "users", userId), payload, { merge: true });
      navigate("/freelance-dashboard/freelanceHome");
    } catch (err) {
      console.error(err);
      alert("Failed to save. Please try again.");
    }
  };

  return (
    <div className="pro-container">
      <div className="pro-card">
        <img src="/assets/huzzler.png" alt="logo" className="logo" />

        <h2>Sign up as Freelancer</h2>
        <p className="subtitle">Please complete the following step.</p>

        <label>Professional Title</label>
        <input
          className="input"
          placeholder="Eg. Senior UI/UX Designer"
          value={professionalTitle}
          onChange={(e) => setProfessionalTitle(e.target.value)}
        />

        <label>Level of Experience</label>
        <select
          className="input"
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
        >
          <option value="">Select experience</option>
          {experienceOptions.map((level) => (
            <option key={level} value={level}>
              {level}
            </option>
          ))}
        </select>

        <p className="status-box">What's Your Current Status?</p>
        <div className="status-row">
          <button
            className={status === "Professional" ? "selected" : ""}
            onClick={() => setStatus("Professional")}
          >
            Professional
          </button>
          <button
            className={status === "Student" ? "selected" : ""}
            onClick={() => setStatus("Student")}
          >
            Student
          </button>
        </div>

        <button className="yellow-btn" onClick={handleSave}>
          Continue
        </button>
      </div>
    </div>
  );
}
