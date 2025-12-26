import { useNavigate } from 'react-router-dom';

import '../Style/intro.css'

const Intro = () => {

    const navigate = useNavigate();

    return (
        <div className="intro-container">
            <div className="bg-gradient" />
            <div className="bg-grid" />

            <section className="hero">
                <h1 className="title">
                    Skill<span>Sync</span>
                </h1>

                <p className="subtitle">
                    No posts. No noise. <br />
                    Only <span>skills</span> that prove you belong.
                </p>

                <div className="cta-group">
                    <button onClick={() => navigate("/signup")} className="btn primary">Get Started</button>
                    <button onClick={() => navigate("/login")} className="btn ghost">  Log IN  </button>
                </div>

                <p className="tagline">
                    LinkedIn talks. <br />
                    SkillSync shows.
                </p>
            </section>

            <section className="features">
                <div className="feature-card">
                    <h3>Skill-Only Profiles</h3>
                    <p>
                        No posts. No fake titles. Your profile is built only from real,
                        measurable skills and activity.
                    </p>
                </div>

                <div className="feature-card">
                    <h3>GitHub-Backed Proof</h3>
                    <p>
                        Skills are validated through GitHub activity, consistency, and real
                        projects — not certificates.
                    </p>
                </div>

                <div className="feature-card">
                    <h3>Find Real Teammates</h3>
                    <p>
                        Build teams for hackathons, startups, or projects based on skill
                        match — not followers.
                    </p>
                </div>

                <div className="feature-card">
                    <h3>Grow, Don’t Flex</h3>
                    <p>
                        Visibility depends on effort and progress. No skills? No reach.
                    </p>
                </div>
            </section>
        </div>
    );
};

export default Intro;