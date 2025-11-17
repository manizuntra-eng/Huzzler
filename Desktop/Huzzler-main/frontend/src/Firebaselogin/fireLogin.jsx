// src/pages/LoginPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";
import { auth, db } from "../firbase/Firebase";
import "./Firebaselogin.css";

export default function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null);

  const BACKEND_SEND_OTP = "https://huzzler.onrender.com/api/auth/send-otp";

  const showMsg = (text, isError = true) => {
    setMsg({ text, isError });
    setTimeout(() => setMsg(null), 4000);
  };

  // ---------------- Email Login
  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg(null);

    try {
      const normalizedEmail = email.trim().toLowerCase();

      // Firestore query
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("emailLowerCase", "==", normalizedEmail));
      const snap = await getDocs(q);

      if (snap.empty) {
        showMsg(
          <>
            No account found with this email.{" "}
            <button
              onClick={() => navigate("/fireregister")}
              className="link-btn"
            >
              Sign up
            </button>
          </>,
          true
        );
        setLoading(false);
        return;
      }

      const userDoc = snap.docs[0];
      const userData = userDoc.data();
      const uid = userDoc.id;
      const role = userData.role ?? "freelancer";
      const firstName = userData.firstName ?? "";
      const lastName = userData.lastName ?? "";

      // Firebase Auth login
      try {
        await signInWithEmailAndPassword(auth, normalizedEmail, password);
      } catch (err) {
        showMsg("Incorrect password.");
        setLoading(false);
        return;
      }

      // Send OTP
      const res = await axios.post(BACKEND_SEND_OTP, { email: normalizedEmail });

      if (res.status !== 200 || res.data?.success === false) {
        showMsg(res.data?.message || "Failed to send OTP.");
        setLoading(false);
        return;
      }

      showMsg(`OTP sent to ${normalizedEmail}`, false);

      navigate("/login-otp", {
        state: { email: normalizedEmail, uid, role, firstName, lastName },
      });
    } catch (err) {
      console.error(err);
      showMsg(err?.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  // ---------------- Google Login
  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const usersRef = collection(db, "users");
      const q = query(usersRef, where("uid", "==", user.uid));
      const snap = await getDocs(q);

      if (snap.empty) {
        await signOut(auth);
        return showMsg("No account found for this Google user.");
      }

      const role = snap.docs[0].data().role ?? "freelancer";

      if (role === "client") navigate("/client-dashboard/clienthome");
      else navigate("/freelance-dashboard/freelanceHome");
    } catch (err) {
      showMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ---------------- GitHub Login
  const handleGithubLogin = async () => {
    setLoading(true);
    try {
      const provider = new GithubAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const usersRef = collection(db, "users");
      const q = query(usersRef, where("uid", "==", user.uid));
      const snap = await getDocs(q);

      if (snap.empty) {
        await signOut(auth);
        return showMsg("No account found for this GitHub user.");
      }

      const role = snap.docs[0].data().role ?? "freelancer";

      if (role === "client") navigate("/client-dashboard/clienthome");
      else navigate("/freelance-dashboard/freelanceHome");
    } catch (err) {
      showMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page-container">
      <form className="login-box" onSubmit={handleEmailLogin}>
        <img src="/assets/huzzler.png" alt="logo" className="logo" />
        <h2>Log in</h2>

        {msg && (
          <div className={msg.isError ? "msg-error" : "msg-success"}>
            {msg.text}
          </div>
        )}

        <input
          type="email"
          className="login-input"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          className="login-input"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <div className="forgot-row">
          <button
            type="button"
            className="link-btn"
            onClick={() => navigate("/forgot-password")}
          >
            Forgot password?
          </button>
        </div>

        <button type="submit" className="primary-btn" disabled={loading}>
          {loading ? "Processing..." : "Log in"}
        </button>

        <div className="divider">or sign in with</div>

        <div className="social-row">
          <button
            type="button"
            className="icon-btn"
            onClick={handleGoogleLogin}
            disabled={loading}
          >
            Google
          </button>
          <button
            type="button"
            className="icon-btn"
            onClick={handleGithubLogin}
            disabled={loading}
          >
            GitHub
          </button>
        </div>

        <div className="signup-row">
          <span>Don't have an account? </span>
          <button
            type="button"
            className="link-btn"
            onClick={() => navigate("/fireregister")}
          >
            Sign up
          </button>
        </div>
      </form>
    </div>
  );
}
