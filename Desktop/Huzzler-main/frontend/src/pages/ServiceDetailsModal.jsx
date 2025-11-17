import React, { useEffect, useState } from "react";
import axios from "axios";
import { X } from "lucide-react";

const ServiceDetailsModal = ({ service, onClose }) => {
  const [fullService, setFullService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!service || !service._id) {
      setFullService(service || null);
      setLoading(false);
      return;
    }

    const controller = new AbortController();
    const fetchFullDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get(`
          http://localhost:5000/api/ClientWork/ClientgetWorkbyId/${service._id}`,
          { signal: controller.signal }
        );
        
        setFullService(res.data.work || service);
      } catch (err) {
        if (axios.isCancel(err) || err.name === "CanceledError") {
         
          return;
        }
        console.error("Error fetching service details:", err);
        setError("Failed to load details");
       
        setFullService(service);
      } finally {
        setLoading(false);
      }
    };

    fetchFullDetails();

    
    return () => {
      controller.abort();
    };
  }, [service]);


  if (!service) return null;


  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">
            {(fullService && fullService.ServiceTitle) || service.ServiceTitle}
          </h2>
          <button className="close-btn" onClick={onClose}><X size={22} /></button>
        </div>

        <div className="modal-body">
          {loading ? (
            <p style={{ padding: "1rem" }}>Loading details…</p>
          ) : error ? (
            <p style={{ color: "red", padding: "1rem" }}>{error}</p>
          ) : (
            <>
              <p className="modal-desc">{fullService?.Des || "No description"}</p>

              <div className="details-grid">
                <div><strong>Category:</strong> {fullService?.Category}</div>
                <div><strong>Price Range:</strong> ₹{fullService?.minprice} - ₹{fullService?.maxprice}</div>
                <div><strong>Delivery:</strong> {fullService?.DeliveryDay} Days</div>
                <div><strong>Duration:</strong> {fullService?.StartDate || "—"} → {fullService?.EndDate || "—"}</div>
              </div>

              <h3>Skills</h3>
              <ul className="tag-list">
                {fullService?.Skills?.length ? (
                  fullService.Skills.map((s, i) => <li key={i} className="tag-item">{s}</li>)
                ) : (
                  <li className="tag-item">—</li>
                )}
              </ul>

              <h3>Tools Used</h3>
              <ul className="tag-list">
                {fullService?.tools?.length ? (
                  fullService.tools.map((t, i) => <li key={i} className="tag-item">{t}</li>)
                ) : (
                  <li className="tag-item">—</li>
                )}
              </ul>

              {fullService?.sample_projects?.length > 0 && (
                <>
                  <h3>Sample Projects</h3>
                  <ul className="tag-list">
                    {fullService.sample_projects.map((proj, i) => (
                      <li key={i} className="tag-item">{proj}</li>
                    ))}
                  </ul>
                </>
              )}
            </>
          )}
        </div>
      </div>
      {/* Styles */}


      <style>{`
      .modal-overlay {
        position: fixed;
        top: 0; left: 0; right: 0; bottom: 0;
        background: rgba(0, 0, 0, 0.4);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
      }
      .modal-container {
        background: #fff;
        width: 90%;
        max-width: 600px;
        border-radius: 12px;
        padding: 1.5rem;
        box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        animation: fadeIn 0.3s ease;
      }
      @keyframes fadeIn {
        from { transform: scale(0.95); opacity: 0; }
        to { transform: scale(1); opacity: 1; }
      }
        .modal-container {
  animation: fadeIn 0.2s ease;
}
@keyframes fadeIn {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}

      .modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;
      }
      .modal-title {
        font-size: 1.25rem;
        font-weight: 600;
        color: #111827;
      }
      .close-btn {
        background: none;
        border: none;
        color: #6b7280;
        cursor: pointer;
        transition: 0.2s;
      }
      .close-btn:hover {
        color: #000;
      }
      .modal-desc {
        color: #374151;
        font-size: 0.95rem;
        margin-bottom: 1rem;
      }
      .details-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 0.5rem;
        margin-bottom: 1rem;
        font-size: 0.9rem;
      }
      .tag-list {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        margin-bottom: 1rem;
      }
      .tag-item {
        background: #f3f4f6;
        padding: 0.35rem 0.75rem;
        border-radius: 0.5rem;
        font-size: 0.85rem;
        color: #111827;
      }
    `}</style>
    </div>
  );

};

export default ServiceDetailsModal;
