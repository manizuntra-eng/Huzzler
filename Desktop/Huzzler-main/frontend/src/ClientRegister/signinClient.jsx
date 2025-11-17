// src/pages/SignUpClient.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { db } from "../firbase/Firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import "./signup-client.css";

const SEND_OTP = "https://huzzler.onrender.com/api/auth/send-otp";

export default function SignUpClient() {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => setShowPassword(!showPassword);

  const show = (msg) => alert(msg);

  const handleSendOtp = async () => {
    if (!firstName || !lastName || !email || !password) {
      return show("All fields are required");
    }

    if (!email.includes("@")) {
      return show("Please enter a valid email");
    }

    if (password.length < 6) {
      return show("Password must be at least 6 characters");
    }

    setLoading(true);

    try {
      // ✅ Firestore duplicate check
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("email", "==", email.toLowerCase()));
      const snap = await getDocs(q);

      if (!snap.empty) {
        const role = snap.docs[0].data().role ?? "";
        if (role === "freelancer") {
          setLoading(false);
          return show("This email is already registered as a Freelancer. Please use another email.");
        }
        setLoading(false);
        return show("Email already registered. Please log in.");
      }

      // ✅ Request OTP
      const res = await axios.post(SEND_OTP, { email: email.toLowerCase() });
      const data = res.data;

      if (res.status === 200 && data.success) {
        navigate("/otp", { state: { email, firstName, lastName, password } });
      } else {
        show(data.message || "Failed to send OTP");
      }
    } catch (err) {
      console.error(err);
      show(err?.response?.data?.message || err.message || "Error sending OTP");
    }

    setLoading(false);
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        {/* Logo */}
        <div className="logo">
          <img src="/assets/huzzler.png" alt="Huzzler" />
        </div>

        {/* Title */}
        <h2>Sign up as Client</h2>
        <p className="subtitle">“Ready to Make Things Happen”</p>

        {/* Input Fields */}
        <input
          type="text"
          placeholder="First name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="signup-input"
        />
        <input
          type="text"
          placeholder="Last name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="signup-input"
        />
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="signup-input"
        />
        <div className="password-wrapper">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="signup-input"
          />
          <button type="button" onClick={togglePassword} className="toggle-btn">
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        {/* Get OTP Button */}
        <button className="otp-btn" onClick={handleSendOtp} disabled={loading}>
          {loading ? "Sending..." : "Get OTP"}
        </button>

        {/* Already have account */}
        <p className="login-link">
          Already have an account?{" "}
          <span onClick={() => navigate("/firelogin")}>Log in</span>
        </p>
      </div>
    </div>
  );
}
