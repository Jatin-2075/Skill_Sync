import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./style/page5.css";
import { Weight } from 'lucide-react';


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
  const handleCollaborationToggle = (interest: string) => {
    setCollaborationInterests(prev => ({
      ...prev,
      [interest]: !prev[interest]
    }));
  };

  const navigate = useNavigate();

  const handleBack = () => { navigate("/pagefour"); };
  const [visibility,setVisibility] = useState<string>("Private") ; 
  const sliderPercentage = (weeklyHours / 60) * 100;

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
            <span className="page5-phase-text">Phase 5</span>
            <span className="page5-completion-text">Final Step</span>
          </div>
          <div className="page5-progress-bar">
            <div className="page5-progress-fill" style={{ width: "100%" }} />
          </div>
        </section>

        <section className="page5-title-section">
          <h2 className="page5-page-title">Availability & Collaboration</h2>
          <p className="page5-page-subtitle">Customize how you interact with recruiters and the community.</p>
        </section>

        <section className="page5-form-card">
          <div className="page5-input-group">
            <h3 className="page5-section-title">Current Status</h3>
            <div className="page5-status-container">
              <button 
                className={`page5-status-btn ${currentStatus === 'active' ? 'page5-active' : ''}`}
                onClick={() => setCurrentStatus('active')}
              >Actively Looking</button>
              <button 
                className={`page5-status-btn ${currentStatus === 'open' ? 'page5-active' : ''}`}
                onClick={() => setCurrentStatus('open')}
              >Open to Offers</button>
              <button 
                className={`page5-status-btn ${currentStatus === 'unavailable' ? 'page5-active' : ''}`}
                onClick={() => setCurrentStatus('unavailable')}
              >Unavailable</button>
            </div>
          </div>

          <div className="page5-input-group">
            <h3 className="page5-section-title">Collaboration Interests</h3>
            <div className="page5-collaboration-grid">
              {/* Card 1 */}
              <div className={`page5-collab-card ${collaborationInterests.openSource ? 'page5-selected' : ''}`} onClick={() => handleCollaborationToggle('openSource')}>
                <div className="page5-card-icon blue">📂</div>
                <div className="page5-card-info">
                   <span className="page5-card-title">Open Source</span>
                   <span className="page5-card-sub">contribute to public repos</span>
                </div>
                <input type="checkbox" checked={collaborationInterests.openSource} readOnly />
              </div>
              {/* Card 2 */}
              <div className={`page5-collab-card ${collaborationInterests.paidProjects ? 'page5-selected' : ''}`} onClick={() => handleCollaborationToggle('paidProjects')}>
                <div className="page5-card-icon green">💰</div>
                <div className="page5-card-info">
                   <span className="page5-card-title">Paid Projects</span>
                   <span className="page5-card-sub">freelance & contract</span>
                </div>
                <input type="checkbox" checked={collaborationInterests.paidProjects} readOnly />
              </div>
              {/* Card 3 */}
              <div className={`page5-collab-card ${collaborationInterests.startups ? 'page5-selected' : ''}`} onClick={() => handleCollaborationToggle('startups')}>
                <div className="page5-card-icon purple">🚀</div>
                <div className="page5-card-info">
                   <span className="page5-card-title">Startups</span>
                   <span className="page5-card-sub">co-founding or equity</span>
                </div>
                <input type="checkbox" checked={collaborationInterests.startups} readOnly />
              </div>
              {/* Card 4 */}
              <div className={`page5-collab-card ${collaborationInterests.mentorship ? 'page5-selected' : ''}`} onClick={() => handleCollaborationToggle('mentorship')}>
                <div className="page5-card-icon orange">🎓</div>
                <div className="page5-card-info">
                   <span className="page5-card-title">Mentorship</span>
                   <span className="page5-card-sub">teaching others</span>
                </div>
                <input type="checkbox" checked={collaborationInterests.mentorship} readOnly />
              </div>
            </div>
          </div>

          <div className="page5-input-group">
          <div className="page5-availability-header">
            <h3 className="page5-section-title">Weekly Availability</h3>
            <span className="page5-hours-text">{weeklyHours} - {weeklyHours + 10} hrs</span>
          </div>
          <div className="page5-slider-wrapper">
            <input 
              type="range" 
              min="0" 
              max="60" 
              value={weeklyHours} 
              onChange={(e) => setWeeklyHours(parseInt(e.target.value))} 
              className="page5-slider"
              style={{
                background: `linear-gradient(to right, #2563eb 0%, #2563eb ${sliderPercentage}%, #e2e8f0 ${sliderPercentage}%, #e2e8f0 100%)`
              }}
            />
            <div className="page5-slider-labels">
              <span>0 hrs</span><span>20 hrs</span><span>40 hrs</span><span>60+ hrs</span>
            </div>
          </div>
          </div>

          <div className="page5-public-toggle">
            {/* <input type="checkbox" checked={makeProfilePublic} onChange={() => setMakeProfilePublic(!makeProfilePublic)} id="public-check" /> */}
            <label htmlFor="public-check">
              <strong style={{color : 'red'}}>Disclaimer *</strong>
              <p>Your profile will be <span style={{ fontWeight: 'bold' }}>{visibility}</span> to recruiters and the SkillRank community. <br />If wanna modify it then go to Phase-1 .</p>
            </label>
          </div>
        </section>

        <footer className="page4-footer-nav">
            <button onClick={handleBack} className="page4-btn-back">Back</button>
            <button className="page4-btn-continue">Save & Continue →</button>
        </footer>
      </main>
    </div>
  );
}