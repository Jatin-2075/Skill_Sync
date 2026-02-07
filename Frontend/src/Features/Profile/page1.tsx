import { useState, useEffect } from "react";
import "./style/page1.css";
import { useNavigate } from "react-router-dom";
import { API } from "../../config/Api";
import { uploadProfileImage } from "../../Components/ImageService";
import { supabase } from "../../Components/ImageService";

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
  gender: string;
  headline: string;
  bio: string;
  visibility: string;
}

const Page1 = ({ }) => {
  const navigate = useNavigate();

  const [countries, setcountries] = useState<Country[]>([]);
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    username: "",
    country: "",
    city: "",
    gender: "",
    headline: "",
    bio: "",
    visibility: "",
  });
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);

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
    console.log("Sending data:", formData);
    try {
      const ressubmit = await API("POST", "/auth/personalsave/", { personal: formData });
      const data = await ressubmit.json();
      if (data.success) {
        console.log(data);
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

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      alert("You must be logged in to upload a photo!");
      return;
    }

    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    const maxSize = 2 * 1024 * 1024;

    if (!allowedTypes.includes(file.type)) {
      alert("Format not supported. Please use JPG, PNG, or WebP.");
      return;
    }

    if (file.size > maxSize) {
      alert("Image is too large. Max size is 2MB.");
      return;
    }

    setIsUploading(true);

    try {
      const uploadedUrl = await uploadProfileImage(file, user.id);
      if (uploadedUrl) {
        setPreviewUrl(uploadedUrl);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsUploading(false);
    }
  };


  return (
    <div className="page1-page-root">
      {/* Top Navigation */}
      <header className="page1-header">
        <div className="page1-brand">
          <div className="page1-logo" />
          <span className="page1-brand-title">SkillRank</span>
        </div>

        <div className="page1-header-right">
          <a className="page1-help-link">
            <span className="page1-help-icon">?</span>
            Help
          </a>
        </div>
      </header>

      {/* Main Content */}
      <main className="page1-main">
        <div className="page1-container">
          {/* Progress Section */}
          <section className="page1-progress-section">
            <div className="page1-progress-info">
              <span className="page1-phase-text">Phase 1 : Personal details</span>
              <span className="page1-completion-text">20% Completed</span>
            </div>
            <div className="page1-progress-bar">
              <div className="page1-progress-fill" style={{ width: "20%" }} />
            </div>
          </section>

          {/* Page Heading */}
          <section className="page1-heading-section">
            <h1>Phase 1: Personal & Identity Details</h1>
            <p>
              Your profile is the foundation of your Global Skill Vector. Accurate data ensures precise
              ranking in competitive programming and professional indices.
            </p>
          </section>

          {/* Main Form Card */}
          <form className="page1-form-card" onSubmit={(e) => e.preventDefault()}>
            {/* Profile Photo Row */}
            <div className="page1-photo-upload-row">
              <div className="page1-avatar-preview">
                {previewUrl ? (
                  <img src={previewUrl} alt="Preview" className="page1-avatar-img" />
                ) : (
                  <span className="material-symbols-outlined">person</span>
                )}
              </div>

              <div className="page1-photo-instructions">
                <h3>Profile Photo</h3>
                <p>Upload a professional image. This will be visible on your public ranking card.</p>
              </div>

              <input
                type="file"
                id="avatar-upload"
                hidden
                accept="image/jpeg,image/png,image/webp"
                onChange={handleFileChange}
              />

              <button
                type="button"
                className="page1-upload-btn"
                disabled={isUploading}
                onClick={() => document.getElementById('avatar-upload')?.click()}
              >
                {isUploading ? "Uploading..." : "Upload Image"}
              </button>
            </div>

            <div className="page1-form-grid-2">
              <label className="page1-input-group">
                <span>Full Name</span>
                <input
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="e.g. Jane Doe"
                />
              </label>

              <label className="page1-input-group">
                <span>Unique Username</span>
                <div className="page1-username-wrapper">
                  <span className="page1-prefix">@</span>
                  <input
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    placeholder="janedoe_dev"
                  />
                </div>
              </label>
            </div>

            {/* Location Grid */}
            <div className="page1-form-grid-3">
              <label className="page1-input-group">
                <span>Country</span>
                <div className="page1-select-wrapper">
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className="page1-modern-select"
                  >
                    <option value="">Select Country</option>
                    {countries.map((country) => (
                      <option key={country.cca2} value={country.cca2}>
                        {country.name.common}
                      </option>
                    ))}
                  </select>
                </div>
              </label>

              <label className="page1-input-group">
                <span>City</span>
                <input
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="e.g. San Francisco"
                />
              </label>

              <label className="page1-input-group">
                <span>Gender</span>
                <div className="page1-select-wrapper">
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className="page1-modern-select"
                  >
                    <option value="" disabled>Select your gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </label>
            </div>

            <div className="page1-info-alert">
              <span className="material-symbols-outlined">info</span>
              <div>
                <p className="page1-alert-title">Verification Matters</p>
                <p className="page1-alert-desc">
                  Our algorithms cross-reference your inputs with external APIs (GitHub, LinkedIn, LeetCode).
                  Please ensure your headline and bio are accurate to maintain a high trust score.
                </p>
              </div>
            </div>

            <div className="page1-form-stack">
              <label className="page1-input-group">
                <span>Professional Headline</span>
                <input
                  name="headline"
                  value={formData.headline}
                  onChange={handleInputChange}
                  placeholder="e.g. Full Stack Engineer | Top 5% LeetCode"
                />
              </label>

              <label className="page1-input-group">
                <div className="page1-label-header">
                  <span>Bio</span>
                  <small>{formData.bio.length}/240</small>
                </div>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  maxLength={240}
                  placeholder="Briefly describe your expertise and interests..."
                />
              </label>
            </div>

            <div className="page1-visibility-section">
              <span className="page1-section-label">Profile Visibility</span>
              <div className="page1-visibility-grid">
                <label className={`page1-radio-tile ${formData.visibility === "public" ? "page1-active" : ""}`}>
                  <input
                    type="radio"
                    name="visibility"
                    value="public"
                    checked={formData.visibility === "public"}
                    onChange={handleInputChange}
                  />
                  <div className="page1-tile-content">
                    <span className="material-symbols-outlined">public</span>
                    <h4>Public</h4>
                    <p>Visible to everyone. Indexed in global rankings.</p>
                  </div>
                </label>

                <label className={`page1-radio-tile ${formData.visibility === "private" ? "page1-active" : ""}`}>
                  <input
                    type="radio"
                    name="visibility"
                    value="private"
                    checked={formData.visibility === "private"}
                    onChange={handleInputChange}
                  />
                  <div className="page1-tile-content">
                    <span className="material-symbols-outlined">visibility_off</span>
                    <h4>Private</h4>
                    <p>Only visible to you. Excluded from rankings.</p>
                  </div>
                </label>

                <label className={`page1-radio-tile ${formData.visibility === "recruiters" ? "page1-active" : ""}`}>
                  <input
                    type="radio"
                    name="visibility"
                    value="recruiters"
                    checked={formData.visibility === "recruiters"}
                    onChange={handleInputChange}
                  />
                  <div className="page1-tile-content">
                    <span className="material-symbols-outlined">work</span>
                    <h4>Recruiters Only</h4>
                    <p>Visible to verified hiring partners only.</p>
                  </div>
                </label>
              </div>
            </div>
          </form>

          {/* Footer Navigation */}
          <footer className="page1-footer-nav">
            <button onClick={handlenext} className="page4-btn-continue">Save & Continue →</button>
          </footer>
        </div>
      </main>
    </div>
  );
}

export default Page1;