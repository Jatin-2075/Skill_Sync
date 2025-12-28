
import React, { useState, useRef, ChangeEvent, KeyboardEvent } from 'react';
import { X, Plus, Trash2 } from 'lucide-react';
import '../Style/createprofile.css';
type UserType = 'student' | 'freelancer' | 'professional' | '';

interface Platform {
  name: string;
  url: string;
}

interface FormData {
  fullName: string;
  email: string;
  username: string;
  city: string;
  country: string;
  userType: UserType;
  university?: string;
  degree?: string;
  graduationYear?: number;
  primaryService?: string;
  freelancerExperience?: number;
  projects?: string[];
  currentRole?: string;
  company?: string;
  professionalExperience?: number;
  skills: string[];
  platforms: Platform[];
}

export default function ProfileCreator(): JSX.Element {
  const [userType, setUserType] = useState<UserType>('');
  const [skills, setSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState<string>('');
  const [platforms, setPlatforms] = useState<Platform[]>([]);
  const [projects, setProjects] = useState<string[]>([]);
  const skillInputRef = useRef<HTMLInputElement>(null);

  const handleSkillKeyDown = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter' && skillInput.trim()) {
      e.preventDefault();
      if (!skills.includes(skillInput.trim())) {
        setSkills([...skills, skillInput.trim()]);
      }
      setSkillInput('');
    }
  };

  const removeSkill = (skillToRemove: string): void => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };

  const addPlatform = (): void => {
    setPlatforms([...platforms, { name: '', url: '' }]);
  };

  const updatePlatform = (index: number, field: keyof Platform, value: string): void => {
    const updated = [...platforms];
    updated[index][field] = value;
    setPlatforms(updated);
  };

  const removePlatform = (index: number): void => {
    setPlatforms(platforms.filter((_, i) => i !== index));
  };

  const addProject = (): void => {
    setProjects([...projects, '']);
  };

  const updateProject = (index: number, value: string): void => {
    const updated = [...projects];
    updated[index] = value;
    setProjects(updated);
  };

  const removeProject = (index: number): void => {
    setProjects(projects.filter((_, i) => i !== index));
  };

  const handleSubmit = (): void => {
    const profileData: Partial<FormData> = {
      userType,
      skills,
      platforms,
      projects
    };
    console.log('Profile data:', profileData);
    alert('Profile created successfully!');
  };

  const showSkills: boolean = userType === 'freelancer' || userType === 'professional';

  return (
    <div className="profile-creator">
      <div className="profile-container">
        <div className="profile-card">
          {/* Header */}
          <div className="profile-header">
            <h1 className="profile-title">Create Your Profile</h1>
            <p className="profile-subtitle">Join our community and showcase your expertise</p>
          </div>

          <div className="profile-content">
            {/* Personal Details */}
            <section className="profile-section">
              <h2 className="section-title">
                <div className="section-indicator"></div>
                Personal Details
              </h2>
              
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">
                    Full Name <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    className="form-input"
                    placeholder="John Doe"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Email <span className="required">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    className="form-input"
                    placeholder="john@example.com"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Username <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    className="form-input"
                    placeholder="johndoe"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    City <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    className="form-input"
                    placeholder="San Francisco"
                  />
                </div>

                <div className="form-group form-group-full">
                  <label className="form-label">
                    Country <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    className="form-input"
                    placeholder="United States"
                  />
                </div>
              </div>
            </section>

            {/* User Type Selection */}
            <section className="profile-section">
              <h2 className="section-title">
                <div className="section-indicator"></div>
                I am a <span className="required">*</span>
              </h2>

              <div className="user-type-grid">
                {(['student', 'freelancer', 'professional'] as const).map((type) => (
                  <div
                    key={type}
                    onClick={() => setUserType(type)}
                    className={`user-type-card ${userType === type ? 'user-type-card-active' : ''}`}
                  >
                    <div className="radio-wrapper">
                      <div className={`radio-dot ${userType === type ? 'radio-dot-active' : ''}`}>
                        {userType === type && <div className="radio-dot-inner"></div>}
                      </div>
                      <span className={`user-type-label ${userType === type ? 'user-type-label-active' : ''}`}>
                        {type}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Student Section */}
            {userType === 'student' && (
              <section className="profile-section fade-in">
                <h2 className="section-title">
                  <div className="section-indicator"></div>
                  Education
                </h2>
                
                <div className="form-grid">
                  <div className="form-group form-group-full">
                    <label className="form-label">University / College</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Stanford University"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Degree</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Bachelor of Science"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Graduation Year</label>
                    <input
                      type="number"
                      className="form-input"
                      placeholder="2024"
                    />
                  </div>
                </div>
              </section>
            )}

            {/* Freelancer Section */}
            {userType === 'freelancer' && (
              <section className="profile-section fade-in">
                <h2 className="section-title">
                  <div className="section-indicator"></div>
                  Freelancer Details
                </h2>
                
                <div className="form-grid form-grid-mb">
                  <div className="form-group">
                    <label className="form-label">Primary Service</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Web Development"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Years of Experience</label>
                    <input
                      type="number"
                      className="form-input"
                      placeholder="5"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label form-label-mb">Project Portfolio</label>
                  <div className="dynamic-list">
                    {projects.map((project, index) => (
                      <div key={index} className="dynamic-row">
                        <input
                          type="text"
                          value={project}
                          onChange={(e: ChangeEvent<HTMLInputElement>) => updateProject(index, e.target.value)}
                          className="form-input dynamic-input"
                          placeholder="Project name or URL"
                        />
                        <button
                          type="button"
                          onClick={() => removeProject(index)}
                          className="btn-remove"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={addProject}
                    className="btn-add"
                  >
                    <Plus size={18} />
                    Add Project
                  </button>
                </div>
              </section>
            )}

            {/* Professional Section */}
            {userType === 'professional' && (
              <section className="profile-section fade-in">
                <h2 className="section-title">
                  <div className="section-indicator"></div>
                  Professional Details
                </h2>
                
                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">Current Role</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Senior Software Engineer"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Company</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Google"
                    />
                  </div>

                  <div className="form-group form-group-full">
                    <label className="form-label">Total Experience (Years)</label>
                    <input
                      type="number"
                      className="form-input"
                      placeholder="8"
                    />
                  </div>
                </div>
              </section>
            )}

            {/* Skills Section */}
            {showSkills && (
              <section className="profile-section fade-in">
                <h2 className="section-title">
                  <div className="section-indicator"></div>
                  Skills
                </h2>
                
                <div className="form-group">
                  <label className="form-label">Add your skills</label>
                  <div className="skills-wrapper" onClick={() => skillInputRef.current?.focus()}>
                    {skills.map((skill) => (
                      <span key={skill} className="skill-tag">
                        {skill}
                        <button
                          type="button"
                          onClick={() => removeSkill(skill)}
                          className="skill-remove"
                        >
                          <X size={14} />
                        </button>
                      </span>
                    ))}
                    <input
                      ref={skillInputRef}
                      type="text"
                      value={skillInput}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => setSkillInput(e.target.value)}
                      onKeyDown={handleSkillKeyDown}
                      className="skill-input"
                      placeholder={skills.length === 0 ? "Type a skill and press Enter" : ""}
                    />
                  </div>
                  <p className="help-text">Press Enter to add a skill. Click the × to remove.</p>
                </div>
              </section>
            )}

            {/* Platform Links */}
            <section className="profile-section">
              <h2 className="section-title">
                <div className="section-indicator"></div>
                Platform Profiles
              </h2>
              
              <p className="section-description">
                Add links to your professional profiles (GitHub, LinkedIn, Portfolio, etc.)
              </p>

              <div className="dynamic-list">
                {platforms.map((platform, index) => (
                  <div key={index} className="platform-row">
                    <input
                      type="text"
                      value={platform.name}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => updatePlatform(index, 'name', e.target.value)}
                      className="form-input platform-name"
                      placeholder="Platform name"
                    />
                    <input
                      type="url"
                      value={platform.url}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => updatePlatform(index, 'url', e.target.value)}
                      className="form-input platform-url"
                      placeholder="https://github.com/username"
                    />
                    <button
                      type="button"
                      onClick={() => removePlatform(index)}
                      className="btn-remove"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={addPlatform}
                className="btn-add"
              >
                <Plus size={18} />
                Add Platform
              </button>
            </section>

            {/* Submit Button */}
            <button onClick={handleSubmit} className="btn-submit">
              Create Profile
            </button>
          </div>
        </div>

        <p className="footer-text">
          By creating a profile, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
}