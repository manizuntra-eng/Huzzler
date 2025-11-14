// import React, { useState, useRef } from "react";
// import styled from "styled-components";
// import { useNavigate } from "react-router-dom";

// const ClientOtpVerify = () => {
//   const navigate = useNavigate();
//   const [otp, setOtp] = useState(["", "", "", ""]);
//   const inputsRef = useRef([]);

//   const handleChange = (e, index) => {
//     const value = e.target.value.replace(/[^0-9]/g, "");
//     if (!value) return;
//     const newOtp = [...otp];
//     newOtp[index] = value;
//     setOtp(newOtp);

//     if (index < 3 && value) inputsRef.current[index + 1].focus();
//   };

//   const handleKeyDown = (e, index) => {
//     if (e.key === "Backspace" && !otp[index] && index > 0) {
//       inputsRef.current[index - 1].focus();
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const otpCode = otp.join("");
//     console.log("Entered OTP:", otpCode);
//     navigate("/dashboard"); // ✅ Change to next page route
//   };

//   const resendOtp = () => {
//     alert("OTP resent successfully ✅");
//   };

//   return (
//     <Wrapper>
//       <div className="container">
//         <div className="logo">LOGO</div>

//         <div className="card">
//           <button className="back-btn" onClick={() => navigate(-1)}>
//             &lt; Back
//           </button>

//           <h2 className="title">You’re Almost There! We Just Need To Verify Your Email.</h2>

//           <div className="icon-box">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 24 24"
//               strokeWidth={1.5}
//               stroke="currentColor"
//               className="mail-icon"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25H4.5a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5H4.5a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.029 1.89l-7.5 4.687a2.25 2.25 0 01-2.442 0L3.779 8.883a2.25 2.25 0 01-1.029-1.89V6.75"
//               />
//             </svg>
//           </div>

//           <div className="otp-section">
//             <p className="subheading">Great! Almost done!</p>
//             <h3 className="verify-text">Please Verify Your Email</h3>
//             <p className="email-text">Enter the verification code sent to:</p>
//             <p className="email">Pereira10@gmail.com</p>

//             <form onSubmit={handleSubmit} className="otp-form">
//               <div className="otp-inputs">
//                 {otp.map((digit, i) => (
//                   <input
//                     key={i}
//                     type="text"
//                     maxLength="1"
//                     value={digit}
//                     onChange={(e) => handleChange(e, i)}
//                     onKeyDown={(e) => handleKeyDown(e, i)}
//                     ref={(el) => (inputsRef.current[i] = el)}
//                   />
//                 ))}
//               </div>

//               <p className="resend">
//                 Didn’t receive OTP?{" "}
//                 <span onClick={resendOtp} className="resend-link">
//                   Resend OTP
//                 </span>
//               </p>

//               <button type="submit" className="get-started-btn">
//                 Get Started
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </Wrapper>
//   );
// };

// export default ClientOtpVerify;

// /* ===================== STYLES ===================== */
// const Wrapper = styled.div`
//   background-color: #f5f5f5;
//   min-height: 100vh;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   font-family: "Poppins", sans-serif;

//   .container {
//     width: 100%;
//     max-width: 900px;
//     background: #fff;
//     padding: 40px 60px;
//     border-radius: 12px;
//     box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
//     text-align: center;
//   }

//   .logo {
//     text-align: left;
//     font-weight: bold;
//     font-size: 22px;
//     margin-bottom: 20px;
//   }

//   .back-btn {
//     background: none;
//     border: none;
//     color: #000;
//     font-size: 14px;
//     cursor: pointer;
//     text-align: left;
//     width: 100%;
//     margin-bottom: 20px;
//   }

//   .title {
//     font-size: 18px;
//     font-weight: 600;
//     margin-bottom: 30px;
//   }

//   .icon-box {
//     display: flex;
//     justify-content: center;
//     margin-bottom: 20px;
//   }

//   .mail-icon {
//     width: 80px;
//     height: 80px;
//     color: #000;
//   }

//   .otp-section {
//     text-align: center;
//   }

//   .subheading {
//     font-size: 13px;
//     color: #666;
//   }

//   .verify-text {
//     font-size: 18px;
//     font-weight: 600;
//     margin-top: 5px;
//     margin-bottom: 5px;
//   }

//   .email-text {
//     font-size: 13px;
//     color: #666;
//   }

//   .email {
//     font-weight: 500;
//     font-size: 14px;
//     color: #000;
//     margin-bottom: 20px;
//   }

//   .otp-inputs {
//     display: flex;
//     justify-content: center;
//     gap: 15px;
//     margin-bottom: 15px;

//     input {
//       width: 45px;
//       height: 45px;
//       border: 1px solid #ccc;
//       border-radius: 8px;
//       text-align: center;
//       font-size: 20px;
//       font-weight: 600;
//       outline: none;

//       &:focus {
//         border-color: #000;
//       }
//     }
//   }

//   .resend {
//     font-size: 13px;
//     color: #666;
//     margin-bottom: 25px;

//     .resend-link {
//       color: #000;
//       font-weight: 500;
//       text-decoration: underline;
//       cursor: pointer;
//     }
//   }

//   .get-started-btn {
//     background-color: #0a0f29;
//     color: white;
//     border: none;
//     padding: 12px;
//     border-radius: 8px;
//     font-size: 15px;
//     font-weight: 500;
//     cursor: pointer;
//     width: 200px;
//     transition: all 0.2s ease;

//     &:hover {
//       background-color: #111a3b;
//     }
//   }
// `;


import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import API from "../api/client";

import "../styles/Signupstep1.css";
import Profilepic from "../assets/Profilepic.png";
import facebook from "../assets/facebook.png";

const ClientRegister = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [image, setImage] = useState(null);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    avatarUrl: "",
  });
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();
  const [searchParams] = useSearchParams();
  const role = searchParams.get("role") || "client";

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imgURL = URL.createObjectURL(file);
      setImage(imgURL);
      setForm({ ...form, avatarUrl: imgURL });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // 🔹 Send registration data to backend
      await API.post("/auth/register", { ...form, role });

      // ✅ Navigate to OTP verification page after registration
      nav(`/client-verify?email=${encodeURIComponent(form.email)}`);
    } catch (err) {
      alert(err?.response?.data?.message || "Error while registering");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="outer-wrapper">
      <div className="logo-text">LOGO</div>

      <div className="signup-wrapper">
        <div className="signup-card">
          <div className="signup-header">
            <span className="back-symbol" onClick={() => nav(-1)}>
              &lt;
            </span>
            <h3>Sign up as a Client</h3>
            <p>Let’s get to know you. We promise it’ll be quick.</p>
          </div>

          <form className="signup-body" onSubmit={handleSubmit}>
            {/* Upload Image Section */}
            <div className="image-upload">
              <label htmlFor="upload">
                {image ? (
                  <img src={image} alt="Preview" className="preview-image" />
                ) : (
                  <div className="upload-placeholder">
                    <img
                      src={Profilepic}
                      alt="Upload Icon"
                      className="upload-png"
                    />
                  </div>
                )}
                <input
                  type="file"
                  id="upload"
                  accept="image/*"
                  onChange={handleImageChange}
                  hidden
                />
              </label>
              <p className="upload-text">Upload Image</p>
            </div>

            {/* Signup Form Section */}
            <div className="form-section">
              <div className="social-buttons">
                <a
                  className="google-btn"
                  href="http://localhost:5000/api/auth/google"
                >
                  <img
                    src="https://www.svgrepo.com/show/475656/google-color.svg"
                    alt="Google"
                  />
                  Sign up with Google
                </a>

                <button
                  type="button"
                  className="facebook-btn"
                  onClick={() => alert("Facebook integration coming soon!")}
                >
                  <img src={facebook} alt="Facebook" />
                  Sign in with Facebook
                </button>
              </div>

              <div className="name-fields">
                <div>
                  <label htmlFor="firstName">First Name</label>
                  <input
                    id="firstName"
                    type="text"
                    placeholder="First Name"
                    value={form.firstName}
                    onChange={(e) =>
                      setForm({ ...form, firstName: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    id="lastName"
                    type="text"
                    placeholder="Last Name"
                    value={form.lastName}
                    onChange={(e) =>
                      setForm({ ...form, lastName: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email">Enter your Email Address</label>
                <input
                  id="email"
                  type="email"
                  placeholder="Email Address"
                  value={form.email}
                  onChange={(e) =>
                    setForm({ ...form, email: e.target.value })
                  }
                  required
                />
              </div>

              <div>
                <label htmlFor="password">Create Password</label>
                <div className="password-field">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter Password"
                    value={form.password}
                    onChange={(e) =>
                      setForm({ ...form, password: e.target.value })
                    }
                    required
                  />
                  {showPassword ? (
                    <EyeOff onClick={() => setShowPassword(false)} />
                  ) : (
                    <Eye onClick={() => setShowPassword(true)} />
                  )}
                </div>
              </div>

              <button
                className="continue-btn"
                type="submit"
                disabled={loading}
              >
                {loading ? "Loading..." : "Continue"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ClientRegister;
