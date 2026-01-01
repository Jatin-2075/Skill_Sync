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
    <div className="page-root">
      {/* Header */}
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

      {/* Main */}
      <main className="main">
        <div className="container">
          {/* Progress */}
          <section className="progress-section">
            <div className="progress-info">
              <span className="phase-text">Phase 4: Projects & Contributions</span>
              <span className="completion-text">80% Completed</span>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: "80%" }} />
            </div>
          </section>

          {/* Heading */}
          <section className="heading-section">
            <h1>Showcase Your Work</h1>
            <p>
              Add projects that demonstrate your technical capabilities. Map them to specific skill
              to validate your expertise for the global ranking algorithm.
            </p>
          </section>

          {/* Added Projects */}
          <section className="added-projects-section">
            <h2 className="section-title">Added Projects</h2>
            {projects.map((project) => (
              <div key={project.id} className="project-card">
                <div className="project-icon">💼</div>
                <div className="project-info">
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-meta">
                    {project.role} • {project.techStack.join(', ')}
                  </p>
                </div>
                <div className="project-tags">
                  {project.skills.map((skill) => (
                    <span key={skill} className="skill-tag">
                      {skill}
                    </span>
                  ))}
                </div>
                <button className="edit-btn">✏️</button>
              </div>
            ))}
          </section>

          {/* New Project Entry */}
          <section className="new-project-section">
            <div className="section-header">
              <h2 className="section-title">New Project </h2>
              <a className="clear-link" onClick={handleClearForm}>
                Clear Form
              </a>
            </div>

            <div className="form-card">
              {/* Title and Role */}
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Project Title</label>
                  <input
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="e.g. Distributed Task Queue"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Your Role</label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    className="form-select"
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
              <div className="form-group">
                <label className="form-label">Project Description & Impact</label>
                <p className="form-helper">
                  Briefly explain the problem statement and the solution. Mention key metrics if available.
                </p>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="form-textarea"
                  placeholder="Describe what you built, why it matters, and the outcome..."
                />
              </div>

              {/* Tech Stack */}
              <div className="form-group">
                <label className="form-label">Tech Stack</label>
                <div className="tech-stack">
                  {formData.techStack.map((tech) => (
                    <span key={tech} className="tech-tag">
                      {tech}
                      <button
                        className="remove-tag"
                        onClick={() => removeTechTag(tech)}
                      >
                        x
                      </button>
                    </span>
                  ))}
                  <input
                    type="text"
                    className="tech-input"
                    placeholder="Type and press Enter..."
                    value={techInput}
                    onChange={(e) => setTechInput(e.target.value)}
                    onKeyDown={handleTechKeyDown}
                  />
                </div>
              </div>

              {/* Skill Vector Mapping */}
              <div className="skill-mapping">
                <div className="mapping-header">
                  <div className="mapping-title">
                    <span className="mapping-icon">🎯</span>
                    Skill Mapping
                  </div>
                  <span className="required-badge">Required</span>
                </div>
                <p className="mapping-description">
                  Select the core competency vectors this project demonstrates. This directly influences your SkillRank.
                </p>
                <div className="skill-grid">
                  {skillVectors.map((skill) => (
                    <div
                      key={skill.id}
                      className={`skill-card ${
                        selectedSkills.includes(skill.number) ? 'selected' : ''
                      }`}
                      onClick={() => toggleSkill(skill.number)}
                    >
                      <span className="skill-number">{skill.number}</span>
                      <span className="skill-name">{skill.name}</span>
                      <span className="skill-description">{skill.description}</span>
                      <div className="skill-check">✓</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* URLs */}
              <div className="url-row">
                <div className="form-group">
                  <label className="form-label">Repository URL</label>
                  <div className="url-input-wrapper">
                    <span className="url-icon">🔗</span>
                    <input
                      name="repositoryUrl"
                      value={formData.repositoryUrl}
                      onChange={handleInputChange}
                      className="form-input url-input"
                      placeholder="github.com/username/project"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Live Demo / Docs</label>
                  <div className="url-input-wrapper">
                    <span className="url-icon">🚀</span>
                    <input
                      name="demoUrl"
                      value={formData.demoUrl}
                      onChange={handleInputChange}
                      className="form-input url-input"
                      placeholder="https://..."
                    />
                  </div>
                </div>
              </div>

              {/* Add Button */}
              <button className="add-project-btn" onClick={handleAddProject}>
                + Add Project
              </button>
            </div>
          </section>

          {/* Footer */}
          <footer className="footer-nav">
            <button onClick={handleBack} className="btn-back">Back to Phase 3</button>
            <button className="btn-continue">Save & Continue →</button>
          </footer>
        </div>
      </main>
    </div>
  );
};

export default Page4;