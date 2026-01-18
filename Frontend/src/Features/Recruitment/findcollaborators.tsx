import React, { useState } from 'react';
import {
  Grid,
  List,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  MessageSquare,
  Plus,
  Search,
  Bell,
  BadgeCheck
} from 'lucide-react';
import { NavLink } from "react-router-dom";
import './style/findcollaborators.css';

interface SkillVectors {
  coreLogic: number;
  systemPower: number;
  buildMode: number;
  aiEdge: number;
}

interface Availability {
  immediate: boolean;
  weekend: boolean;
}

const FindCollaborators = () => {
  const [rating, setRating] = useState<number>(2400);
  const [rank, setRank] = useState<string>('Grandmaster');
  const [skills, setSkills] = useState<SkillVectors>({
    coreLogic: 80,
    systemPower: 10,
    buildMode: 30,
    aiEdge: 40
  });
  const [availability, setAvailability] = useState<Availability>({
    immediate: true,
    weekend: false
  });

  const handleReset = () => { };

  const handleRatingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRating(Number(e.target.value));
  };

  const handleSkillChange = (skill: keyof SkillVectors, value: string) => {
    setSkills(prev => ({ ...prev, [skill]: Number(value) }));
  };

  const handleRankChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRank(e.target.value);
  };

  const handleAvailabilityChange = (type: keyof Availability) => {
    setAvailability(prev => ({ ...prev, [type]: !prev[type] }));
  };

  const formatSkillName = (key: string) => {
    const name = key.replace(/([A-Z])/g, ' $1').trim();
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  return (
    <main className="fc-main-container">
      <div className="fc-header-section">
        <div className="fc-header-top">
          <div className="fc-header-text">
            <h1 className="fc-page-title">Team Recruitment</h1>
            <p className="fc-page-description">
              Find the perfect teammate. Filter by skill vectors, rating, and availability to build your dream team.
            </p>
          </div>
          <button className="fc-post-btn">
            <Plus size={18} />
            <span>Post a Project</span>
          </button>
        </div>

        <div className="fc-tabs-border">
          <nav className="fc-tabs-nav">
            <NavLink to="/findcollaborators" className={({ isActive }) => isActive ? "fc-tab fc-tab-active" : "fc-tab"}>
              Find Collaborators
            </NavLink>
            <NavLink to="/postproject" className={({ isActive }) => isActive ? "fc-tab fc-tab-active" : "fc-tab"}>
              Post a Project
              <span className="fc-tab-badge fc-badge-new">NEW</span>
            </NavLink>
            <NavLink to="/myproposals" className={({ isActive }) => isActive ? "fc-tab fc-tab-active" : "fc-tab"}>
              My Proposals
              <span className="fc-tab-badge fc-badge-count">2</span>
            </NavLink>
          </nav>
        </div>
      </div>

      <div className="fc-content-wrapper">
        <aside className="fc-sidebar">
          <div className="fc-filter-card">
            <div className="fc-filter-header">
              <h3 className="fc-filter-title">REFINE SEARCH</h3>
              <button className="fc-reset-btn" onClick={handleReset}>Reset</button>
            </div>

            <div className="fc-filter-sections">
              {/* Platform Rating */}
              <div className="fc-filter-section">
                <label className="fc-filter-label">PLATFORM RATING</label>
                <div className="fc-range-container">
                  <div className="fc-range-wrapper">
                    <input
                      type="range"
                      className="fc-range-input"
                      min="0"
                      max="3000"
                      value={rating}
                      onChange={handleRatingChange}
                    />
                    <div className="fc-range-track-fill" style={{ width: `${(rating / 3000) * 100}%` }}></div>
                    <div className="fc-range-thumb-custom" style={{ left: `${(rating / 3000) * 100}%` }}></div>
                  </div>
                  <span className="fc-rating-value-bold">{rating}+</span>
                </div>
              </div>

              {/* Skill Vectors */}
              <div className="fc-filter-section">
                <label className="fc-filter-label">SKILL VECTORS (Thresholds)</label>
                <div className="fc-skill-vectors">
                  {Object.entries(skills).map(([key, value], index) => (
                    <div className="fc-skill-item" key={key}>
                      <div className="fc-skill-header">
                        <span className="fc-skill-name-dark">{`S${index + 1}: ${formatSkillName(key)}`}</span>
                        <span className={`fc-skill-percent-bold ${value > 0 ? 'fc-skill-active' : ''}`}>
                          {value > 0 ? `${value}%` : 'Min %'}
                        </span>
                      </div>
                      <div className="fc-skill-bar-bg-thin">
                        <div className="fc-skill-bar-fill-blue" style={{ width: `${value}%` }}></div>
                        <input
                          type="range"
                          className="fc-skill-range-overlay"
                          value={value}
                          onChange={(e) => handleSkillChange(key as keyof SkillVectors, e.target.value)}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Rank Tier */}
              <div className="fc-filter-section">
                <label className="fc-filter-label">RANK TIER</label>
                <div className="fc-select-wrapper-custom">
                  <select className="fc-select-styled" value={rank} onChange={handleRankChange}>
                    <option>Grandmaster</option>
                    <option>Master</option>
                    <option>Expert</option>
                    <option>Candidate</option>
                  </select>
                  <ChevronRight className="fc-select-chevron" size={18} />
                </div>
              </div>

              {/* Availability */}
              <div className="fc-filter-section">
                <label className="fc-filter-label">AVAILABILITY</label>
                <div className="fc-checkbox-group-tight">
                  <label className="fc-checkbox-label-styled">
                    <input
                      type="checkbox"
                      className="fc-checkbox-blue"
                      checked={availability.immediate}
                      onChange={() => handleAvailabilityChange('immediate')}
                    />
                    <span className="fc-checkbox-text-dark">Immediate Start</span>
                  </label>
                  <label className="fc-checkbox-label-styled">
                    <input
                      type="checkbox"
                      className="fc-checkbox-blue"
                      checked={availability.weekend}
                      onChange={() => handleAvailabilityChange('weekend')}
                    />
                    <span className="fc-checkbox-text-dark">Weekend Only</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="fc-ai-match-card">
            <div className="fc-ai-match-bg"></div>
            <h4 className="fc-ai-match-title">
              <Sparkles size={18} />
              Smart Match
            </h4>
            <p className="fc-ai-match-desc">
              Describe your project, and our AI will find the perfect team configuration.
            </p>
            <button className="fc-ai-match-btn">Try AI Match</button>
          </div>
        </aside>

        <div className="fc-results-container">
          <div className="fc-toolbar">
            <p className="fc-results-count">
              <span className="fc-count-number">142</span> candidates found
            </p>
            <div className="fc-toolbar-actions">
              <span className="fc-sort-label">Sort by:</span>
              <div className="fc-sort-select-wrapper">
                <select className="fc-sort-select">
                  <option>Best Skill Match</option>
                  <option>Highest Rating</option>
                  <option>Recently Active</option>
                </select>
                <span className="fc-select-arrow">▼</span>
              </div>
              <div className="fc-divider"></div>
              <button className="fc-view-btn fc-view-active"><Grid size={18} /></button>
              <button className="fc-view-btn"><List size={18} /></button>
            </div>
          </div>

          <div className="fc-candidates-grid">
            <div className="fc-card">
              <div className="fc-card-verified">
                <BadgeCheck size={20} />
              </div>
              <div className="fc-card-header">
                <div className="fc-avatar-wrapper">
                  <div className="fc-avatar fc-avatar-1"></div>
                  <div className="fc-status-dot fc-status-online"></div>
                </div>
                <div className="fc-card-info">
                  <h3 className="fc-card-name">Alex Chen</h3>
                  <p className="fc-card-role">Full Stack Engineer</p>
                  <div className="fc-card-rating-row">
                    <div className="fc-rating-badge fc-badge-gm">GM</div>
                    <span className="fc-rating-number">2,450 Rating</span>
                  </div>
                </div>
              </div>
              <div className="fc-card-activity">
                <div className="fc-activity-header">
                  <span className="fc-activity-label">Contribution Activity</span>
                  <span className="fc-activity-value">Top 1%</span>
                </div>
                <div className="fc-activity-bars">
                  <div className="fc-bar fc-bar-80"></div>
                  <div className="fc-bar fc-bar-100"></div>
                  <div className="fc-bar fc-bar-100"></div>
                  <div className="fc-bar fc-bar-60"></div>
                  <div className="fc-bar fc-bar-40"></div>
                </div>
              </div>
              <div className="fc-card-skills">
                <span className="fc-skill-tag fc-skill-primary">S1: Algo 92%</span>
                <span className="fc-skill-tag">React</span>
                <span className="fc-skill-tag">Node.js</span>
              </div>
              <div className="fc-card-actions">
                <button className="fc-invite-btn">Invite</button>
                <button className="fc-chat-btn">
                  <MessageSquare size={18} />
                </button>
              </div>
            </div>
          </div>

          <div className="fc-pagination">
            <button className="fc-page-btn fc-page-nav"><ChevronLeft size={20} /></button>
            <button className="fc-page-btn fc-page-active">1</button>
            <button className="fc-page-btn">2</button>
            <button className="fc-page-btn">3</button>
            <span className="fc-page-ellipsis">...</span>
            <button className="fc-page-btn">12</button>
            <button className="fc-page-btn fc-page-nav"><ChevronRight size={20} /></button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default FindCollaborators;