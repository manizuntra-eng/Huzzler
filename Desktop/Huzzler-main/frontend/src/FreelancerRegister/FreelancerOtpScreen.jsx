// src/pages/FreelancerOtp.jsx
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { auth } from "../firbase/Firebase";
import { signInWithCustomToken } from "firebase/auth";
import "./FreelancerOtp.css";

const VERIFY_OTP = "https://huzzler.onrender.com/api/auth/verify-otp";
const RESEND_OTP = "https://huzzler.onrender.com/api/auth/send-otp";

export default function FreelancerOtp() {
  const location = useLocation();
  const navigate = useNavigate();

  const { email, firstName, lastName, password } = location.state || {};
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  if (!email) {
    return <div className="no-session">No login session found. Please login again.</div>;
  }

  const show = (msg) => alert(msg);

  // ✅ Verify OTP
  const handleVerify = async (e) => {
    e.preventDefault();

    if (otp.length !== 6) {
      return show("Please enter a valid 6-digit OTP");
    }

    setLoading(true);

    try {
      const res = await axios.post(VERIFY_OTP, {
        email,
        otp,
        password,
      });

      const data = res.data;

      if (res.status === 200 && data.token) {
        // Firebase sign-in with custom token
        await signInWithCustomToken(auth, data.token);

        show("OTP verified successfully!");

        // Redirect to Freelancer Details page
        navigate("/freelancer-details", { state: { uid: auth.currentUser.uid, firstName, lastName, email } });
      } else {
        show(data.message || "OTP verification failed");
      }
    } catch (err) {
      console.error("OTP verify error:", err);
      show(err?.response?.data?.message || err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Resend OTP
  const handleResend = async () => {
    try {
      const res = await axios.post(RESEND_OTP, { email });
      show(res.data.message || "OTP resent successfully");
    } catch (err) {
      console.error("Resend OTP error:", err);
      show(err?.response?.data?.message || err.message || "Error resending OTP");
    }
  };

  return (
    <div className="otp-container">
      <form className="otp-box" onSubmit={handleVerify}>
        <h2>Verify Your Email</h2>
        <p>An OTP was sent to <strong>{email}</strong></p>

        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          maxLength={6}
          placeholder="Enter OTP"
          className="otp-input"
          required
        />

        <button type="submit" className="otp-btn" disabled={loading}>
          {loading ? "Verifying..." : "Verify OTP"}
        </button>

        <button type="button" className="resend-btn" onClick={handleResend}>
          Didn’t receive OTP? Resend OTP
        </button>

        <button type="button" className="back-btn" onClick={() => navigate(-1)}>
          Back
        </button>
      </form>
    </div>
  );
}
