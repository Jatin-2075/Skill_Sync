import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import "./style/page4.css"

interface Project {
  id: string;
  title: string;
  role: string;
  techStack: string[];
  skills: string[];
}
  
interface SkillVector {
  id: string;
  number: string;
  name: string;
  description: string;
}

const skillVectors: SkillVector[] = [
  { id: 's1', number: 'S1', name: 'Algorithmic', description: 'Complexity & Logic' },
  { id: 's2', number: 'S2', name: 'System Design', description: 'Architecture & Scale' },
  { id: 's3', number: 'S3', name: 'Data Eng', description: 'Pipelines & Storage' },
  { id: 's4', number: 'S4', name: 'Security', description: 'Auth & Integrity' },
  { id: 's5', number: 'S5', name: 'Optimization', description: 'Performance & Cost' },
];

const Page4 = () => {
  const [projects] = useState<Project[]>([
    {
      id: '1',
      title: 'Algorithmic Trading Bot',
      role: 'Lead Developer',
      techStack: ['Python', 'C++', 'Docker'],
      skills: ['S1', 'S5'],
    },
  ]);

  const [formData, setFormData] = useState({
    title: '',
    role: '',
    description: '',
    techStack: ['React', 'TypeScript', 'Node.js'],
    repositoryUrl: '',
    demoUrl: '',
  });

  const [selectedSkills, setSelectedSkills] = useState<string[]>(['S1', 'S5']);
  const [techInput, setTechInput] = useState('');

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTechKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && techInput.trim()) {
      e.preventDefault();
      if (!formData.techStack.includes(techInput.trim())) {
        setFormData((prev) => ({
          ...prev,
          techStack: [...prev.techStack, techInput.trim()],
        }));
      }
      setTechInput('');
    }
  };

  const removeTechTag = (tag: string) => {
    setFormData((prev) => ({
      ...prev,
      techStack: prev.techStack.filter((t) => t !== tag),
    }));
  };

  const toggleSkill = (skillId: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skillId)
        ? prev.filter((s) => s !== skillId)
        : [...prev, skillId]
    );
  };

  const handleClearForm = () => {
    setFormData({
      title: '',
      role: '',
      description: '',
      techStack: [],
      repositoryUrl: '',
      demoUrl: '',
    });
    setSelectedSkills([]);
    setTechInput('');
  };

  const handleAddProject = () => {
    console.log('Adding project:', { ...formData, skills: selectedSkills });
    alert('Project added successfully!');
  };

  const navigate = useNavigate();
  const handleBack = () => {
    navigate("/pagethree");
    console.log('Going back to Phase 3');
  }

  return (
    <div className="page4-page-root">
      {/* Header */}
      <header className="page4-header">
        <div className="page4-brand">
          <div className="page4-logo" />
          <span className="page4-brand-title">SkillRank</span>
        </div>

        <div className="page4-header-right">
          <a className="page4-help-link">
            <span className="page4-help-icon">?</span>
            Help
          </a>
        </div>
      </header>

      {/* Main */}
      <main className="page4-main">
        <div className="page4-container">
          {/* Progress */}
          <section className="page4-progress-section">
            <div className="page4-progress-info">
              <span className="page4-phase-text">Phase 4: Projects & Contributions</span>
              <span className="page4-completion-text">80% Completed</span>
            </div>
            <div className="page4-progress-bar">
              <div className="page4-progress-fill" style={{ width: "80%" }} />
            </div>
          </section>

          {/* Heading */}
          <section className="page4-heading-section">
            <h1>Showcase Your Work</h1>
            <p>
              Add projects that demonstrate your technical capabilities. Map them to specific skills
              to validate your expertise for the global ranking algorithm.
            </p>
          </section>

          {/* Added Projects */}
          <section className="page4-added-projects-section">
            <h2 className="page4-section-title">Added Projects</h2>
            {projects.map((project) => (
              <div key={project.id} className="page4-project-card">
                <div className="page4-project-icon">💼</div>
                <div className="page4-project-info">
                  <h3 className="page4-project-title">{project.title}</h3>
                  <p className="page4-project-meta">
                    {project.role} • {project.techStack.join(', ')}
                  </p>
                </div>
                <div className="page4-project-tags">
                  {project.skills.map((skill) => (
                    <span key={skill} className="page4-skill-tag">
                      {skill}
                    </span>
                  ))}
                </div>
                <button className="page4-edit-btn">✏️</button>
              </div>
            ))}
          </section>

          {/* New Project Entry */}
          <section className="page4-new-project-section">
            <div className="page4-section-header">
              <h2 className="page4-section-title">New Project</h2>
              <a className="page4-clear-link" onClick={handleClearForm}>
                Clear Form
              </a>
            </div>

            <div className="page4-form-card">
              {/* Title and Role */}
              <div className="page4-form-row">
                <div className="page4-form-group">
                  <label className="page4-form-label">Project Title</label>
                  <input
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="page4-form-input"
                    placeholder="e.g. Distributed Task Queue"
                  />
                </div>

                <div className="page4-form-group">
                  <label className="page4-form-label">Your Role</label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    className="page4-form-select"
                  >
                    <option value="">Select your role</option>
                    <option value="Lead Developer">Lead Developer</option>
                    <option value="Full Stack Developer">Full Stack Developer</option>
                    <option value="Backend Developer">Backend Developer</option>
                    <option value="Frontend Developer">Frontend Developer</option>
                    <option value="DevOps Engineer">DevOps Engineer</option>
                  </select>
                </div>
              </div>

              {/* Description */}
              <div className="page4-form-group">
                <label className="page4-form-label">Project Description & Impact</label>
                <p className="page4-form-helper">
                  Briefly explain the problem statement and the solution. Mention key metrics if available.
                </p>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="page4-form-textarea"
                  placeholder="Describe what you built, why it matters, and the outcome..."
                />
              </div>

              {/* Tech Stack */}
              <div className="page4-form-group">
                <label className="page4-form-label">Tech Stack</label>
                <div className="page4-tech-stack">
                  {formData.techStack.map((tech) => (
                    <span key={tech} className="page4-tech-tag">
                      {tech}
                      <button
                        className="page4-remove-tag"
                        onClick={() => removeTechTag(tech)}
                      >
                        x
                      </button>
                    </span>
                  ))}
                  <input
                    type="text"
                    className="page4-tech-input"
                    placeholder="Type and press Enter..."
                    value={techInput}
                    onChange={(e) => setTechInput(e.target.value)}
                    onKeyDown={handleTechKeyDown}
                  />
                </div>
              </div>

              {/* Skill Vector Mapping */}
              <div className="page4-skill-mapping">
                <div className="page4-mapping-header">
                  <div className="page4-mapping-title">
                    <span className="page4-mapping-icon">🎯</span>
                    Skill Mapping
                  </div>
                  <span className="page4-required-badge">Required</span>
                </div>
                <p className="page4-mapping-description">
                  Select the core competency vectors this project demonstrates. This directly influences your SkillRank.
                </p>
                <div className="page4-skill-grid">
                  {skillVectors.map((skill) => (
                    <div
                      key={skill.id}
                      className={`page4-skill-card ${
                        selectedSkills.includes(skill.number) ? 'page4-selected' : ''
                      }`}
                      onClick={() => toggleSkill(skill.number)}
                    >
                      <span className="page4-skill-number">{skill.number}</span>
                      <span className="page4-skill-name">{skill.name}</span>
                      <span className="page4-skill-description">{skill.description}</span>
                      <div className="page4-skill-check">✓</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* URLs */}
              <div className="page4-url-row">
                <div className="page4-form-group">
                  <label className="page4-form-label">Repository URL</label>
                  <div className="page4-url-input-wrapper">
                    <span className="page4-url-icon">🔗</span>
                    <input
                      name="repositoryUrl"
                      value={formData.repositoryUrl}
                      onChange={handleInputChange}
                      className="page4-form-input page4-url-input"
                      placeholder="github.com/username/project"
                    />
                  </div>
                </div>

                <div className="page4-form-group">
                  <label className="page4-form-label">Live Demo / Docs</label>
                  <div className="page4-url-input-wrapper">
                    <span className="page4-url-icon">🚀</span>
                    <input
                      name="demoUrl"
                      value={formData.demoUrl}
                      onChange={handleInputChange}
                      className="page4-form-input page4-url-input"
                      placeholder="https://..."
                    />
                  </div>
                </div>
              </div>

              {/* Add Button */}
              <button className="page4-add-project-btn" onClick={handleAddProject}>
                + Add Project
              </button>
            </div>
          </section>

          {/* Footer */}
          <footer className="page4-footer-nav">
            <button onClick={handleBack} className="page4-btn-back">Back</button>
            <button className="page4-btn-continue">Save & Continue →</button>
          </footer>
        </div>
      </main>
    </div>
  );
};

export default Page4;