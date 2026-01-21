import React, { useState } from 'react';
import '../style/postproject.css';
import { X, Info, Plus, Minus, Zap, Trash2, Edit2 } from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';

// Core project table
type PostProject = {
  projecttitle: string;
  projectsummary: string;
  projectvisibility: string;
  projectcategory: string;
};

// Narrative table
type ProjectNarrative = {
  problemstatement: string;
  problemsolution: string;
  repolink: string;
};

// Team table
type Team = {
  desired_member_number: number;
  min_rating: number;
  roles_required: string[];
};

// Collaboration table
type CollaborationSettings = {
  expected_commitment: string;
  project_duration: string;
  start_timeline: "immediate" | "scheduled";
  timezone_preference: string;
  collaboration_style: "async" | "sync";
  communication_norms: string;
};

// UI-only
type DeliverableItemType = {
  id: number;
  text: string;
  completed: boolean;
};


const ProjectPostPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [postProject, setPostProject] = useState<PostProject>({
    projecttitle: "",
    projectsummary: "",
    projectvisibility: "Public",
    projectcategory: "",
  });

  const [narrative, setNarrative] = useState<ProjectNarrative>({
    problemstatement: "",
    problemsolution: "",
    repolink: "",
  });

  const [team, setTeam] = useState<Team>({
    desired_member_number: 1,
    min_rating: 0,
    roles_required: ["Full Stack Developer"],
  });

  const [collaboration, setCollaboration] = useState<CollaborationSettings>({
    expected_commitment: "Part-time",
    project_duration: "1-3 Months",
    start_timeline: "immediate",
    timezone_preference: "Global",
    collaboration_style: "async",
    communication_norms: "",
  });

  const [skills, setSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState("");
  const [deliverables, setDeliverables] = useState<DeliverableItemType[]>([]);
  const [newDeliverableInput, setNewDeliverableInput] = useState("");
  const [done, setDone] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editText, setEditText] = useState("");
  const [activeTimeline, setActiveTimeline] = useState<"immediate" | "scheduled">("immediate");
  const [ratingValue, setRatingValue] = useState(0);
  const [teamSize, setTeamSize] = useState(1);


  // --- Handlers (Logic) ---
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setPostProject(prev => ({ ...prev, [name]: value }));
  };

  const handleSummaryChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setPostProject(prev => ({ ...prev, [name]: value }));
  };

  const handleCollaborationChange = (
    style: "async" | "sync"
  ) => {
    setCollaboration(prev => ({ ...prev, collaboration_style: style }));
  };

  const handleTimelineChange = (timeline: "immediate" | "scheduled") => {
    setActiveTimeline(timeline);
    setCollaboration(prev => ({ ...prev, start_timeline: timeline }));
  };

  const handleRatingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setRatingValue(val);
    setTeam(prev => ({ ...prev, min_rating: val * 20 }));
  };

  const handleIncrementTeam = () => {
    const n = Math.min(teamSize + 1, 10);
    setTeamSize(n);
    setTeam(t => ({ ...t, desired_member_number: n }));
  };

  const handleDecrementTeam = () => {
    const n = Math.max(teamSize - 1, 1);
    setTeamSize(n);
    setTeam(t => ({ ...t, desired_member_number: n }));
  };

  const handleSkillInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSkillInput(e.target.value);
  };

  const handleSkillInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && skillInput.trim()) {
      setSkills([...skills, skillInput.trim()]);
      setSkillInput("");
    }
  };

  const handleRemoveSkill = (index: number) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  const handleDeliverableToggle = (id: number) => {
    setDeliverables(deliverables.map(d => d.id === id ? { ...d, completed: !d.completed } : d));
  };

  const handleEditDeliverable = (id: number, text: string) => {
    setEditingId(id);
    setEditText(text);
  };

  const handleSaveEdit = (id: number) => {
    setDeliverables(deliverables.map(d => d.id === id ? { ...d, text: editText } : d));
    setEditingId(null);
    setEditText("");
  };

  const handleEditKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, id: number) => {
    if (e.key === "Enter") handleSaveEdit(id);
    if (e.key === "Escape") setEditingId(null);
  };

  const handleDeleteDeliverable = (id: number) => {
    setDeliverables(deliverables.filter(d => d.id !== id));
  };

  const handleNewDeliverableChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewDeliverableInput(e.target.value);
  };

  const handleNewDeliverableKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && newDeliverableInput.trim()) {
      handleAddDeliverable();
    }
  };

  const handleCheckboxKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") setDone(!done);
  };

  const handleAddDeliverable = () => {
    if (newDeliverableInput.trim()) {
      const newId = Math.max(0, ...deliverables.map(d => d.id)) + 1;
      setDeliverables([...deliverables, { id: newId, text: newDeliverableInput, completed: done }]);
      setNewDeliverableInput("");
      setDone(false);
    }
  };

  const handleRadioInput = (e: React.MouseEvent<HTMLDivElement>, style: "async" | "sync") => {
    handleCollaborationChange(style);
  };

  const handleSaveDraft = () => {
    alert("Draft saved!");
  };

  const summaryCharCount = postProject.projectsummary.length;
  const percent = ratingValue;

  const getRatingDisplay = () => {
    const ratings = ["Newbie", "Beginner", "Intermediate", "Advanced", "Expert"];
    const index = Math.floor(ratingValue / 20);
    return ratings[Math.min(index, 4)];
  };


  const handlePostProject = async () => {
    if (!postProject.projecttitle.trim() || !postProject.projectsummary.trim()) {
      alert("⚠️ Please enter a project title and summary.");
      return;
    }

    setLoading(true);

    const payload = {
      post_project: postProject,
      narrative: narrative,
      team: team,
      collaboration: collaboration,
      techstack: skills.map((s: string) => ({ skill: s })),
      deliverables: deliverables.map((d: DeliverableItemType) => ({
        deliverablename: d.text,
      })),
    };

    try {
      const response = await fetch("http://127.0.0.1:8000/api/projects/create/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Network error");

      console.log("Success:", payload);
      alert("🚀 Project posted successfully!");
      navigate("/myproposals");
    } catch (err) {
      console.error(err);
      alert("❌ Failed to post project.");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="pp-project-post-container">
      <div className="pp-main-content">
        <div className="pp-left-column">
          <section className="pp-form-section">
            <div className="pp-section-header">
              <div className="pp-section-icon pp-blue">1</div>
              <h2 className="pp-section-title">Basic Project Details</h2>
            </div>

            {/* Project Title Input */}
            <div className="pp-form-group">
              <label className="pp-form-label">
                Project Title <span className="pp-required">*</span>
              </label>
              <input
                type="text"
                name="projecttitle"
                className="pp-form-input"
                placeholder="e.g. Decentralized Voting System for DAOs"
                value={postProject.projecttitle}
                onChange={handleInputChange}
              />
            </div>

            {/* Project Summary */}
            <div className="pp-form-group">
              <label className="pp-form-label">
                Short Summary <span className="pp-required">*</span>
              </label>
              <div className="pp-char-count">
                Card/Live-pitch ({postProject.projectsummary.length}/140 chars)
              </div>
              <textarea
                name="projectsummary"
                className="pp-form-textarea"
                placeholder="Briefly describe what you're building to attract clicks..."
                rows={3}
                value={postProject.projectsummary}
                onChange={handleInputChange}
                maxLength={140}
              />
            </div>

            {/* Category and Visibility */}
            <div className="pp-form-row">
              <div className="pp-form-group">
                <label className="pp-form-label">Category / Domain</label>
                <select
                  name="projectcategory"
                  className="pp-form-select"
                  value={postProject.projectcategory}
                  onChange={handleInputChange}
                >
                  <option value="" >Select Project Category</option>
                  <option value="webdev" >Web Development</option>
                  <option value="aimldev">AI/ML Development</option>
                  <option value="dsa">Data Structure & Algorithm</option>
                  <option value="cybersecurity">Cyber Security</option>
                </select>
              </div>
              <div className="pp-form-group">
                <label className="pp-form-label">
                  Visibility <Info size={14} className="pp-info-icon" />
                </label>
                <div className="pp-visibility-select">
                  <select
                    name="projectvisibility"
                    className="pp-form-select"
                    value={postProject.projectvisibility}
                    onChange={handleInputChange}
                  >
                    <option>Public (Recommended)</option>
                    <option>Private</option>
                    <option>Unlisted</option>
                  </select>
                  <span className="pp-copy-icon">📋</span>
                </div>
              </div>
            </div>
          </section>

          {/* Project Narrative */}
          <section className="pp-form-section">
            <div className="pp-section-header">
              <div className="pp-section-icon pp-purple">2</div>
              <h2 className="pp-section-title">Project Narrative</h2>
              <p className="pp-section-subtitle">
                Help collaborators quickly understand <strong>why</strong> this matters and <strong>how</strong> you'll build it.
              </p>
            </div>

            <div className="pp-narrative-card">
              {/* WHY */}
              <div className="pp-narrative-block">
                <div className="pp-narrative-head">
                  🔥 <h3>The Problem (Why)</h3>
                </div>

                <p className="pp-narrative-helper">
                  Explain the core problem you're solving. Focus on pain points, users affected, and why existing solutions fall short.
                </p>

                <textarea
                  name="problemstatement"
                  className="pp-narrative-textarea"
                  placeholder={`Example:\nCurrent DAO voting systems are slow...`}
                  rows={6}
                  value={narrative.problemstatement}
                  onChange={(e) => setNarrative(prev => ({ ...prev, problemstatement: e.target.value }))}
                />
              </div>

              {/* HOW */}
              <div className="pp-narrative-block">
                <div className="pp-narrative-head">
                  🎯 <h3>The Solution (How)</h3>
                </div>

                <p className="pp-narrative-helper">
                  Describe your technical approach: architecture, stack, workflows, and key constraints.
                </p>

                <textarea
                  name="problemsolution"
                  className="pp-narrative-textarea"
                  placeholder={`Example:\n• Frontend: Next.js + Tailwind...`}
                  rows={7}
                  value={narrative.problemsolution}
                  onChange={(e) => setNarrative(prev => ({ ...prev, problemsolution: e.target.value }))}
                />
              </div>
            </div>

            <div className="pp-form-group" style={{ marginTop: '20px' }}>
              <label className="pp-form-label">
                Repository / Demo Link <span className="pp-optional">Optional</span>
              </label>
              <input
                type="text"
                name="repolink"
                className="pp-form-input"
                placeholder="🔗 https://github.com/username/repo"
                value={narrative.repolink}
                onChange={(e) => setNarrative(prev => ({ ...prev, repolink: e.target.value }))}
              />
            </div>

            <div className="pp-deliverables-section">
              <h3 className="pp-deliverables-title">🎯 Key Deliverables & Goals</h3>
              {deliverables.map((deliverable: DeliverableItemType) => (
                <div
                  key={deliverable.id}
                  className="pp-deliverable-item"
                  style={{
                    backgroundColor: deliverable.completed ? 'rgba(34, 197, 94, 0.08)' : 'transparent',
                    transition: 'all 0.2s ease',
                    padding: '10px 12px',
                    borderRadius: '6px',
                    marginBottom: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                  }}
                >
                  <input
                    type="checkbox"
                    checked={deliverable.completed}
                    onChange={() => handleDeliverableToggle(deliverable.id)}
                    className="pp-checkbox"
                    style={{ flexShrink: 0 }}
                  />

                  {editingId === deliverable.id ? (
                    <input
                      type="text"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      onKeyDown={(e) => handleEditKeyDown(e, deliverable.id)}
                      onBlur={() => handleSaveEdit(deliverable.id)}
                      autoFocus
                      className="pp-deliverable-input"
                      style={{ flex: 1 }}
                    />
                  ) : (
                    <span
                      className="pp-deliverable-text"
                      style={{ flex: 1, cursor: 'pointer' }}
                      onClick={() => handleEditDeliverable(deliverable.id, deliverable.text)}
                    >
                      {deliverable.text}
                    </span>
                  )}

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginLeft: 'auto' }}>
                    {deliverable.completed && (
                      <span className="pp-status-badge pp-done">DONE</span>
                    )}
                    <button
                      onClick={() => handleEditDeliverable(deliverable.id, deliverable.text)}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', display: 'flex', alignItems: 'center', color: '#64748b' }}
                      title="Edit"
                    >
                      <Edit2 size={14} />
                    </button>
                    <button
                      onClick={() => handleDeleteDeliverable(deliverable.id)}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', display: 'flex', alignItems: 'center', color: '#64748b' }}
                      title="Delete"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}

              <div
                className="pp-deliverable-item"
                style={{
                  backgroundColor: done ? 'rgba(34, 197, 94, 0.08)' : 'transparent',
                  padding: '10px 12px',
                  borderRadius: '6px',
                  marginBottom: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px'
                }}
              >
                <input
                  type="checkbox"
                  className="pp-checkbox"
                  checked={done}
                  onChange={(e) => setDone(e.target.checked)}
                  onKeyDown={handleCheckboxKeyDown}
                  disabled={!newDeliverableInput.trim()}
                  style={{ flexShrink: 0 }}
                />
                <input
                  type="text"
                  className="pp-deliverable-input"
                  placeholder="Add a milestone or goal..."
                  value={newDeliverableInput}
                  onChange={handleNewDeliverableChange}
                  onKeyDown={handleNewDeliverableKeyDown}
                  style={{ flex: 1 }}
                />
              </div>

              <button className="pp-add-item-btn" onClick={handleAddDeliverable}>
                + Add Item
              </button>
            </div>
          </section>

          {/* Skills & Requirements */}
          <section className="pp-form-section">
            <div className="pp-section-header">
              <div className="pp-section-icon pp-purple-circle">3</div>
              <h2 className="pp-section-title">Skills & Requirements</h2>
            </div>

            <div className="pp-form-group">
              <label className="pp-form-label">Required Skills / Tech Stack</label>
              <div className="pp-skills-input">
                {skills.map((skill: string, index: number) => (
                  <span key={index} className="pp-skill-tag">
                    {skill}
                    <X
                      size={12}
                      className="pp-skill-remove"
                      onClick={() => handleRemoveSkill(index)}
                      style={{ cursor: 'pointer' }}
                    />
                  </span>
                ))}
                <input
                  type="text"
                  className="pp-skill-input-field"
                  placeholder="Type and press Enter..."
                  value={skillInput}
                  onChange={handleSkillInputChange}
                  onKeyDown={handleSkillInputKeyDown}
                />
              </div>
            </div>

            <div className="pp-form-row">
              <div className="pp-form-group">
                <label className="pp-form-label">Min. Platform Rating</label>
                <div className="pp-rating-slider">
                  <span className="pp-rating-label">Newbie</span>
                  <input
                    type="range"
                    className="pp-slider"
                    min="0"
                    max="100"
                    value={ratingValue}
                    onChange={handleRatingChange}
                    style={{
                      background: `linear-gradient(to right, #2563eb 0%, #2563eb ${ratingValue}%, #e2e8f0 ${ratingValue}%, #e2e8f0 100%)`
                    }}
                  />
                  <span className="pp-rating-label">Expert</span>
                </div>
                <div className="pp-rating-value">{getRatingDisplay()}</div>
              </div>

              <div className="pp-form-group">
                <label className="pp-form-label">
                  Desired Team Size <span className="pp-hint">(excluding you)</span>
                </label>
                <div className="pp-team-size-control">
                  <button
                    className="pp-team-btn"
                    onClick={handleDecrementTeam}
                    disabled={teamSize <= 1}
                  >
                    <Minus size={16} />
                  </button>
                  <span className="pp-team-size">{teamSize} Members</span>
                  <button
                    className="pp-team-btn"
                    onClick={handleIncrementTeam}
                    disabled={teamSize >= 10}
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
            </div>

            <div className="pp-alert-box">
              <span className="pp-alert-icon">⚠️</span>
              <div className="pp-alert-text">
                <strong>Strict Requirements Alert</strong>
                <p>Setting the minimum rating above 2000 reduces your candidate pool by ~65%. Consider lowering it for a fresher reach.</p>
              </div>
            </div>
          </section>

          {/* Availability & Collaboration */}
          <section className="pp-form-section">
            <div className="pp-section-header">
              <div className="pp-section-icon pp-cyan">4</div>
              <h2 className="pp-section-title">Availability & Collaboration</h2>
            </div>

            <div className="pp-form-row">
              <div className="pp-form-group">
                <label className="pp-form-label">Expected Commitment</label>
                <select
                  name="expected_commitment"
                  className="pp-form-select"
                  value={collaboration.expected_commitment}
                  onChange={(e) => setCollaboration(prev => ({ ...prev, expected_commitment: e.target.value }))}
                >
                  <option>Part-time (10-20 hrs/week)</option>
                  <option>Full-time (40+ hrs/week)</option>
                  <option>Flexible</option>
                </select>
              </div>
              <div className="pp-form-group">
                <label className="pp-form-label">Project Duration</label>
                <select
                  name="project_duration"
                  className="pp-form-select"
                  value={collaboration.project_duration}
                  onChange={(e) => setCollaboration(prev => ({ ...prev, project_duration: e.target.value }))}
                >
                  <option>1-3 Months</option>
                  <option>3-6 Months</option>
                  <option>6-12 Months</option>
                  <option>12+ Months</option>
                </select>
              </div>
            </div>

            <div className="pp-form-row">
              <div className="pp-form-group">
                <label className="pp-form-label">Start Timeline</label>
                <div className="pp-timeline-tabs">
                  <button
                    className={`pp-timeline-tab ${activeTimeline === 'immediate' ? 'pp-active' : ''}`}
                    onClick={() => handleTimelineChange('immediate')}
                  >
                    Immediate
                  </button>
                  <button
                    className={`pp-timeline-tab ${activeTimeline === 'scheduled' ? 'pp-active' : ''}`}
                    onClick={() => handleTimelineChange('scheduled')}
                  >
                    Scheduled
                  </button>
                </div>

                {activeTimeline === 'scheduled' && (
                  <div className="pp-start-date-block" style={{ marginTop: '20px' }}>
                    <label className="pp-form-label">Start Date</label>
                    <input
                      type="date"
                      name="startDate"
                      className="pp-form-input"
                      value=""
                      onChange={() => { }}
                    />
                    <small className="pp-hint">Select a start date or type it directly (YYYY-MM-DD).</small>
                  </div>
                )}
              </div>

              <div className="pp-form-group">
                <label className="pp-form-label">Timezone Preference</label>
                <select
                  name="timezone_preference"
                  className="pp-form-select"
                  value={collaboration.timezone_preference}
                  onChange={(e) => setCollaboration(prev => ({ ...prev, timezone_preference: e.target.value }))}
                >
                  <option>Global (Any Timezone)</option>
                  <option>Americas (UTC-8 to UTC-4)</option>
                  <option>Europe (UTC+0 to UTC+3)</option>
                  <option>Asia (UTC+5 to UTC+9)</option>
                </select>
              </div>
            </div>

            <div className="pp-form-row">
              <div className="pp-form-group">
                <label className="pp-form-label">Collaboration Style</label>
                <div className="pp-radio-group">
                  <label className="pp-radio-option">
                    <input
                      type="radio"
                      name="collab"
                      checked={collaboration.collaboration_style === 'async'}
                      onChange={() => handleCollaborationChange('async')}
                    />
                    <div onClick={(e) => handleRadioInput(e, 'async')}>
                      <strong>Async First</strong>
                      <p className="pp-radio-desc">Written comms, minimal meetings.</p>
                    </div>
                  </label>
                  <label className="pp-radio-option">
                    <input
                      type="radio"
                      name="collab"
                      checked={collaboration.collaboration_style === 'sync'}
                      onChange={() => handleCollaborationChange('sync')}
                    />
                    <div onClick={(e) => handleRadioInput(e, 'sync')}>
                      <strong>Synchronous</strong>
                      <p className="pp-radio-desc">Regular meetings, real-time collab.</p>
                    </div>
                  </label>
                </div>
              </div>
              <div className="pp-form-group">
                <label className="pp-form-label">Communication Norms</label>
                <textarea
                  name="communication_norms"
                  className="pp-form-textarea"
                  placeholder="e.g. We use Discord for daily chat and Notion for tasks. Weekly stand-up on Mondays."
                  rows={3}
                  value={collaboration.communication_norms}
                  onChange={(e) => setCollaboration(prev => ({ ...prev, communication_norms: e.target.value }))}
                />
              </div>
            </div>
          </section>
        </div>

        {/* Right Column - Smart Match */}
        <div className="pp-right-column">
          <div className="pp-smart-match-card">
            <div className="pp-smart-match-header">
              <Zap size={16} fill="#FFD700" color="#FFD700" />
              <span>Smart Match</span>
              <span className="pp-live-badge">LIVE</span>
            </div>
            {/* Reconstructed based on context since prompt cut off here */}
            <div className="pp-match-stats">
              <div className="pp-stat">
                <div className="pp-stat-number">{15 - Math.floor(ratingValue / 10)}</div>
                <div className="pp-stat-label">Candidates</div>
              </div>
              <div className="pp-stat">
                <div className="pp-stat-number pp-green">{70 + (skills.length * 5)}%</div>
                <div className="pp-stat-label">Avg Match</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pp-inline-actions">
        <button className="pp-footer-btn pp-secondary" onClick={handleSaveDraft}>Save Draft</button>
        <button className="pp-footer-btn pp-primary" onClick={handlePostProject} disabled={loading}>
          {loading ? 'Posting...' : '🚀 Post Project'}
        </button>
      </div>
    </div>
  );
};

export default ProjectPostPage;