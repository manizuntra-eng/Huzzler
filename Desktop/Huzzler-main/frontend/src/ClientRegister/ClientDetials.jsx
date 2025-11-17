// src/pages/ClientDetails.jsx
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { auth } from "../firbase/Firebase"; // adjust path if needed
import "./client-pages.css";

const teamSizeOptions = [
  "1 (Individual)",
  "2–5 Members",
  "6–10 Members",
  "11–20 Members",
  "21–50 Members",
  "51+ Members",
];

const sectors = [
  "Information Technology",
  "Banking & Finance",
  "Healthcare",
  "Education",
  "Marketing & Advertising",
  "Others",
];

export default function ClientDetails() {
  const navigate = useNavigate();
  const location = useLocation();
  // If route state contains previous signup info (uid, email, firstName, lastName, password)
  const passed = location.state || {};

  const [companyName, setCompanyName] = useState("");
  const [selectedSector, setSelectedSector] = useState("");
  const [selectedTeamSize, setSelectedTeamSize] = useState("");
  const [loading, setLoading] = useState(false);

  const handleContinue = async (e) => {
    e?.preventDefault?.();

    if (!companyName.trim() || !selectedSector || !selectedTeamSize) {
      alert("Please fill all fields before continuing.");
      return;
    }

    setLoading(true);

    try {
      // determine uid from passed state or current auth
      const userUid = passed.uid || (auth.currentUser && auth.currentUser.uid);

      if (!userUid) {
        alert("User not logged in. Please login and try again.");
        setLoading(false);
        return;
      }

      const clientData = {
        uid: passed.uid || userUid,
        email: passed.email || (auth.currentUser && auth.currentUser.email) || "",
        first_name: passed.firstName || "",
        last_name: passed.lastName || "",
        password: passed.password || "",
        company_name: companyName.trim(),
        sector: selectedSector,
        team_size: selectedTeamSize,
        is_individual: selectedTeamSize === "1 (Individual)",
      };

      // Navigate to SiteDetails and pass the clientData
      navigate("/client-dashbroad2/clienthome", { state: { clientData } });
    } catch (err) {
      console.error("Error preparing client data:", err);
      alert("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="client-page">
      <div className="card">
        <div className="header">
          <div className="logo"> {/* replace img if you have */}
            <img src="/assets/huzzler.png" alt="logo" className="logo-img" />
          </div>
          <button className="back-btn" onClick={() => navigate(-1)}>
            ← Back
          </button>
        </div>

        <h2 className="title">Sign up as Client</h2>
        <p className="subtitle">
          We’d like to get to know you better – this will only take a moment.
        </p>

        <form className="form" onSubmit={handleContinue}>
          <label className="label">What is the name of your company?</label>
          <input
            className="input"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder="Company name"
            required
          />

          <label className="label">Tell us about your business</label>
          <select
            className="select"
            value={selectedSector}
            onChange={(e) => setSelectedSector(e.target.value)}
            required
          >
            <option value="">Select sector</option>
            {sectors.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>

          <label className="label">What is your team size?</label>
          <select
            className="select"
            value={selectedTeamSize}
            onChange={(e) => setSelectedTeamSize(e.target.value)}
            required
          >
            <option value="">Select team size</option>
            {teamSizeOptions.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>

          <div className="actions">
            <button type="submit" className="primary" disabled={loading}>
              {loading ? "Please wait…" : "CONTINUE"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
