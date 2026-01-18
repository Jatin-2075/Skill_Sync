import React from 'react';
import { Info, Grid, List, ChevronLeft, ChevronRight } from 'lucide-react';
import './findcollaborators.css';
import { NavLink } from "react-router-dom";


const FindCollaborators = () => {



  return (
    <main className="fc-main-container">
      {/* Header Section */}
      <div className="fc-header-section">
        <div className="fc-header-content">
          <div className="fc-header-text">
            <h1 className="fc-page-title">Team Recruitment</h1>
            <p className="fc-page-description">
              Find the perfect teammate. Filter by skill vectors, rating, and availability to build your dream team.
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="fc-tabs-border">
          <nav className="fc-tabs-nav">
            <NavLink
              to="/findcollaborators"
              className={({ isActive }) =>
                isActive ? "fc-tab fc-tab-active" : "fc-tab"
              }
            >
              Find Collaborators
            </NavLink>

            <NavLink
              to="/postproject"
              className={({ isActive }) =>
                isActive ? "fc-tab fc-tab-active" : "fc-tab"
              }
            >
              Post a Project
              <span className="fc-tab-badge fc-badge-new">NEW</span>
            </NavLink>

            <NavLink
              to="/myproposals"
              className={({ isActive }) =>
                isActive ? "fc-tab fc-tab-active" : "fc-tab"
              }
            >
              My Proposals
              <span className="fc-tab-badge fc-badge-count">2</span>
            </NavLink>
          </nav>
        </div>
      </div>

      <div className="fc-content-wrapper">

        <aside className="fc-sidebar">
          {/* Smart Search Card */}
          <div className="fc-filter-card">
            <div className="fc-filter-header">
              <h3 className="fc-filter-title">Refine Search</h3>
              <button className="fc-reset-btn">Reset</button>
            </div>

            <div className="fc-filter-sections">
              {/* Platform Rating */}
              <div className="fc-filter-section">
                <label className="fc-filter-label">PLATFORM RATING</label>
                <div className="fc-rating-slider-container">
                  <div className="fc-slider-track">
                    <div className="fc-slider-filled"></div>
                    <div className="fc-slider-thumb"></div>
                  </div>
                  <span className="fc-rating-value">2400+</span>
                </div>
              </div>

              {/* Skill Vectors */}
              <div className="fc-filter-section">
                <label className="fc-filter-label">SKILL VECTORS (Thresholds)</label>
                <div className="fc-skill-vectors">
                  <div className="fc-skill-item">
                    <div className="fc-skill-header">
                      <span className="fc-skill-name">S1: Algorithms</span>
                      <span className="fc-skill-percent fc-skill-active">80%</span>
                    </div>
                    <div className="fc-skill-bar">
                      <div className="fc-skill-progress" style={{ width: '80%' }}></div>
                    </div>
                  </div>

                  <div className="fc-skill-item">
                    <div className="fc-skill-header">
                      <span className="fc-skill-name">S2: Sys Design</span>
                      <span className="fc-skill-percent">Min %</span>
                    </div>
                    <div className="fc-skill-bar">
                      <div className="fc-skill-progress fc-skill-inactive"></div>
                    </div>
                  </div>

                  <div className="fc-skill-item">
                    <div className="fc-skill-header">
                      <span className="fc-skill-name">S3: Frontend</span>
                      <span className="fc-skill-percent">Min %</span>
                    </div>
                    <div className="fc-skill-bar">
                      <div className="fc-skill-progress fc-skill-inactive"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Rank Tier */}
              <div className="fc-filter-section">
                <label className="fc-filter-label">RANK TIER</label>
                <select className="fc-select">
                  <option>Grandmaster</option>
                  <option>Master</option>
                  <option>Expert</option>
                  <option>Candidate</option>
                </select>
              </div>

              {/* Availability */}
              <div className="fc-filter-section">
                <label className="fc-filter-label">AVAILABILITY</label>
                <div className="fc-checkbox-group">
                  <label className="fc-checkbox-label">
                    <input type="checkbox" className="fc-checkbox" defaultChecked />
                    <span className="fc-checkbox-text">Immediate Start</span>
                  </label>
                  <label className="fc-checkbox-label">
                    <input type="checkbox" className="fc-checkbox" />
                    <span className="fc-checkbox-text">Weekend Only</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* AI Match Banner */}
          <div className="fc-ai-match-card">
            <div className="fc-ai-match-bg"></div>
            <h4 className="fc-ai-match-title">Smart Match</h4>
            <p className="fc-ai-match-desc">
              Describe your project, and our AI will find the perfect team configuration.
            </p>
            <button className="fc-ai-match-btn">Try AI Match</button>
          </div>
        </aside>

        {/* Results Grid */}
        <div className="fc-results-container">
          {/* Toolbar */}
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

              <button className="fc-view-btn fc-view-active">
                <Grid size={20} />
              </button>
              <button className="fc-view-btn">
                <List size={20} />
              </button>
            </div>
          </div>

          {/* Candidates Grid */}
          <div className="fc-candidates-grid">
            {/* Candidate Card 1 */}
            <div className="fc-card">
              <div className="fc-card-verified">✓</div>
              
              <div className="fc-card-header">
                <div className="fc-avatar-wrapper">
                  <div className="fc-avatar fc-avatar-1"></div>
                  <div className="fc-status-dot fc-status-online"></div>
                </div>
                <div className="fc-card-info">
                  <h3 className="fc-card-name">Alex Chen</h3>
                  <p className="fc-card-role">Full Stack Engineer</p>
                  <div className="fc-card-rating">
                    <div className="fc-rating-badge fc-badge-gm">GM</div>
                    <span className="fc-rating-number">2,450 Rating</span>
                  </div>
                </div>
              </div>

              <div className="fc-card-activity">
                <div className="fc-activity-header">
                  <span className="fc-activity-label">Contribution Activity</span>
                  <span className="fc-activity-value fc-top1">Top 1%</span>
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
                <button className="fc-chat-btn">💬</button>
              </div>
            </div>

            {/* Candidate Card 2 */}
            <div className="fc-card">
              <div className="fc-card-verified fc-verified-gray">✓</div>
              
              <div className="fc-card-header">
                <div className="fc-avatar-wrapper">
                  <div className="fc-avatar fc-avatar-2"></div>
                </div>
                <div className="fc-card-info">
                  <h3 className="fc-card-name">Sarah Jenkins</h3>
                  <p className="fc-card-role">Systems Architect</p>
                  <div className="fc-card-rating">
                    <div className="fc-rating-badge fc-badge-m">M</div>
                    <span className="fc-rating-number">2,100 Rating</span>
                  </div>
                </div>
              </div>

              <div className="fc-card-activity">
                <div className="fc-activity-header">
                  <span className="fc-activity-label">Contribution Activity</span>
                  <span className="fc-activity-value">Top 10%</span>
                </div>
                <div className="fc-activity-bars">
                  <div className="fc-bar fc-bar-60"></div>
                  <div className="fc-bar fc-bar-60"></div>
                  <div className="fc-bar fc-bar-40"></div>
                  <div className="fc-bar fc-bar-0"></div>
                  <div className="fc-bar fc-bar-0"></div>
                </div>
              </div>

              <div className="fc-card-skills">
                <span className="fc-skill-tag fc-skill-secondary">S2: Sys 88%</span>
                <span className="fc-skill-tag">Kubernetes</span>
                <span className="fc-skill-tag">Go</span>
              </div>

              <div className="fc-card-actions">
                <button className="fc-invite-btn">Invite</button>
                <button className="fc-chat-btn">💬</button>
              </div>
            </div>

            {/* Candidate Card 3 */}
            <div className="fc-card">
              <div className="fc-card-verified">✓</div>
              
              <div className="fc-card-header">
                <div className="fc-avatar-wrapper">
                  <div className="fc-avatar fc-avatar-3"></div>
                  <div className="fc-status-dot fc-status-offline"></div>
                </div>
                <div className="fc-card-info">
                  <h3 className="fc-card-name">David Kim</h3>
                  <p className="fc-card-role">Algorithm Specialist</p>
                  <div className="fc-card-rating">
                    <div className="fc-rating-badge fc-badge-e">E</div>
                    <span className="fc-rating-number">1,950 Rating</span>
                  </div>
                </div>
              </div>

              <div className="fc-card-activity">
                <div className="fc-activity-header">
                  <span className="fc-activity-label">Contribution Activity</span>
                  <span className="fc-activity-value">Top 25%</span>
                </div>
                <div className="fc-activity-bars">
                  <div className="fc-bar fc-bar-80"></div>
                  <div className="fc-bar fc-bar-60"></div>
                  <div className="fc-bar fc-bar-20"></div>
                  <div className="fc-bar fc-bar-20"></div>
                  <div className="fc-bar fc-bar-0"></div>
                </div>
              </div>

              <div className="fc-card-skills">
                <span className="fc-skill-tag fc-skill-primary">S1: Algo 98%</span>
                <span className="fc-skill-tag">C++</span>
                <span className="fc-skill-tag">Rust</span>
              </div>

              <div className="fc-card-actions">
                <button className="fc-invite-btn">Invite</button>
                <button className="fc-chat-btn">💬</button>
              </div>
            </div>

            {/* Candidate Card 4 */}
            <div className="fc-card">
              <div className="fc-card-verified">✓</div>
              
              <div className="fc-card-header">
                <div className="fc-avatar-wrapper">
                  <div className="fc-avatar fc-avatar-4"></div>
                  <div className="fc-status-dot fc-status-online"></div>
                </div>
                <div className="fc-card-info">
                  <h3 className="fc-card-name">Maria Garcia</h3>
                  <p className="fc-card-role">UX/UI Engineer</p>
                  <div className="fc-card-rating">
                    <div className="fc-rating-badge fc-badge-c">C</div>
                    <span className="fc-rating-number">1,600 Rating</span>
                  </div>
                </div>
              </div>

              <div className="fc-card-activity">
                <div className="fc-activity-header">
                  <span className="fc-activity-label">Contribution Activity</span>
                  <span className="fc-activity-value">Rising Star</span>
                </div>
                <div className="fc-activity-bars">
                  <div className="fc-bar fc-bar-40"></div>
                  <div className="fc-bar fc-bar-40"></div>
                  <div className="fc-bar fc-bar-20"></div>
                  <div className="fc-bar fc-bar-0"></div>
                  <div className="fc-bar fc-bar-0"></div>
                </div>
              </div>

              <div className="fc-card-skills">
                <span className="fc-skill-tag fc-skill-tertiary">S3: Front 95%</span>
                <span className="fc-skill-tag">Figma</span>
                <span className="fc-skill-tag">Tailwind</span>
              </div>

              <div className="fc-card-actions">
                <button className="fc-invite-btn">Invite</button>
                <button className="fc-chat-btn">💬</button>
              </div>
            </div>

            {/* Candidate Card 5 */}
            <div className="fc-card">
              <div className="fc-card-verified fc-verified-gray">✓</div>
              
              <div className="fc-card-header">
                <div className="fc-avatar-wrapper">
                  <div className="fc-avatar fc-avatar-5"></div>
                </div>
                <div className="fc-card-info">
                  <h3 className="fc-card-name">James Wilson</h3>
                  <p className="fc-card-role">DevOps Engineer</p>
                  <div className="fc-card-rating">
                    <div className="fc-rating-badge fc-badge-e">E</div>
                    <span className="fc-rating-number">1,820 Rating</span>
                  </div>
                </div>
              </div>

              <div className="fc-card-activity">
                <div className="fc-activity-header">
                  <span className="fc-activity-label">Contribution Activity</span>
                  <span className="fc-activity-value">Stable</span>
                </div>
                <div className="fc-activity-bars">
                  <div className="fc-bar fc-bar-40"></div>
                  <div className="fc-bar fc-bar-40"></div>
                  <div className="fc-bar fc-bar-0"></div>
                  <div className="fc-bar fc-bar-0"></div>
                  <div className="fc-bar fc-bar-0"></div>
                </div>
              </div>

              <div className="fc-card-skills">
                <span className="fc-skill-tag fc-skill-secondary">S2: Sys 82%</span>
                <span className="fc-skill-tag">Docker</span>
                <span className="fc-skill-tag">AWS</span>
              </div>

              <div className="fc-card-actions">
                <button className="fc-invite-btn">Invite</button>
                <button className="fc-chat-btn">💬</button>
              </div>
            </div>

            {/* Candidate Card 6 */}
            <div className="fc-card">
              <div className="fc-card-verified">✓</div>
              
              <div className="fc-card-header">
                <div className="fc-avatar-wrapper">
                  <div className="fc-avatar fc-avatar-6"></div>
                  <div className="fc-status-dot fc-status-online"></div>
                </div>
                <div className="fc-card-info">
                  <h3 className="fc-card-name">Priya Patel</h3>
                  <p className="fc-card-role">Data Scientist</p>
                  <div className="fc-card-rating">
                    <div className="fc-rating-badge fc-badge-m">M</div>
                    <span className="fc-rating-number">2,310 Rating</span>
                  </div>
                </div>
              </div>

              <div className="fc-card-activity">
                <div className="fc-activity-header">
                  <span className="fc-activity-label">Contribution Activity</span>
                  <span className="fc-activity-value fc-top5">Top 5%</span>
                </div>
                <div className="fc-activity-bars">
                  <div className="fc-bar fc-bar-80"></div>
                  <div className="fc-bar fc-bar-80"></div>
                  <div className="fc-bar fc-bar-60"></div>
                  <div className="fc-bar fc-bar-40"></div>
                  <div className="fc-bar fc-bar-0"></div>
                </div>
              </div>

              <div className="fc-card-skills">
                <span className="fc-skill-tag fc-skill-data">S5: Data 94%</span>
                <span className="fc-skill-tag">Python</span>
                <span className="fc-skill-tag">PyTorch</span>
              </div>

              <div className="fc-card-actions">
                <button className="fc-invite-btn">Invite</button>
                <button className="fc-chat-btn">💬</button>
              </div>
            </div>
          </div>

          {/* Pagination */}
          <div className="fc-pagination">
            <button className="fc-page-btn fc-page-nav">
              <ChevronLeft size={20} />
            </button>
            <button className="fc-page-btn fc-page-active">1</button>
            <button className="fc-page-btn">2</button>
            <button className="fc-page-btn">3</button>
            <span className="fc-page-ellipsis">...</span>
            <button className="fc-page-btn">12</button>
            <button className="fc-page-btn fc-page-nav">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default FindCollaborators;