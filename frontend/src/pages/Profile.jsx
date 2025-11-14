

import React, { useState } from "react";
import { FiArrowLeft, FiEdit2 } from "react-icons/fi";
import Sidebar from "./components/Sidebar";
import profile from "../assets/profile.png";

export default function ProfileSummary() {
  const [showPortfolioModal, setShowPortfolioModal] = useState(false);

  return (
    <>
      <style>{`
        html, body {
          margin: 0;
          padding: 0;
          overflow-x: hidden;
        }

        .profile-container {
          display: flex;
          min-height: 100vh;
          background: #fff;
          font-family: "Inter", sans-serif;
        }

        .blur-bg {
          filter: blur(3px);
          pointer-events: none;
          user-select: none;
        }

        .profile-content {
          flex: 1;
          padding: 30px;
          background: linear-gradient(
            rgba(248,247,155,1),
            rgba(255,255,255,1)
          );
          margin-left: 230px;
          overflow-y: auto;
        }

        .back-btn {
          background: white;
          border: 1px solid #ccc;
          border-radius: 30px;
          padding: 6px 10px;
          cursor: pointer;
        }

        .profile-header h2 {
          font-size: 28px;
          font-weight: 700;
          margin-left: 50px;
          margin-top: -35px;
        }

        .profile-user {
          margin-top: 25px;
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .profile-avatar {
          width: 65px;
          height: 65px;
          border-radius: 50%;
        }

        .profile-card {
          margin-top: 30px;
          background: white;
          padding: 25px;
          border-radius: 18px;
          box-shadow: 0 4px 25px rgba(0,0,0,0.08);
        }

        .form-group {
          margin-bottom: 20px;
        }

        .form-group label {
          font-weight: 600;
          margin-bottom: 6px;
          display: block;
        }

        .form-group input,
        .form-group textarea {
          width: 100%;
          padding: 12px;
          border: 1px solid #dcdcdc;
          border-radius: 8px;
          font-size: 14px;
          resize: none;
        }

        .button-row {
          display: flex;
          justify-content: flex-end;
          gap: 15px;
          margin-top: 25px;
        }

        .cancel-btn {
          padding: 10px 18px;
          background: #eee;
          border-radius: 25px;
          border: none;
          cursor: pointer;
        }

        .save-btn {
          padding: 10px 24px;
          background: #7f3dff;
          color: white;
          border-radius: 25px;
          border: none;
          cursor: pointer;
        }

        /* ----- MODAL ----- */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0,0,0,0.45);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 999;
        }

        .modal-box {
          width: 480px;
          background: #fff;
          padding: 25px;
          border-radius: 18px;
          animation: pop 0.25s ease;
          box-shadow: 0 4px 20px rgba(0,0,0,0.2);
        }

        @keyframes pop {
          from { transform: scale(0.85); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }

        .modal-title {
          font-size: 22px;
          font-weight: 700;
          text-align: center;
          margin-bottom: 20px;
        }

        .modal-btns {
          display: flex;
          justify-content: center;
          gap: 15px;
          margin-top: 20px;
        }
          .edit-pic-btn{
          margin-top:40px;
          margin-left:-30px;
          }
          .card-edit-btn{
          margin-left:95%;
          }
      `}</style>

      {/* MAIN BODY */}
      <div className="profile-container">

        {/* SIDEBAR */}
        <Sidebar />

        {/* CONTENT (Blur when modal open) */}
        <div className={`profile-content ${showPortfolioModal ? "blur-bg" : ""}`}>
          <div className="profile-header">
            <button className="back-btn">
              <FiArrowLeft size={20} />
            </button>

            <h2>Profile summary</h2>

            <div className="profile-user">
              <img src={profile} className="profile-avatar" alt="" />
              <div className="edit-pic-btn">
                <FiEdit2 size={16} />
              </div>
              <div>
                <h3>Helen Angel</h3>
                <p className="email">helen.angel@example.com</p>
              </div>
            </div>
          </div>

          <div className="profile-card">
           
          {/* Edit icon on card top-right */}
          <div className="card-edit-btn">
            <FiEdit2 size={18} />
          </div>
            <div className="form-group">
              <label>Professional Title</label>
              <input type="text" />
            </div>

            <div className="form-group">
              <label>About</label>
              <textarea placeholder="Describe your strengths and skills..." />
            </div>

            <div className="form-group">
              <label>Skills</label>
              <input type="text" placeholder="Add skills" />
            </div>

            <div className="form-group">
              <label>Tools</label>
              <input type="text" placeholder="Add tools" />
            </div>

            <div className="form-group">
              <label>Add Link</label>
              <input type="text" placeholder="+ Add project" />
            </div>

            {/* OPEN MODAL */}
            <div className="form-group">
              <label>Add Portfolio</label>
              <input
                type="text"
                placeholder="+ Add Portfolio"
                readOnly
                onClick={() => setShowPortfolioModal(true)}
                style={{ cursor: "pointer", background: "#fafafa" }}
              />
            </div>

            <div className="button-row">
              <button className="cancel-btn">Cancel</button>
              <button className="save-btn">Save</button>
            </div>
          </div>
        </div>
      </div>

      {/* -------- MODAL -------- */}
      {showPortfolioModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3 className="modal-title">Add Portfolio</h3>

            <div className="form-group">
              <label>Project Title</label>
              <input type="text" placeholder="Enter project title" />
            </div>

            <div className="form-group">
              <label>Project Description</label>
              <textarea placeholder="Describe your project briefly" />
            </div>

            <div className="form-group">
              <label>Upload Project Files</label>
              <input type="text" placeholder="Project URL" />
            </div>

            <div className="modal-btns">
              <button className="cancel-btn" onClick={() => setShowPortfolioModal(false)}>
                Cancel
              </button>
              <button className="save-btn">Save</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

