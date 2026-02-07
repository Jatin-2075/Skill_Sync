import { useState } from "react";

const SubmitProposal = () => {
  const [text, setText] = useState("");

  return (
    <div className="proposal-page app-container">
      {/* Header */}
      <div className="proposal-header">
        <div className="proposal-breadcrumb">
          Projects › AI Engine Optimization › Submit Proposal
        </div>

        <div className="proposal-title-row">
          <div>
            <h1 className="proposal-title">Submit Project Proposal</h1>
            <p className="proposal-subtitle">
              Project: <span>AI Engine Optimization</span> · Owned by
              <span className="proposal-owner"> @tech_lead_alpha</span>
            </p>
          </div>

          <button className="proposal-view-btn">View Project Details</button>
        </div>
      </div>

      <div className="proposal-layout">
        {/* Left */}
        <div className="proposal-main">
          <div className="proposal-context-card">
            <h3>Project Context</h3>
            <p>
              You are applying as a core contributor. The team is looking for
              expertise in LLM fine-tuning and latency optimization. Highlight
              your relevant achievements.
            </p>
          </div>

          <div className="proposal-editor">
            <div className="proposal-editor-header">
              <h3>Your Proposal</h3>
              <span className="proposal-draft">Draft autosaved</span>
            </div>

            <textarea
              className="proposal-textarea"
              placeholder="Describe your technical approach and why you're a fit for this project..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />

            <div className="proposal-count">
              {text.length} / 2000 characters
            </div>
          </div>

          <div className="proposal-form-row">
            <select className="proposal-select">
              <option>Select a role</option>
              <option>Frontend Developer</option>
              <option>Backend Developer</option>
              <option>ML Engineer</option>
            </select>

            <input
              className="proposal-input"
              placeholder="e.g. 15–20 hours / week"
            />
          </div>

          <div className="proposal-links">
            <h4>Relevant Links</h4>
            <input
              className="proposal-link-input"
              placeholder="https://github.com/yourproject"
            />
            <button className="proposal-add-link">+ Add another link</button>
          </div>

          <div className="proposal-actions">
            <button className="proposal-send-btn">Send Proposal</button>
            <button className="proposal-cancel-btn">Cancel</button>
          </div>
        </div>

        {/* Right */}
        <aside className="proposal-side">
          <div className="proposal-skill-card">
            <h3>Your Skill Alignment</h3>

            <div className="skill-row">
              <span>S1: Technical Proficiency</span>
              <span>88%</span>
            </div>
            <div className="skill-bar"><div style={{ width: "88%" }} /></div>

            <div className="skill-row">
              <span>S2: Practical Experience</span>
              <span>74%</span>
            </div>
            <div className="skill-bar"><div style={{ width: "74%" }} /></div>

            <p className="skill-hint">
              Your domain knowledge matches this project's top requirement.
            </p>
          </div>

          <div className="proposal-tips-card">
            <h3>Proposal Tips</h3>
            <ul>
              <li>Be concise and clear.</li>
              <li>Link your most relevant work.</li>
              <li>Explain your specific approach.</li>
              <li>Mention your availability.</li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default SubmitProposal;
