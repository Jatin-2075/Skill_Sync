import { useState } from 'react';
import "./style/page5.css";
import { useNavigate } from 'react-router-dom';

export default function Page5() {
  const [currentStatus, setCurrentStatus] = useState('open');
  const [collaborationInterests, setCollaborationInterests] = useState({
    openSource: true,
    paidProjects: false,
    startups: true,
    mentorship: false
  });
  const [weeklyHours, setWeeklyHours] = useState(10);
  const [makeProfilePublic, setMakeProfilePublic] = useState(true);

  const handleCollaborationToggle = (interest) => {
    setCollaborationInterests(prev => ({
      ...prev,
      [interest]: !prev[interest]
    }));
  };

  const navigate = useNavigate() ; 

  const handleBack = () =>{
    navigate("/pagefour");
  }
  const sliderPercentage = (weeklyHours / 60) * 100;

  return (
    <div className="page-container">
      <header className="header">
        <div className="brand">
          <div className="logo" />
          <span className="brand-title">SkillRank</span>
        </div>

        <div className="header-right">
          <a className="help-link">
            <span className="help-icon">?</span>
            Help
          </a>
        </div>
      </header>

      <main className="main-content">
        <section className="progress-section">
            <div className="progress-info">
              <span className="phase-text">Phase 5: Availibility & Calibaration</span>
              <span className="completion-text">Final Step</span>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: "100%" }} />
            </div>
          </section>

        <section className="page-title-section">
          <h2 className="page-title">Availability & Collaboration</h2>
          <p className="page-subtitle">Customize how you interact with recruiters and the community.</p>
        </section>

        <section className="form-section">
          <div className="form-card">
            <h3 className="section-title">Current Status</h3>
            <div className="status-options">
              <button 
                className={`status-option ${currentStatus === 'active' ? 'active' : ''}`}
                onClick={() => setCurrentStatus('active')}
              >
                Actively Looking
              </button>
              <button 
                className={`status-option ${currentStatus === 'open' ? 'active' : ''}`}
                onClick={() => setCurrentStatus('open')}
              >
                Open to Offers
              </button>
              <button 
                className={`status-option ${currentStatus === 'unavailable' ? 'active' : ''}`}
                onClick={() => setCurrentStatus('unavailable')}
              >
                Unavailable
              </button>
            </div>
          </div>

          <div className="form-card">
            <h3 className="section-title">Collaboration Interests</h3>
            <div className="collaboration-grid">
              <div 
                className={`collaboration-card ${collaborationInterests.openSource ? 'selected' : ''}`}
                onClick={() => handleCollaborationToggle('openSource')}
              >
                <div className="collaboration-icon blue-bg">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2">
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                    <line x1="8" y1="21" x2="16" y2="21"></line>
                    <line x1="12" y1="17" x2="12" y2="21"></line>
                  </svg>
                </div>
                <div className="collaboration-text">
                  <div className="collaboration-title">Open Source</div>
                  <div className="collaboration-subtitle">contribute to public repos</div>
                </div>
                <div className={`checkbox ${collaborationInterests.openSource ? 'checked' : ''}`}>
                  {collaborationInterests.openSource && <span className="checkmark">✓</span>}
                </div>
              </div>

              <div 
                className={`collaboration-card ${collaborationInterests.paidProjects ? 'selected' : ''}`}
                onClick={() => handleCollaborationToggle('paidProjects')}
              >
                <div className="collaboration-icon green-bg">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2">
                    <line x1="12" y1="1" x2="12" y2="23"></line>
                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                  </svg>
                </div>
                <div className="collaboration-text">
                  <div className="collaboration-title">Paid Projects</div>
                  <div className="collaboration-subtitle">freelance & contract</div>
                </div>
                <div className={`checkbox ${collaborationInterests.paidProjects ? 'checked' : ''}`}>
                  {collaborationInterests.paidProjects && <span className="checkmark">✓</span>}
                </div>
              </div>

              <div 
                className={`collaboration-card ${collaborationInterests.startups ? 'selected' : ''}`}
                onClick={() => handleCollaborationToggle('startups')}
              >
                <div className="collaboration-icon purple-bg">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9333ea" strokeWidth="2">
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                  </svg>
                </div>
                <div className="collaboration-text">
                  <div className="collaboration-title">Startups</div>
                  <div className="collaboration-subtitle">co-founding or equity</div>
                </div>
                <div className={`checkbox ${collaborationInterests.startups ? 'checked' : ''}`}>
                  {collaborationInterests.startups && <span className="checkmark">✓</span>}
                </div>
              </div>

              <div 
                className={`collaboration-card ${collaborationInterests.mentorship ? 'selected' : ''}`}
                onClick={() => handleCollaborationToggle('mentorship')}
              >
                <div className="collaboration-icon orange-bg">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ea580c" strokeWidth="2">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                </div>
                <div className="collaboration-text">
                  <div className="collaboration-title">Mentorship</div>
                  <div className="collaboration-subtitle">teaching others</div>
                </div>
                <div className={`checkbox ${collaborationInterests.mentorship ? 'checked' : ''}`}>
                  {collaborationInterests.mentorship && <span className="checkmark">✓</span>}
                </div>
              </div>
            </div>
          </div>

          <div className="form-card">
            <div className="availability-header">
              <h3 className="section-title">Weekly Availability</h3>
              <span className="hours-display">{weeklyHours} - {weeklyHours + 10} hrs</span>
            </div>
            <div className="slider-container">
              <input 
                type="range" 
                min="0" 
                max="60" 
                value={weeklyHours}
                onChange={(e) => setWeeklyHours(parseInt(e.target.value))}
                className="availability-slider"
                style={{
                  background: `linear-gradient(to right, #2563eb 0%, #2563eb ${sliderPercentage}%, #e5e7eb ${sliderPercentage}%, #e5e7eb 100%)`
                }}
              />
              <div className="slider-labels">
                <span>0 hrs</span>
                <span>20 hrs</span>
                <span>40 hrs</span>
                <span>60+ hrs</span>
              </div>
            </div>
          </div>

          <div className="form-card">
            <div 
              className="public-profile-toggle"
              onClick={() => setMakeProfilePublic(!makeProfilePublic)}
            >
              <div className={`checkbox ${makeProfilePublic ? 'checked' : ''}`}>
                {makeProfilePublic && <span className="checkmark">✓</span>}
              </div>
              <div className="toggle-content">
                <div className="toggle-title">Make Profile Public</div>
                <div className="toggle-description">Your profile will be visible to recruiters and the SkillRank community. Uncheck to keep it private.</div>
              </div>
            </div>
          </div>
        </section>

        <section className="final-review-section">
          <h3 className="section-title">Final Review</h3>
          <div className="review-card">
            <div className="profile-header">
              <div className="profile-avatar-large">
                <span className="avatar-text">SJ</span>
                <div className="online-indicator"></div>
              </div>
              <div className="profile-info">
                <h4 className="profile-name">Sarah Jenkins</h4>
                <p className="profile-role">Senior Full Stack Developer</p>
                <div className="profile-meta">
                  <span className="rank-badge">Rank: Uncalibrated</span>
                  <span className="location-badge">San Francisco, CA</span>
                </div>
              </div>
              <div className="profile-strength">
                <div className="strength-label">Profile Strength</div>
                <div className="strength-bar">
                  <div className="strength-fill"></div>
                </div>
                <div className="strength-text">Good (85%)</div>
              </div>
            </div>

            <div className="verification-grid">
              <div className="verification-item completed">
                <span className="check-icon-green">✓</span>
                <span className="verification-text">Identity Verified</span>
              </div>
              <div className="verification-item completed">
                <span className="check-icon-green">✓</span>
                <span className="verification-text">GitHub Linked</span>
              </div>
              <div className="verification-item completed">
                <span className="check-icon-green">✓</span>
                <span className="verification-text">Experience Added</span>
              </div>
              <div className="verification-item warning">
                <span className="warning-icon">!</span>
                <div className="warning-content">
                  <span className="verification-text">Portfolio</span>
                  <span className="warning-subtext">1 project missing for calibration</span>
                </div>
                <button className="add-button">Add</button>
              </div>
            </div>
          </div>
        </section>

        <div className="action-buttons">
          <button onClick={handleBack} className="back-button">Back</button>
          <div className="right-actions">
            
            <button className="create-button">
              Create Profile
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

