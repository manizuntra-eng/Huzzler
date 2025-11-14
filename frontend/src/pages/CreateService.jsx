// CreateService.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import Sidebar from "./components/Sidebar.jsx";

const CreateService = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const is24Hour = location.pathname.includes("24");

  const [formData, setFormData] = useState({
    serviceTitle: "",
    description: "",
    category: "",
    priceFrom: "",
    priceTo: "",
    deliveryDays: "",
    skills: "",
    tools: "",
    sampleProjects: "",
    clientRequirements: "",
    startDate: "",
    endDate: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/ClientWork/clientworkCreate", {
        ServiceTitle: formData.serviceTitle,
        Des: formData.description,
        Category: formData.category,
        specificDelivery: is24Hour ? "24 hours" : "Work",
        minprice: Number(formData.priceFrom),
        maxprice: Number(formData.priceTo),
        StartDate: !is24Hour ? new Date(formData.startDate).getTime() : null,
        EndDate: !is24Hour ? new Date(formData.endDate).getTime() : null,
        DeliveryDay: !is24Hour ? Number(formData.deliveryDays) : 1,
        Skills: formData.skills.split(",").map((s) => s.trim()),
        tools: formData.tools.split(",").map((t) => t.trim()),
        sample_projects: formData.sampleProjects.split(",").map((p) => p.trim()),
        client_des: formData.clientRequirements || "",
      });

      alert("Client work created successfully!");
      navigate("/dash");
    } catch (error) {
      console.error("Error creating service:", error);
      alert("Failed to create service.");
    }
  };

  return (
    <div className="page-container">
      <div className="sidebar">
        <Sidebar />
      </div>

      <div className="main">
        <div className="top-bar">
          <button className="back-btn" onClick={() => navigate(-1)}>
            <FiArrowLeft size={20} />
          </button>
          <h1>Create Service</h1>
        </div>

        <p className="subtitle">Show what you do — create your service here</p>

        {/* Toggle Bar */}
        <div className="toggle-bar">
          <button
            onClick={() => navigate("/createservice")}
            className={`toggle-btn ${!is24Hour ? "active" : ""}`}
          >
            Work
          </button>

          <button
            onClick={() => navigate("/create-service24")}
            className={`toggle-btn ${is24Hour ? "active" : ""}`}
          >
            24 Hours
          </button>
        </div>

        {/* Form Box */}
        <div className="form-card">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>
                Service Title<span className="required">*</span>
              </label>
              <input
                type="text"
                name="serviceTitle"
                value={formData.serviceTitle}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Description<span className="required">*</span></label>
              <textarea
                name="description"
                rows="3"
                value={formData.description}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <div className="form-group">
              <label>Category<span className="required">*</span></label>
              <textarea
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <div className="form-group">
              <label>Price Range<span className="required">*</span></label>
              <div className="price-range">
                <input
                  type="number"
                  name="priceFrom"
                  value={formData.priceFrom}
                  onChange={handleChange}
                  required
                />
                <input
                  type="number"
                  name="priceTo"
                  value={formData.priceTo}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {!is24Hour && (
              <>
                <div className="form-group">
                  <label>Start Date</label>
                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label>End Date</label>
                  <input
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label>Delivery Days*</label>
                  <input
                    type="number"
                    name="deliveryDays"
                    value={formData.deliveryDays}
                    onChange={handleChange}
                  />
                </div>
              </>
            )}

            <div className="form-group">
              <label>Skills*</label>
              <input
                type="text"
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Tools*</label>
              <input
                type="text"
                name="tools"
                value={formData.tools}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Sample Projects*</label>
              <input
                type="text"
                name="sampleProjects"
                value={formData.sampleProjects}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Client Requirements (Optional)</label>
              <textarea
                name="clientRequirements"
                rows="3"
                value={formData.clientRequirements}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="buttons">
              <button type="submit" className="save-btn">
                Save
              </button>
              <button
                type="button"
                className="cancel-btn"
                onClick={() => navigate(-1)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap');

        * { font-family: 'Poppins', sans-serif; }

        .page-container {
          display: flex;
          height: 100vh;
          width: 100vw;
          overflow: hidden;
          background: linear-gradient(to bottom, #efe6a2ff 0%, #ffffff 60%);
        }

        .sidebar {
          width: 250px;
          height: 100%;
          background: white;
          box-shadow: 2px 0 8px rgba(0,0,0,0.1);
          position: fixed;
        }

        .main {
          flex: 1;
          margin-left: 250px;
          padding: 40px;
          overflow-y: auto;
        }

        .top-bar {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 16px;
        }

        .back-btn {
          background: white;
          border: 1px solid #ccc;
          border-radius: 20px;
          padding: 6px 10px;
          cursor: pointer;
        }

        .subtitle {
          margin-top: -10px;
          margin-bottom: 20px;
        }

        .toggle-bar {
          display: flex;
          background: #ebe5b1;
          border-radius: 9999px;
          width: 80%;
          padding: 4px;
          margin-bottom: 24px;
        }

        .toggle-btn {
          background: none;
          border: none;
          padding: 10px 28px;
          border-radius: 9999px;
          cursor: pointer;
          transition: 0.3s;
        }

        .toggle-btn.active {
          background: white;
          box-shadow: 0 2px 6px rgba(0,0,0,0.15);
        }

        .form-card {
          background: white;
          padding: 32px;
          margin: 0 auto;
          border-radius: 20px;
          box-shadow: 0 6px 16px rgba(0,0,0,0.1);
          width: 80%;
        }

        .form-group { margin-bottom: 16px; }

        input, textarea {
          width: 100%;
          padding: 10px;
          border-radius: 10px;
          border: 1px solid #ddd;
          background: #f9f5d2;
        }

        .buttons {
          display: flex;
          justify-content: center;
          gap: 16px;
          margin-top: 24px;
        }

        .save-btn {
          background: #7e22ce;
          color: white;
          padding: 10px 32px;
          border-radius: 9999px;
          border: none;
        }

        .cancel-btn {
          background: white;
          border: 1px solid #ccc;
          padding: 10px 32px;
          border-radius: 9999px;
        }
      `}</style>
    </div>
  );
};

export default CreateService;
