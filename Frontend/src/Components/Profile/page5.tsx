import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./style/page5.css";
import { API } from '../../config/Api';

type Collaboration = {
  paidproject: boolean;
  startup: boolean;
  mentorship: boolean;
  opensource: boolean;
  weeklyhour: number;
};

type ToggleKeys = "opensource" | "paidproject" | "startup" | "mentorship";

export default function Page5() {
  const navigate = useNavigate();

  const [currentStatus, setCurrentStatus] = useState<'active' | 'open' | 'unavailable'>('open');
  const [visibility] = useState<string>("Private");

  const [collaborationInterests, setCollaborationInterests] =
    useState<Collaboration>({
      opensource: true,
      paidproject: false,
      startup: true,
      mentorship: false,
      weeklyhour: 10,
    });

  const weeklyHours = collaborationInterests.weeklyhour;
  const sliderPercentage = (weeklyHours / 60) * 100;

  const handleCollaborationToggle = (key: ToggleKeys) => {
    setCollaborationInterests(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleBack = () => navigate("/pagefour");

  const handlesubmit = async () => {
    const res = await API("POST", "/auth/savecollaboration/", { data : collaborationInterests })
    const data = await res.json()

    console.log(data);
  }

  return (
    <div className="page5-container">
      <header className="page5-header">
        <div className="page5-brand">
          <div className="page5-logo" />
          <span className="page5-brand-title">SkillRank</span>
        </div>

        <div className="page5-header-right">
          <a className="page5-help-link">
            <span className="page5-help-icon">?</span>
            Help
          </a>
        </div>
      </header>

      <main className="page5-main-content">
        <section className="page5-progress-section">
            <div className="page5-progress-info">
              <span className="page5-phase-text">Phase 5: Availibility and Collaboration</span>
              <span className="page5-completion-text">100%</span>
            </div>
            <div className="page5-progress-bar">
              <div className="page5-progress-fill" style={{ width: "100%" }} />
            </div>
          </section>
        <section className="page5-title-section">
          <h2 className="page5-page-title">Availability & Collaboration</h2>
          <p className="page5-page-subtitle">
            Customize how you interact with recruiters and the community.
          </p>
        </section>

        <div className="page5-input-group">
          <h3 className="page5-section-title">Current Status</h3>
          <div className="page5-status-container">
            <button
              className={`page5-status-btn ${currentStatus === 'active' ? 'page5-active' : ''}`}
              onClick={() => setCurrentStatus('active')}
            >
              Actively Looking
            </button>
            <button
              className={`page5-status-btn ${currentStatus === 'open' ? 'page5-active' : ''}`}
              onClick={() => setCurrentStatus('open')}
            >
              Open to Offers
            </button>
            <button
              className={`page5-status-btn ${currentStatus === 'unavailable' ? 'page5-active' : ''}`}
              onClick={() => setCurrentStatus('unavailable')}
            >
              Unavailable
            </button>
          </div>
        </div>

        <div className="page5-input-group">
          <h3 className="page5-section-title">Collaboration Interests</h3>
          <div className="page5-collaboration-grid">
            {([
              ["opensource", "📂", "Open Source", "contribute to public repos"],
              ["paidproject", "💰", "Paid Projects", "freelance & contract"],
              ["startup", "🚀", "Startups", "co-founding or equity"],
              ["mentorship", "🎓", "Mentorship", "teaching others"],
            ] as const).map(([key, icon, title, sub]) => (
              <div
                key={key}
                className={`page5-collab-card ${collaborationInterests[key] ? 'page5-selected' : ''
                  }`}
                onClick={() => handleCollaborationToggle(key)}
              >
                <div className="page5-card-icon">{icon}</div>
                <div className="page5-card-info">
                  <span className="page5-card-title">{title}</span>
                  <span className="page5-card-sub">{sub}</span>
                </div>
                <input type="checkbox" checked={collaborationInterests[key]} readOnly />
              </div>
            ))}
          </div>
        </div>

        <div className="page5-input-group">
          <div className="page5-availability-header">
            <h3 className="page5-section-title">Weekly Availability</h3>
            <span className="page5-hours-text">
              {weeklyHours} - {weeklyHours + 10} hrs
            </span>
          </div>

          <input
            type="range"
            min="0"
            max="60"
            value={weeklyHours}
            onChange={(e) =>
              setCollaborationInterests(prev => ({
                ...prev,
                weeklyhour: Number(e.target.value),
              }))
            }
            className="page5-slider"
            style={{
              background: `linear-gradient(
                to right,
                #2563eb 0%,
                #2563eb ${sliderPercentage}%,
                #e2e8f0 ${sliderPercentage}%,
                #e2e8f0 100%
              )`
            }}
          />
        </div>

        {/* DISCLAIMER */}
        <div className="page5-public-toggle">
          <strong style={{ color: 'red' }}>Disclaimer *</strong>
          <p>
            Your profile will be <b>{visibility}</b> to recruiters and the SkillRank
            community.
          </p>
        </div>

        <footer className="page4-footer-nav">
          <button onClick={handleBack} className="page4-btn-back">Back</button>
          <button className="page4-btn-continue" onClick={handlesubmit}>Save & Continue →</button>
        </footer>
      </main>
    </div>
  );
}
