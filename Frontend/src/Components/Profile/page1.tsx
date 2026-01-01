import { useState, useEffect } from "react";
import "./style/page1.css";
import { useNavigate } from "react-router-dom";
import { API } from "../../config/Api";

type Country = {
  cca2: string;
  name: {
    common: string;
  };
};

interface FormData {
  fullName: string;
  username: string;
  country: string;
  city: string;
  timezone: string;
  headline: string;
  bio: string;
  visibility: string;
}

export default function Page1() {
  const navigate = useNavigate();

  const [countries, setcountries] = useState<Country[]>([]);

  const [FormData, setFormData] = useState<FormData>({
    fullName: "",
    username: "",
    country: "",
    city: "",
    timezone: "",
    headline: "",
    bio: "",
    visibility: "",
  });
  const countryfetch = async () => {
    const res = await fetch(
      "https://restcountries.com/v3.1/all?fields=name,cca2"
    );
    const data: Country[] = await res.json();
    data.sort((a, b) => a.name.common.localeCompare(b.name.common));
    setcountries(data);
  };

  useEffect(() => {
    countryfetch();
  }, []);

  const handlenext = async () => {
    try {
      const ressubmit = await API("POST", "/auth/personal/", FormData);
      const data = await ressubmit.json();
      if (data.success) {
        navigate("/pagetwo");
      }
    } catch (err) {
      alert(err);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleContinue = () => {
    console.log('Continuing to Phase 2');
    navigate("/pagetwo");
  };

  return (
    <div className="page-root">
      {/* Top Navigation */}
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

      {/* Main Content */}
      <main className="main">
        <div className="container">
          {/* Progress Section */}
          <section className="progress-section">
            <div className="progress-info">
                <span className="phase-text">Phase 1 : Personal details</span>
                <span className="completion-text">20% Completed</span>
            </div>
            <div className="progress-bar">
                <div className="progress-fill" style={{ width: "20%" }} />
            </div>
            </section>

          {/* Page Heading */}
          <section className="heading-section">
            <h1>Phase 1: Personal & Identity Details</h1>
            <p>
              Your profile is the foundation of your Global Skill Vector. Accurate data ensures precise
              ranking in competitive programming and professional indices.
            </p>
          </section>

          {/* Main Form Card */}
          <form className="form-card" onSubmit={(e) => e.preventDefault()}>
            {/* Profile Photo Row */}
            <div className="photo-upload-row">
              <div className="avatar-preview">
                <span className="material-symbols-outlined">person</span>
              </div>
              <div className="photo-instructions">
                <h3>Profile Photo</h3>
                <p>Upload a professional image. This will be visible on your public ranking card.</p>
              </div>
              <button type="button" className="upload-btn">Upload Image</button>
            </div>

            {/* Identity Grid */}
            <div className="form-grid-2">
              <label className="input-group">
                <span>Full Name</span>
                <input
                  name="fullName"
                  value={FormData.fullName}
                  onChange={handleInputChange}
                  placeholder="e.g. Jane Doe"
                />
              </label>

              <label className="input-group">
                <span>Unique Username</span>
                <div className="username-wrapper">
                  <span className="prefix">@</span>
                  <input
                    name="username"
                    value={FormData.username}
                    onChange={handleInputChange}
                    placeholder="janedoe_dev"
                  />
                </div>
              </label>
            </div>

            {/* Location Grid */}
            <div className="form-grid-3">
              <label className="input-group">
                <span>Country</span>
                <select
                  name="country"
                  value={FormData.country}
                  onChange={handleInputChange}
                >
                  <option value="">Select Country</option>
                  {countries.map((country) => (
                    <option key={country.cca2} value={country.cca2}>
                      {country.name.common}
                    </option>
                  ))}
                </select>
              </label>

              <label className="input-group">
                <span>City</span>
                <input
                  name="city"
                  value={FormData.city}
                  onChange={handleInputChange}
                  placeholder="e.g. San Francisco"
                />
              </label>

              <label className="input-group">
                <span>Timezone</span>
                <select
                  name="timezone"
                  value={FormData.timezone}
                  onChange={handleInputChange}
                >
                  <option value="auto">Auto-detect (UTC-08:00)</option>
                  <option value="ist">UTC+05:30 (IST)</option>
                </select>
              </label>
            </div>

            {/* Verification Info Box */}
            <div className="info-alert">
              <span className="material-symbols-outlined">info</span>
              <div>
                <p className="alert-title">Verification Matters</p>
                <p className="alert-desc">
                  Our algorithms cross-reference your inputs with external APIs (GitHub, LinkedIn, LeetCode). 
                  Please ensure your headline and bio are accurate to maintain a high trust score.
                </p>
              </div>
            </div>

            {/* Professional Details */}
            <div className="form-stack">
              <label className="input-group">
                <span>Professional Headline</span>
                <input
                  name="headline"
                  value={FormData.headline}
                  onChange={handleInputChange}
                  placeholder="e.g. Full Stack Engineer | Top 5% LeetCode"
                />
              </label>

              <label className="input-group">
                <div className="label-header">
                  <span>Bio</span>
                  <small>{FormData.bio.length}/240</small>
                </div>
                <textarea
                  name="bio"
                  value={FormData.bio}
                  onChange={handleInputChange}
                  maxLength={240}
                  placeholder="Briefly describe your expertise and interests..."
                />
              </label>
            </div>

            {/* Visibility Options */}
            <div className="visibility-section">
              <span className="section-label">Profile Visibility</span>
              <div className="visibility-grid">
                <label className={`radio-tile ${FormData.visibility === "public" ? "active" : ""}`}>
                  <input
                    type="radio"
                    name="visibility"
                    value="public"
                    checked={FormData.visibility === "public"}
                    onChange={handleInputChange}
                  />
                  <div className="tile-content">
                    <span className="material-symbols-outlined">public</span>
                    <h4>Public</h4>
                    <p>Visible to everyone. Indexed in global rankings.</p>
                  </div>
                </label>

                <label className={`radio-tile ${FormData.visibility === "private" ? "active" : ""}`}>
                  <input
                    type="radio"
                    name="visibility"
                    value="private"
                    checked={FormData.visibility === "private"}
                    onChange={handleInputChange}
                  />
                  <div className="tile-content">
                    <span className="material-symbols-outlined">visibility_off</span>
                    <h4>Private</h4>
                    <p>Only visible to you. Excluded from rankings.</p>
                  </div>
                </label>

                <label className={`radio-tile ${FormData.visibility === "recruiters" ? "active" : ""}`}>
                  <input
                    type="radio"
                    name="visibility"
                    value="recruiters"
                    checked={FormData.visibility === "recruiters"}
                    onChange={handleInputChange}
                  />
                  <div className="tile-content">
                    <span className="material-symbols-outlined">work</span>
                    <h4>Recruiters Only</h4>
                    <p>Visible to verified hiring partners only.</p>
                  </div>
                </label>
              </div>
            </div>
          </form>

          {/* Footer Navigation */}
          <footer className="footer-nav">
            <button onClick={handleContinue} className="btn-continue">Save & Continue →</button>
          </footer>
        </div>
      </main>
    </div>
  );
}
