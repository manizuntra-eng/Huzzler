import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Otp_service.css"


const OtpScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Data passed from Signup screen:
  const { email, firstName, lastName, password } = location.state || {};

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  // -------------------------
  // Verify OTP
  // -------------------------
  const verifyOtp = async () => {
    if (otp.length !== 6) {
      alert("Please enter a valid 6-digit OTP");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        "https://huzzler.onrender.com/api/auth/verify-otp",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: email,
            otp: otp,
          }),
        }
      );

      const data = await res.json();

      if (res.ok && data.success) {
        const token = data.token;

        // move to next page
        navigate("/client-details", {
          state: {
            token,
            email,
            firstName,
            lastName,
            password,
          },
        });
      } else {
        alert(data.message || "OTP verification failed");
      }
    } catch (err) {
      alert("Error: " + err.message);
    }

    setLoading(false);
  };

  // -------------------------
  // Resend OTP
  // -------------------------
  const resendOtp = async () => {
    try {
      const res = await fetch(
        "https://huzzler.onrender.com/api/auth/send-otp",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      const data = await res.json();
      alert(data.message || "OTP sent again");
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  return (
    <div className="otp-container">
      {/* Logo */}
      <div className="logo-box">
        <img src="/huzzler.png" alt="logo" className="logo" />
      </div>

      {/* Back */}
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <h2>You’re almost there!</h2>
      <p>Please verify the email sent to:</p>
      <strong>{email}</strong>

      {/* OTP Boxes */}
      <input
        className="otp-input"
        maxLength={6}
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        placeholder="Enter 6-digit OTP"
      />

      <button className="verify-btn" onClick={verifyOtp} disabled={loading}>
        {loading ? "Verifying..." : "Verify OTP"}
      </button>

      <p className="resend" onClick={resendOtp}>
        Didn’t receive the code? <span>Resend</span>
      </p>
    </div>
  );
};

export default OtpScreen;
