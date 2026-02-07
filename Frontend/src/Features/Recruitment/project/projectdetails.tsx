import { Link } from "react-router-dom";

const ProjectDetails = () => {
    return (
        <div className="project-page app-container">
            {/* Header */}
            <div className="project-header">
                <div className="project-breadcrumb">
                    Recruitment › Projects › AI Engine Optimization
                </div>

                <div className="project-title-row">
                    <div>
                        <h1 className="project-title">AI Engine Optimization</h1>
                        <p className="project-owner">
                            By <span>@tech_lead_alpha</span>
                        </p>
                    </div>

                    <Link to="apply" className="project-apply-btn">
                        Apply to Join
                    </Link>
                </div>

                <div className="project-tags">
                    <span className="project-tag">AI</span>
                    <span className="project-tag">Backend</span>
                    <span className="project-tag">Performance</span>
                </div>
            </div>

            <div className="project-layout">
                {/* Left */}
                <div className="project-main">
                    <section className="project-section">
                        <h3>Summary</h3>
                        <p>
                            Build a high-performance inference engine for LLM APIs with
                            sub-200ms latency and scalable architecture.
                        </p>
                    </section>

                    <section className="project-section">
                        <h3>Problem Statement</h3>
                        <p>
                            Current LLM inference pipelines are slow, expensive, and not
                            optimized for real-time workloads. We aim to redesign the system
                            to handle millions of requests efficiently.
                        </p>
                    </section>

                    <section className="project-section">
                        <h3>What We’re Building</h3>
                        <p>
                            A distributed inference layer with smart caching, batching, and
                            model routing. This will serve as a backbone for AI products at
                            scale.
                        </p>
                    </section>

                    <section className="project-section">
                        <h3>Tech Stack</h3>
                        <div className="project-tech">
                            <span className="tech-pill">Python</span>
                            <span className="tech-pill">FastAPI</span>
                            <span className="tech-pill">Redis</span>
                            <span className="tech-pill">Docker</span>
                            <span className="tech-pill">LLMs</span>
                        </div>
                    </section>
                </div>

                {/* Right */}
                <aside className="project-side">
                    <div className="project-card">
                        <h4>Team Needs</h4>
                        <p>ML Engineer, Backend Engineer</p>
                        <p>Members needed: 3</p>
                    </div>

                    <div className="project-card">
                        <h4>Commitment</h4>
                        <p>Part-time (10–20 hrs/week)</p>
                        <p>Async-first collaboration</p>
                    </div>

                    <div className="project-card">
                        <h4>Timeline</h4>
                        <p>Start: Feb 2026</p>
                        <p>End: May 2026</p>
                    </div>

                    <Link to="apply" className="project-apply-side-btn">
                        Apply to Join
                    </Link>
                </aside>
            </div>
        </div>
    );
};

export default ProjectDetails;
