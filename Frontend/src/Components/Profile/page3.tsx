import { useState, useEffect } from 'react';
import "./style/page3.css"
import { useNavigate } from "react-router-dom";
import { API } from '../../config/Api';

interface Education {
  schoolname: string;
  degree: string;
  field: string;
  startdate: string;
  enddate: string;
  current: boolean;
  description: string;
}

const Page3 = () => {

  useEffect(() => {
    FunctionFetch();
  }, [])

  const FunctionFetch = async () => {
  try {
    const res = await API("GET", "/auth/sendstudent/");
    const result = await res.json();

    if (result.success) {
      setTimeline(result.data);
    }
  } catch (err) {
    console.log("Fetch timeline error", err);
  }
};


  const navigate = useNavigate();

  const [formData, setFormData] = useState<Education>({
    schoolname: "",
    degree: "",
    field: "",
    startdate: "",
    enddate: "",
    current: false,
    description: "",
  });

  const [timeline, setTimeline] = useState<any[]>([])

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
  console.log(formData);

  try {
    const res = await API("POST", "/auth/studentsave/", formData); // ✅ FIXED
    const backendres = await res.json();
    setdatabackend(backendres);

    if (backendres.success) {
      await FunctionFetch(); // refresh timeline

      setFormData({
        schoolname: "",
        degree: "",
        field: "",
        startdate: "",
        enddate: "",
        current: false,
        description: "",
      });

      alert("Education added to timeline!");
    } else {
      alert(backendres.msg || "Failed to save education");
    }

  } catch (err) {
    console.log("Save error", err);
  }
};


  const handleBack = () => {
    navigate("/pagetwo");
    console.log('Going back to Phase 2');
  };

  const handleContinue = () => {
  };

  const handleCancel = () => {
    setFormData({
      schoolname: "",
      degree: "",
      field: "",
      startdate: "",
      enddate: "",
      current: false,
      description: "",
    })
  }

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
                <span className="page3-label-text">schoolname or University</span>
                <input
                  name="schoolname"
                  value={formData.schoolname}
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
                    <option value="" disabled>Select Degree</option>
                    <option value="Bachelor">Bachelor's</option>
                    <option value="Master's">Master's</option>
                    <option value="PHD">PhD</option>
                    <option value="Associate">Associate</option>
                    <option value="High School">High school</option>
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
                    name="startdate"
                    value={formData.startdate}
                    onChange={handleInputChange}
                    type="date"
                    className="page3-form-input"
                  />
                </label>

                <label className="page3-form-label">
                  <span className="page3-label-text">End Date</span>
                  <input
                    name="enddate"
                    value={formData.enddate}
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
                <span className="page3-label-text">description (Optional)</span>
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
            <div className="page3-card">
              <h3>Your Timeline</h3>
              <div className="page3-timeline">
                {timeline.length === 0 ? (
                  <p className="page3-empty-state">
                    No Timeline to display
                  </p>
                ) : (
                  <>
                    {timeline.map((item, index) => (
                      <div key={item.number} className="page3-timeline-item">
                        <div
                          className={`page3-timeline-dot ${index === 0 ? 'page3-active' : ''
                            }`}
                        />
                        <div className="page3-timeline-content">
                          <span className="page3-timeline-year">
                            {item.startdate} - {item.enddate}
                          </span>
                          <h4>{item.schoolname}</h4>
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