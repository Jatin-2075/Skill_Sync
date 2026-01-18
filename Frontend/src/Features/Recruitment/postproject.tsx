import React, { useState, useEffect } from 'react';
import './postproject.css';
import { X, Info, Plus, Minus, Zap, Trash2, Edit2 } from 'lucide-react';
import { NavLink } from 'react-router-dom';

type PostProjectType = {
  projectTitle: string;
  projectSummary: string;
  projectCategory: string;
  projectVisibility: string;
  desiredTeamMember: number;
  problemStatement: string;
  technicalApproach: string;
  ratingRequired: number;
  currentTeamMember: number;
  repositoryLink: string;
  expectedCommitment: string;
  projectDuration: string;
  startTimeline: string;
  startDate: string;
  timezonePreference: string;
  collaborationStyle: string;
  communicationNorms: string;
  roleLabel: string;
};

type DeliverableItem = {
  id: number;
  text: string;
  completed: boolean;
};

const ProjectPostPage = () => {
  const [skills, setSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState<string>('');
  const [deliverables, setDeliverables] = useState<DeliverableItem[]>([
    { id: 1, text: 'Complete MVP with core voting features', completed: true },
    { id: 2, text: 'Smart contract deployment on testnet', completed: false },
    { id: 3, text: 'Security audit and gas optimization', completed: false }
  ]);
  const [newDeliverableInput, setNewDeliverableInput] = useState<string>('');
  const [teamSize, setTeamSize] = useState<number>(1);
  const [ratingValue, setRatingValue] = useState<number>(30);
  const [activeTimeline, setActiveTimeline] = useState<'immediate' | 'scheduled'>('immediate');
  const [collaborationStyle, setCollaborationStyle] = useState<'async' | 'sync'>('async');
  const [summaryCharCount, setSummaryCharCount] = useState<number>(0);
  const [lastSaved, setLastSaved] = useState<string>('');
  const [done, setDone] = useState<boolean>(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editText, setEditText] = useState<string>('');

  const [formData, setFormData] = useState<PostProjectType>({
    projectTitle: '',
    projectSummary: '',
    projectCategory: 'Web Development',
    projectVisibility: 'Public (Recommended)',
    desiredTeamMember: 0,
    problemStatement: '',
    technicalApproach: '',
    ratingRequired: 0,
    currentTeamMember: 0,
    repositoryLink: '',
    expectedCommitment: 'Part-time (10-20 hrs/week)',
    projectDuration: '1-3 Months',
    startTimeline: 'immediate',
    startDate: '',
    timezonePreference: 'Global (Any Timezone)',
    collaborationStyle: 'async',
    communicationNorms: '',
    roleLabel: 'Full Stack Developer'
  });

  const handleSkillInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSkillInput(e.target.value);
  };

  const handleSkillInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const trimmedskill = skillInput.trim();
      if (!trimmedskill) return;
      if (skills.includes(trimmedskill)) return;
      setSkills(prev => [...prev, trimmedskill]);
      setSkillInput("");
    }
  };

  const handleRemoveSkill = (index: number) => {
    setSkills(prev => prev.filter((_, i) => i !== index));
  };

  const handleIncrementTeam = () => {
    setTeamSize(val => Math.min(val + 1, 10));
  };

  const handleDecrementTeam = () => {
    setTeamSize(val => Math.max(val - 1, 1));
  };

  const handleRatingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRatingValue(Number(e.target.value));
  };

  const getRatingDisplay = (): string => {
    return `${ratingValue * 20}`;
  };

  const handleDeliverableToggle = (id: number) => {
    setDeliverables(prev =>
      prev.map(item =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const handleDeleteDeliverable = (id: number) => {
    setDeliverables(prev => prev.filter(item => item.id !== id));
  };

  const handleEditDeliverable = (id: number, text: string) => {
    setEditingId(id);
    setEditText(text);
  };

  const handleSaveEdit = (id: number) => {
    if (!editText.trim()) return;
    setDeliverables(prev =>
      prev.map(item =>
        item.id === id ? { ...item, text: editText.trim() } : item
      )
    );
    setEditingId(null);
    setEditText('');
  };

  const handleEditKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, id: number) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSaveEdit(id);
    } else if (e.key === 'Escape') {
      setEditingId(null);
      setEditText('');
    }
  };

  const handleAddDeliverable = () => {
    if (!newDeliverableInput.trim()) return;

    const newDeliverable: DeliverableItem = {
      id: Date.now(),
      text: newDeliverableInput.trim(),
      completed: done
    };

    setDeliverables(prev => [...prev, newDeliverable]);
    setNewDeliverableInput('');
    setDone(false);
  };

  const handleNewDeliverableChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewDeliverableInput(e.target.value);
  };

  const handleNewDeliverableKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (!newDeliverableInput.trim()) return;
      handleAddDeliverable();
    }
  };

  const handleCheckboxKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setDone(prev => !prev);
    }
  };

  const handleTimelineChange = (timeline: 'immediate' | 'scheduled') => {
    setActiveTimeline(timeline);
    setFormData(prev => ({
      ...prev,
      startTimeline: timeline
    }));
  };

  const handleCollaborationChange = (style: 'async' | 'sync') => {
    setCollaborationStyle(style);
    setFormData(prev => ({
      ...prev,
      collaborationStyle: style
    }));
  };

  const handleRadioInput = (e: React.MouseEvent<HTMLDivElement>, style: 'async' | 'sync') => {
    handleCollaborationChange(style);
  };

  const handleSummaryChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setSummaryCharCount(value.length);
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveDraft = () => {
    const now = new Date();
    setLastSaved(now.toLocaleTimeString());
    const draftData = {
      ...formData,
      skills,
      deliverables,
      desiredTeamMember: teamSize,
      ratingRequired: ratingValue * 20
    };
    console.log('Draft saved:', draftData);
    alert('✅ Draft saved successfully!');
  };

  const handlePostProject = () => {
    // Basic validation
    if (!formData.projectTitle.trim()) {
      alert('⚠️ Please enter a project title');
      return;
    }
    if (!formData.projectSummary.trim()) {
      alert('⚠️ Please enter a project summary');
      return;
    }

    const projectData = {
      ...formData,
      skills,
      deliverables,
      desiredTeamMember: teamSize,
      ratingRequired: ratingValue * 20
    };

    console.log('Posting project:', projectData);
    alert('🚀 Project posted successfully!');
  };

  const handleClose = () => {
    if (window.confirm('Are you sure you want to close? Unsaved changes will be lost.')) {
      console.log('Closing project post');
    }
  };

  useEffect(() => {
    setSummaryCharCount(formData.projectSummary.length);
  }, [formData.projectSummary]);

  const percent = ratingValue;

  return (
    <div className="pp-project-post-container">
      <div className="pp-header-section">
        <div className="pp-header-content">
          <div className="pp-header-text">
            <h1 className="pp-page-title">Team Recruitment</h1>
            <p className="pp-page-description">
              Find the perfect teammate. Filter by skill vectors, rating, and availability to build your dream team.
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="pp-tabs-border">
          <nav className="pp-tabs-nav">
            <NavLink
              to="/findcollaborators"
              className={({ isActive }) =>
                isActive ? "pp-tab pp-tab-active" : "pp-tab"
              }
            >
              Find Collaborators
            </NavLink>

            <NavLink
              to="/postproject"
              className={({ isActive }) =>
                isActive ? "pp-tab pp-tab-active" : "pp-tab"
              }
            >
              Post a Project
              <span className="pp-tab-badge pp-badge-new">NEW</span>
            </NavLink>

            <NavLink
              to="/myproposals"
              className={({ isActive }) =>
                isActive ? "pp-tab pp-tab-active" : "pp-tab"
              }
            >
              My Proposals
              <span className="pp-tab-badge pp-badge-count">2</span>
            </NavLink>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="pp-main-content">
        {/* Left Column */}
        <div className="pp-left-column">
          {/* Basic Project Details */}
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
                name="projectTitle"
                className="pp-form-input"
                placeholder="e.g. Decentralized Voting System for DAOs"
                value={formData.projectTitle}
                onChange={handleInputChange}
              />
            </div>

            {/* Project Summary with character counter */}
            <div className="pp-form-group">
              <label className="pp-form-label">
                Short Summary <span className="pp-required">*</span>
              </label>
              <div className="pp-char-count">
                Card/Live-pitch ({summaryCharCount}/140 chars)
              </div>
              <textarea
                name="projectSummary"
                className="pp-form-textarea"
                placeholder="Briefly describe what you're building to attract clicks..."
                rows={3}
                value={formData.projectSummary}
                onChange={handleSummaryChange}
                maxLength={140}
              />
            </div>

            {/* Category and Visibility selects */}
            <div className="pp-form-row">
              <div className="pp-form-group">
                <label className="pp-form-label">Category / Domain</label>
                <select
                  name="projectCategory"
                  className="pp-form-select"
                  value={formData.projectCategory}
                  onChange={handleInputChange}
                >
                  <option>Web Development</option>
                  <option>AI/ML Development</option>
                  <option>Data Structure & Algorithm</option>
                  <option>Cyber Security</option>
                </select>
              </div>
              <div className="pp-form-group">
                <label className="pp-form-label">
                  Visibility <Info size={14} className="pp-info-icon" />
                </label>
                <div className="pp-visibility-select">
                  <select
                    name="projectVisibility"
                    className="pp-form-select"
                    value={formData.projectVisibility}
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
                  name="problemStatement"
                  className="pp-narrative-textarea"
                  placeholder={`Example:
Current DAO voting systems are slow, opaque, and vulnerable to manipulation.
Small token holders lack meaningful participation, leading to low governance engagement...`}
                  rows={6}
                  value={formData.problemStatement}
                  onChange={handleInputChange}
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
                  name="technicalApproach"
                  className="pp-narrative-textarea"
                  placeholder={`Example:
• Frontend: Next.js + Tailwind
• Backend: Node.js + PostgreSQL
• Smart Contracts: Solidity (ERC-20 voting)
• Data flow: Wallet → API → Smart Contract
• Constraints: gas optimization, security audits`}
                  rows={7}
                  value={formData.technicalApproach}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {/* Repository/Demo link input */}
            <div className="pp-form-group" style={{ marginTop: '20px' }}>
              <label className="pp-form-label">
                Repository / Demo Link <span className="pp-optional">Optional</span>
              </label>
              <input
                type="text"
                name="repositoryLink"
                className="pp-form-input"
                placeholder="🔗 https://github.com/username/repo"
                value={formData.repositoryLink}
                onChange={handleInputChange}
              />
            </div>

            {/* Deliverables section with dynamic list */}
            <div className="pp-deliverables-section">
              <h3 className="pp-deliverables-title">🎯 Key Deliverables & Goals</h3>

              {deliverables.map((deliverable) => (
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
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        padding: '4px',
                        display: 'flex',
                        alignItems: 'center',
                        color: '#64748b',
                        transition: 'color 0.2s'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.color = '#3b82f6'}
                      onMouseLeave={(e) => e.currentTarget.style.color = '#64748b'}
                      title="Edit"
                    >
                      <Edit2 size={14} />
                    </button>
                    <button
                      onClick={() => handleDeleteDeliverable(deliverable.id)}
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        padding: '4px',
                        display: 'flex',
                        alignItems: 'center',
                        color: '#64748b',
                        transition: 'color 0.2s'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.color = '#ef4444'}
                      onMouseLeave={(e) => e.currentTarget.style.color = '#64748b'}
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
                {done && newDeliverableInput.trim() && (
                  <span className="pp-status-badge pp-done" style={{ marginLeft: 'auto' }}>DONE</span>
                )}
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

            {/* Skills input with tag management */}
            <div className="pp-form-group">
              <label className="pp-form-label">Required Skills / Tech Stack</label>
              <div className="pp-skills-input">
                {skills.map((skill, index) => (
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

            {/* Rating slider and team size controls */}
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
                      background: `linear-gradient(
                            to right,
                            #2563eb 0%,
                            #2563eb ${percent}%,
                            #e2e8f0 ${percent}%,
                            #e2e8f0 100%
                          )`
                    }}
                  />
                  <span className="pp-rating-label">Expert</span>
                </div>
                <div className="pp-rating-value">{getRatingDisplay()}</div>
              </div>

              {/* Team size increment/decrement controls */}
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

            {/* Role label select */}
            <div className="pp-form-group">
              <label className="pp-form-label">Role Label</label>
              <select
                name="roleLabel"
                className="pp-form-select"
                value={formData.roleLabel}
                onChange={handleInputChange}
              >
                <option>Full Stack Developer</option>
                <option>Frontend Developer</option>
                <option>Backend Developer</option>
                <option>Mobile Developer</option>
                <option>DevOps Engineer</option>
                <option>UI/UX Designer</option>
              </select>
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

            {/* Commitment and duration selects */}
            <div className="pp-form-row">
              <div className="pp-form-group">
                <label className="pp-form-label">Expected Commitment</label>
                <select
                  name="expectedCommitment"
                  className="pp-form-select"
                  value={formData.expectedCommitment}
                  onChange={handleInputChange}
                >
                  <option>Part-time (10-20 hrs/week)</option>
                  <option>Full-time (40+ hrs/week)</option>
                  <option>Flexible</option>
                </select>
              </div>
              <div className="pp-form-group">
                <label className="pp-form-label">Project Duration</label>
                <select
                  name="projectDuration"
                  className="pp-form-select"
                  value={formData.projectDuration}
                  onChange={handleInputChange}
                >
                  <option>1-3 Months</option>
                  <option>3-6 Months</option>
                  <option>6-12 Months</option>
                  <option>12+ Months</option>
                </select>
              </div>
            </div>

            {/* Timeline tabs and timezone select */}
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

                {/* If scheduled selected, show a date input (calendar + typing) */}
                {activeTimeline === 'scheduled' && (
                  <div className="pp-start-date-block" style={{ marginTop: '20px' }}>
                    <label className="pp-form-label">Start Date</label>
                    <input
                      type="date"
                      name="startDate"
                      className="pp-form-input"
                      value={formData.startDate}
                      onChange={handleInputChange}
                    />
                    <small className="pp-hint">Select a start date or type it directly (YYYY-MM-DD).</small>
                  </div>
                )}
              </div>

              <div className="pp-form-group">
                <label className="pp-form-label">Timezone Preference</label>
                <select
                  name="timezonePreference"
                  className="pp-form-select"
                  value={formData.timezonePreference}
                  onChange={handleInputChange}
                >
                  <option>Global (Any Timezone)</option>
                  <option>Americas (UTC-8 to UTC-4)</option>
                  <option>Europe (UTC+0 to UTC+3)</option>
                  <option>Asia (UTC+5 to UTC+9)</option>
                </select>
              </div>
            </div>

            {/* Collaboration style radio buttons and communication norms */}
            <div className="pp-form-row">
              <div className="pp-form-group">
                <label className="pp-form-label">Collaboration Style</label>
                <div className="pp-radio-group">
                  <label className="pp-radio-option">
                    <input
                      type="radio"
                      name="collab"
                      checked={collaborationStyle === 'async'}
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
                      checked={collaborationStyle === 'sync'}
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
                  name="communicationNorms"
                  className="pp-form-textarea"
                  placeholder="e.g. We use Discord for daily chat and Notion for tasks. Weekly stand-up on Mondays."
                  rows={3}
                  value={formData.communicationNorms}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </section>
        </div>

        {/* Right Column - Smart Match (Display Only) */}
        <div className="pp-right-column">
          <div className="pp-smart-match-card">
            <div className="pp-smart-match-header">
              <Zap size={16} fill="#FFD700" color="#FFD700" />
              <span>Smart Match</span>
              <span className="pp-live-badge">LIVE</span>
            </div>

            {/* Display match statistics based on current form data */}
            <div className="pp-match-stats">
              <div className="pp-stat">
                <div className="pp-stat-number">
                  {ratingValue < 50 ? 14 + Math.floor((50 - ratingValue) / 5) : Math.max(5, 14 - Math.floor((ratingValue - 50) / 5))}
                </div>
                <div className="pp-stat-label">Candidates</div>
              </div>
              <div className="pp-stat">
                <div className="pp-stat-number pp-green">
                  {skills.length > 0 ? Math.min(95, 70 + skills.length * 5) : 50}%
                </div>
                <div className="pp-stat-label">Avg Match</div>
              </div>
            </div>

            {/* Preview of top matching candidates */}
            <div className="pp-matches-preview">
              <h4 className="pp-preview-title">TOP MATCHES PREVIEW</h4>

              <div className="pp-match-item">
                <div className="pp-match-avatar">E</div>
                <div className="pp-match-info">
                  <div className="pp-match-name">Elena R.</div>
                  <div className="pp-match-skills">React Native • TypeScript • SEO rating</div>
                </div>
                <div className="pp-match-score pp-green">98%</div>
              </div>

              <div className="pp-match-item">
                <div className="pp-match-avatar pp-gray">M</div>
                <div className="pp-match-info">
                  <div className="pp-match-name">Marcus J.</div>
                  <div className="pp-match-skills">Full Stack • System Design • 700 rating</div>
                </div>
                <div className="pp-match-score pp-green">94%</div>
              </div>

              <div className="pp-more-matches">
                {/* basic extra count display */}
                +{Math.max(0, (ratingValue < 50 ? 14 + Math.floor((50 - ratingValue) / 5) : Math.max(5, 14 - Math.floor((ratingValue - 50) / 5))) - 2)} more matches
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Footer */}
      <div className="pp-inline-actions">
        <button className="pp-footer-btn pp-secondary" onClick={handleSaveDraft}>Save Draft</button>
        <button className="pp-footer-btn pp-primary" onClick={handlePostProject}>🚀 Post Project</button>
      </div>
    </div>
  );
};

export default ProjectPostPage;
