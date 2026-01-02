import { useState } from 'react';
import "./style/page3.css"
import { useNavigate } from "react-router-dom";
import { API } from '../../config/Api';

interface Education {
  school: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

const Page3 = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState<Education>({
    school: "",
    degree: "",
    field: "",
    startDate: "",
    endDate: "",
    current: false,
    description: "",
  });

  const [databackend, setdatabackend] = useState<any[]>([])

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleAddEducation = async () => {
    try {
      const res = await API("POST", "/auth/studentsave/", { formData })
      const backendres = await res.json()
      setdata
         
    } catch (err) {
      console.log(err)
    }
    console.log('Adding education:', formData);
    alert('Education added to timeline!');
  };

  const handleBack = () => {
    navigate("/pagetwo");
    console.log('Going back to Phase 2');
  };

  const handleContinue = () => {
    if (data) {
      navigate("/pagefour")
    }
  };

  return (
    <div className="page3-page-root">
      {/* Header */}
      <header className="page3-header">
        <div className="page3-brand">
          <div className="page3-logo" />
          <span className="page3-brand-title">SkillRank</span>
        </div>

        <div className="page3-header-right">
          <a className="page3-help-link">
            <span className="page3-help-icon">?</span>
            Help
          </a>
        </div>
      </header>

      {/* Main */}
      <main className="page3-main">
        <div className="page3-container">
          {/* Progress */}
          <section className="page3-progress-section">
            <div className="page3-progress-info">
              <span className="page3-phase-text">Phase 3 : Education & Timeline</span>
              <span className="page3-completion-text">60% Completed</span>
            </div>
            <div className="page3-progress-bar">
              <div className="page3-progress-fill" style={{ width: "60%" }} />
            </div>
          </section>

          {/* Heading */}
          <section className="page3-heading-section">
            <h1>Education History</h1>
            <p>
              Showcase your academic background, degrees, and certifications to
              improve your ranking profile.
            </p>
          </section>

          <section className="page3-content-grid">
            {/* Form Card */}
            <div className="page3-card">
              <h3>Add New Education</h3>

              <label className="page3-form-label">
                <span className="page3-label-text">School or University</span>
                <input
                  name="school"
                  value={formData.school}
                  onChange={handleInputChange}
                  className="page3-form-input"
                  placeholder="Ex: Stanford University"
                />
              </label>

              <div className="page3-grid-2">
                <label className="page3-form-label">
                  <span className="page3-label-text">Degree</span>
                  <select
                    name="degree"
                    value={formData.degree}
                    onChange={handleInputChange}
                    className="page3-form-select"
                  >
                    <option>Bachelor's</option>
                    <option>Master's</option>
                    <option>PhD</option>
                    <option>Associate</option>
                    <option>High School</option>
                  </select>
                </label>

                <label className="page3-form-label">
                  <span className="page3-label-text">Field of Study</span>
                  <input
                    name="field"
                    value={formData.field}
                    onChange={handleInputChange}
                    className="page3-form-input"
                    placeholder="Ex: Computer Science"
                  />
                </label>
              </div>

              <div className="page3-grid-2">
                <label className="page3-form-label">
                  <span className="page3-label-text">Start Date</span>
                  <input
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleInputChange}
                    type="date"
                    className="page3-form-input"
                  />
                </label>

                <label className="page3-form-label">
                  <span className="page3-label-text">End Date</span>
                  <input
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleInputChange}
                    type="date"
                    className="page3-form-input"
                    disabled={formData.current}
                  />
                </label>
              </div>

              <label className="page3-checkbox-label">
                <input
                  type="checkbox"
                  name="current"
                  checked={formData.current}
                  onChange={handleInputChange}
                  className="page3-checkbox-input"
                />
                <span>I am currently studying here</span>
              </label>

              <label className="page3-form-label">
                <span className="page3-label-text">Description (Optional)</span>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="page3-form-textarea"
                  placeholder="Key achievements, honors, or relevant coursework..."
                />
              </label>

              <div className="page3-actions">
                <button className="page3-btn-outline" onClick={handleCancel}>
                  Cancel
                </button>
                <button className="page3-btn-primary" onClick={handleAddEducation}>
                  Add to Timeline
                </button>
              </div>
            </div>

            {/* Timeline Card */}
            {/* <div className="page3-card">
              <h3>Your Timeline</h3>
<<<<<<< HEAD
                <div className="page3-timeline">
                  {timeline.length === 0 ? (
                    <p className="page3-empty-state">
                      No Timeline to display
                    </p>
                  ) : (
                    <>
                      {timeline.map((item, index) => (
                        <div key={item.id} className="page3-timeline-item">
                          <div
                            className={`page3-timeline-dot ${
                              index === 0 ? 'page3-active' : ''
                            }`}
                          />
                          <div className="page3-timeline-content">
                            <span className="page3-timeline-year">
                              {item.startDate} - {item.endDate}
                            </span>
                            <h4>{item.school}</h4>
                            <p>
                              {item.degree}
                              {item.field && ` · ${item.field}`}
                            </p>
                            {item.description && (
                              <p className="page3-timeline-description">
                                {item.description}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                      <p className="page3-empty-state">
                        Add more education above…
                      </p>
                    </>
                  )}
                </div>
            </div>
=======

              <div className="page3-timeline">
                {timeline.map((item, index) => (
                  <div key={item.number} className="timeline-item">
                    <div className={`timeline-dot ${index === 0 ? 'active' : ''}`} />
                    <div className="timeline-content">
                      <span className="timeline-year">
                        {item.startDate} - {item.endDate}
                      </span>
                      <h4>{item.school}</h4>
                      <p>
                        {item.degree} {item.field && item.field}
                      </p>
                      {item.description && (
                        <p className="page3-timeline-description">{item.description}</p>
                      )}
                    </div>
                  </div>
                ))}

                <p className="page3-empty-state">Add more education above…</p>
              </div>
            </div> */}
>>>>>>> c1876ef84de3eb2e0a35a35934e5975e5e417142
          </section>

          {/* Footer */}
          <footer className="page3-footer-nav">
            <button onClick={handleBack} className="page4-btn-back">Back</button>
            <button onClick={handleContinue} className="page4-btn-continue">Save & Continue →</button>
          </footer>
        </div>
      </main>
    </div>
  );
};

export default Page3;