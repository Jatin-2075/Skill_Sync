// ProfilePage.jsx
import "../../Style/profile.css";

export default function ProfilePage() {
  return (
    <div className="profile-page">

      {/* Header */}
      <header className="navbar">
        <div className="logo">SkillRank</div>
        <nav>
          <a>Dashboard</a>
          <a>Challenges</a>
          <a>Projects</a>
          <a>Jobs</a>
        </nav>
      </header>

      {/* Profile Header */}
      <section className="profile-header card">
        <div className="profile-left">
          <img className="avatar" src="/avatar.jpg" alt="profile" />
          <span className="verified">✔</span>
        </div>

        <div className="profile-center">
          <h1>Alex Dev</h1>
          <p className="username">@alexcode</p>
          <p className="headline">Senior Backend Engineer • San Francisco</p>
          <p className="bio">
            Building scalable distributed systems and high-frequency trading
            algorithms.
          </p>

          <div className="actions">
            <button className="primary">Connect</button>
            <button>Download Resume</button>
          </div>
        </div>

        <div className="profile-right">
          <div>
            <span>Global Rank</span>
            <strong>#42</strong>
          </div>
          <div>
            <span>Rating</span>
            <strong>2894 ↑</strong>
          </div>
        </div>
      </section>

      {/* Contribution Bar */}
      <section className="card">
        <h3>Unified Contribution Score</h3>

        <div className="contribution-bar">
          <div className="s1" style={{ width: "30%" }} />
          <div className="s2" style={{ width: "25%" }} />
          <div className="s3" style={{ width: "15%" }} />
          <div className="s4" style={{ width: "20%" }} />
          <div className="s5" style={{ width: "10%" }} />
        </div>
      </section>

      {/* Projects */}
      <section className="card">
        <h3>Featured Projects</h3>

        <div className="projects">
          <div className="project-card">
            <h4>Distributed Ledger System</h4>
            <p>High-throughput ledger processing 50k TPS.</p>
            <span className="tag s2">S2</span>
            <span className="tag s5">S5</span>
          </div>

          <div className="project-card">
            <h4>AlgoVis Library</h4>
            <p>Algorithm visualization used by universities.</p>
            <span className="tag s1">S1</span>
            <span className="tag s3">S3</span>
          </div>
        </div>
      </section>

      {/* Experience */}
      <section className="card">
        <h3>Experience</h3>

        <div className="timeline">
          <div className="timeline-item">
            <h4>Senior Backend Engineer</h4>
            <span>TechFlow Systems • 2021–Present</span>
            <p>Reduced latency by 40%, reliability 99.999%.</p>
          </div>

          <div className="timeline-item">
            <h4>Software Engineer</h4>
            <span>Startup Inc • 2018–2021</span>
            <p>Built MVP securing Series-A funding.</p>
          </div>
        </div>
      </section>

      {/* Education */}
      <section className="card">
        <h3>Education</h3>
        <p>Stanford University — M.S. Computer Science</p>
        <p>UC Berkeley — B.S. Electrical Engineering</p>
      </section>

    </div>
  );
}
