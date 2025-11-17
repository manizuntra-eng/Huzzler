// src/pages/FreelancerSignup.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firbase/Firebase";
import {
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { doc, setDoc, serverTimestamp, query, where, getDocs, collection } from "firebase/firestore";

export default function FreelancerSignup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const BACKEND_SEND_OTP = "https://huzzler.onrender.com/api/auth/send-otp";

  const showToast = (text) => {
    alert(text); // replace with Toast UI if you have one
  };

  // Helper: check existing user in Firestore by email
  const checkExisting = async (emailToCheck) => {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("email", "==", emailToCheck));
    const snap = await getDocs(q);
    if (snap.empty) return null;
    return { id: snap.docs[0].id, data: snap.docs[0].data() };
  };

  // Click "Get OTP"
  const handleGetOtp = async (e) => {
    e?.preventDefault?.();
    setIsLoading(true);

    try {
      const normalized = email.trim().toLowerCase();

      if (!firstName || !lastName || !normalized || !password) {
        showToast("Please fill all fields");
        setIsLoading(false);
        return;
      }

      if (password.length < 6) {
        showToast("Password must be at least 6 characters");
        setIsLoading(false);
        return;
      }

      // 1) check Firestore for existing user/email
      const existing = await checkExisting(normalized);
      if (existing) {
        const role = existing.data.role || "";
        const provider = existing.data.authProvider || "";
        setIsLoading(false);

        if (provider === "google.com") {
          showToast("This email is registered with Google. Please sign in with Google.");
          return;
        }

        if (role === "freelancer") {
          showToast("This email is already registered as a Freelancer. Please log in.");
          return;
        }

        if (role === "client") {
          showToast("This email is already registered as a Client. Use another email.");
          return;
        }

        showToast("Email already exists. Please log in.");
        return;
      }

      // 2) send OTP via backend
      const res = await axios.post(BACKEND_SEND_OTP, { email: normalized });

      if (res.status === 200 && res.data?.success !== false) {
        showToast(`OTP sent to ${normalized}`);
        // navigate to OTP page with state (similar to Flutter)
        navigate("/freelancer-otp", {
          state: {
            email: normalized,
            firstName,
            lastName,
            password,
          },
        });
      } else {
        showToast(res.data?.message || "Failed to send OTP");
      }
    } catch (err) {
      console.error("Get OTP error:", err);
      showToast(err?.response?.data?.message || err.message || "Network error");
    } finally {
      setIsLoading(false);
    }
  };

  // Google sign-up
  const handleGoogle = async () => {
    setIsLoading(true);
    try {
      // force sign-out so user sees account chooser
      await signOut(auth);
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      if (!user || !user.email) {
        showToast("Google sign in failed");
        setIsLoading(false);
        return;
      }

      const normalized = user.email.toLowerCase();

      // Check if already exists in Firestore
      const existing = await checkExisting(normalized);
      if (existing) {
        const role = existing.data.role || "";
        await signOut(auth);
        if (role === "freelancer") showToast("Already registered as Freelancer. Please log in.");
        else if (role === "client") showToast("Email already used for Client.");
        else showToast("Email already registered. Please log in.");
        setIsLoading(false);
        return;
      }

      // Save Firestore doc (merge avoids overwriting)
      await setDoc(
        doc(db, "users", user.uid),
        {
          uid: user.uid,
          firstName: user.displayName?.split(" ")?.[0] || "",
          lastName: user.displayName ? user.displayName.split(" ").slice(1).join(" ") : "",
          email: normalized,
          role: "freelancer",
          authProvider: "google.com",
          createdAt: serverTimestamp(),
        },
        { merge: true }
      );

      showToast("Google sign up successful!");
      navigate("/freelancer-details", { state: { uid: user.uid, firstName: user.displayName?.split(" ")?.[0] || "", lastName: user.displayName?.split(" ").slice(1).join(" ") || "", email: normalized }});
    } catch (err) {
      console.error("Google signup:", err);
      showToast(err?.message || "Google signup failed");
    } finally {
      setIsLoading(false);
    }
  };

  // GitHub sign-up
  const handleGitHub = async () => {
    setIsLoading(true);
    try {
      await signOut(auth);
      const provider = new GithubAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      if (!user || !user.email) {
        showToast("GitHub sign up failed");
        setIsLoading(false);
        return;
      }
      const normalized = user.email.toLowerCase();

      const existing = await checkExisting(normalized);
      if (existing) {
        await signOut(auth);
        showToast("This GitHub account is already registered. Please log in.");
        setIsLoading(false);
        return;
      }

      await setDoc(
        doc(db, "users", user.uid),
        {
          uid: user.uid,
          firstName: user.displayName?.split(" ")?.[0] || "",
          lastName: user.displayName ? user.displayName.split(" ").slice(1).join(" ") : "",
          email: normalized,
          role: "freelancer",
          authProvider: "github.com",
          createdAt: serverTimestamp(),
        },
        { merge: true }
      );

      showToast("GitHub account created!");
      navigate("/freelancer-details", { state: { uid: user.uid, firstName: user.displayName?.split(" ")?.[0] || "", lastName: user.displayName?.split(" ").slice(1).join(" ") || "", email: normalized }});
    } catch (err) {
      console.error("GitHub signup:", err);
      showToast(err?.message || "GitHub sign-up failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.headerRow}>
          <img src="/assets/huzzler.png" alt="logo" style={{ width: 40, height: 40 }} />
          <button onClick={() => navigate(-1)} style={styles.backBtn}>Back</button>
        </div>

        <h2>Sign up as freelancer</h2>
        <p>Let's get to know you. We promise it'll be quick.</p>

        <input style={styles.input} placeholder="First name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        <input style={styles.input} placeholder="Last name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
        <input style={styles.input} placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input style={styles.input} placeholder="Enter password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

        <button disabled={isLoading} onClick={handleGetOtp} style={styles.primaryBtn}>
          {isLoading ? "Please wait..." : "Get OTP"}
        </button>

        <div style={styles.dividerRow}>
          <hr style={{ flex: 1 }} />
          <div style={{ padding: "0 12px" }}>or Sign up with</div>
          <hr style={{ flex: 1 }} />
        </div>

        <div style={{ display: "flex", gap: 24, justifyContent: "center", marginTop: 16 }}>
          <button onClick={handleGoogle} style={styles.iconBtn}>Google</button>
          <button onClick={handleGitHub} style={styles.iconBtn}>GitHub</button>
        </div>

        <div style={{ marginTop: 24, textAlign: "center" }}>
          <span>Have an account? </span>
          <button onClick={() => navigate(-1)} style={styles.linkBtn}>log in</button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: { minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#fff" },
  card: { width: 520, maxWidth: "94%", padding: 24, borderRadius: 12, boxShadow: "0 8px 30px rgba(0,0,0,0.06)" },
  headerRow: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 },
  backBtn: { border: "none", background: "transparent", cursor: "pointer" },
  input: { width: "100%", padding: "12px 14px", margin: "8px 0", borderRadius: 8, border: "1px solid #e5e7eb" },
  primaryBtn: { width: "100%", padding: 12, borderRadius: 10, border: "none", background: "#fbbf24", fontWeight: 600, cursor: "pointer" },
  dividerRow: { display: "flex", alignItems: "center", gap: 8, marginTop: 24 },
  iconBtn: { padding: "8px 14px", borderRadius: 8, border: "1px solid #e5e7eb", cursor: "pointer" },
  linkBtn: { background: "#fdfd96", padding: "6px 12px", borderRadius: 6, border: "none", cursor: "pointer" }
};
