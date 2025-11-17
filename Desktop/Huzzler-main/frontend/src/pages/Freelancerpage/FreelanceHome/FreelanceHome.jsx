import React, { useEffect, useState } from "react";
import { PlusCircle } from "lucide-react";
import { db } from "../../../firbase/Firebase";
import { collection, getDocs } from "firebase/firestore";
import "./FreelancerHome.css";

const FreelanceHome = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const snapshot = await getDocs(collection(db, "jobs"));

        const works = snapshot.docs.map((doc) => {
          const data = doc.data();

          return {
            _id: doc.id,

            // 🔥 Main Job Fields
            title: data.title || "Untitled",
            description: data.description || "No description",
            category: data.category || "No category",
            sub_category: data.sub_category || "",
            timeline: data.timeline || "",
            userId: data.userId || "",

            // 💰 Price
            minprice: data.budget_from || 0,
            maxprice: data.budget_to || 0,

            // 🧩 Arrays
            skills: data.skills || [],
            tools: data.tools || [],

            // 👥 Applicants
            applicants: data.applicants || [],
            applicants_count: data.applicants_count || 0,

            // 👁 Views
            views: data.views || 0,
            viewedBy: data.viewedBy || [],

            // ⏳ Dates
            created_at: data.created_at,
            updated_at: data.updated_at,
          };
        });

        setProjects(works);
      } catch (error) {
        console.error("🔥 Firestore Fetch Error:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <main className="dashboard">
      <div className="page-wrapper">
        <h2 className="title">Available Jobs</h2>

        <div className="work-grid">
          {projects.map((work) => (
            <div className="work-card" key={work._id}>
              <h3>{work.title}</h3>
              <p className="category">{work.category}</p>
              <p className="description">{work.description}</p>

              {/* Skills */}
              <div className="skills-box">
                {work.skills.map((s, i) => (
                  <span key={i} className="skill-chip">
                    {s}
                  </span>
                ))}
              </div>

              {/* Tools */}
              {work.tools.length > 0 && (
                <div className="tools-box">
                  <strong>Tools:</strong>
                  {work.tools.map((t, i) => (
                    <span key={i} className="tool-chip">
                      {t}
                    </span>
                  ))}
                </div>
              )}

              {/* Price */}
              <p className="price">
                ₹{work.minprice} - ₹{work.maxprice}
              </p>

              {/* Applicants */}
              <p className="applicants">
                Applicants: {work.applicants_count}
              </p>

              {/* Timeline */}
              <p className="timeline">Timeline: {work.timeline}</p>

              {/* Views */}
              <p className="views">Views: {work.views}</p>
            </div>
          ))}
        </div>
      </div>

      <button className="add-btn">
        <PlusCircle size={24} />
      </button>
    </main>
  );
};

export default FreelanceHome;
