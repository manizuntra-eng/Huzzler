import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./loginOtp.css";

import { auth, db } from "../firbase/Firebase";
import { signInWithCustomToken } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

export default function LoginOtp() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const email = state?.email;
  const firstName = state?.firstName;
  const lastName = state?.lastName;
  const password = state?.password;

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  // -------------------------------------------------------------
  // 🔥 Verify OTP
  // -------------------------------------------------------------
  const verifyOtp = async () => {
    if (otp.length !== 6) {
      alert("Enter a valid 6-digit OTP");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("https://huzzler.onrender.com/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      const data = await res.json();
      console.log("OTP Response:", data);

      if (res.status === 200 && data.token && data.uid) {
        const token = data.token;

        const userCred = await signInWithCustomToken(auth, token);
        const firebaseUser = userCred.user;

        // Firestore: Check if user exists
        const userRef = doc(db, "users", firebaseUser.uid);
        const snap = await getDoc(userRef);

        if (!snap.exists()) {
          await setDoc(userRef, {
            firstName: firstName,
            lastName: lastName,
            email: email,
            role: "freelancer", // 👈 Change if needed
            created_at: new Date(),
          });
        }

        // Redirect based on role
        const finalUser = await getDoc(userRef);
        const role = finalUser.data().role;

        if (role === "freelancer") {
          navigate("/freelancer-dashboard", {
            state: { uid: firebaseUser.uid, userData: finalUser.data() },
          });
        } else {
          navigate("/client-dashboard", {
            state: { uid: firebaseUser.uid, userData: finalUser.data() },
          });
        }
      } else {
        alert(data.message || "OTP verification failed");
      }
    } catch (err) {
      alert("Error: " + err.message);
    }

    setLoading(false);
  };

  // -------------------------------------------------------------
  // 🔥 Resend OTP
  // -------------------------------------------------------------
  const resendOtp = async () => {
    try {
      const res = await fetch("https://huzzler.onrender.com/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      alert(data.message || "OTP Resent");
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  return (
    <div className="otp-wrapper">

      {/* Logo */}
      <div className="otp-logo-box">
        <img src="/assets/huzzler.png" alt="logo" className="otp-logo-img" />
      </div>

      {/* Back Button */}
      <button className="otp-back-btn" onClick={() => navigate(-1)}>
        ← BACK
      </button>

      <h2 className="otp-title">Please Verify Your Email</h2>
      <p className="otp-email">{email}</p>

      {/* OTP Boxes */}
      <div className="otp-inputs">
        <input
          type="text"
          maxLength={6}
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
      </div>

      <p className="otp-resend" onClick={resendOtp}>
        Didn’t receive code? <span>Resend OTP</span>
      </p>

      {/* Verify Button */}
      <button className="otp-btn" disabled={loading} onClick={verifyOtp}>
        {loading ? "Verifying..." : "Get Started"}
      </button>
    </div>
  );
}
