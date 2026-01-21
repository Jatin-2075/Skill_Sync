import { Link } from "react-router-dom";

type MyProposal = {
    id: string;
    projectTitle: string;
    owner: string;
    summary: string;
    status: "pending" | "accepted" | "rejected";
    appliedAt: string;
};

const mockData: MyProposal[] = [
    {
        id: "1",
        projectTitle: "AI Engine Optimization",
        owner: "tech_lead_alpha",
        summary: "Build a high-performance inference engine for LLM APIs.",
        status: "pending",
        appliedAt: "2 days ago",
    },
    {
        id: "2",
        projectTitle: "Realtime Chat App",
        owner: "dev_ash",
        summary: "End-to-end encrypted chat platform.",
        status: "accepted",
        appliedAt: "1 week ago",
    },
];

const MyProposals = () => {
    return (
        <div className="myproposals-page app-container">
            <div className="myproposals-header">
                <h1 className="myproposals-title">My Proposals</h1>
                <p className="myproposals-subtitle">
                    Track every project you’ve applied to.
                </p>
            </div>

            {mockData.length === 0 ? (
                <div className="myproposals-empty">
                    <p>You haven’t sent any proposals yet.</p>
                    <Link to="/recruit" className="myproposals-cta">
                        Find Projects
                    </Link>
                </div>
            ) : (
                <div className="myproposals-list">
                    {mockData.map((p) => (
                        <div key={p.id} className="myproposal-card">
                            <div className="myproposal-top">
                                <div>
                                    <h3 className="myproposal-title">{p.projectTitle}</h3>
                                    <p className="myproposal-owner">
                                        By <span>@{p.owner}</span>
                                    </p>
                                </div>

                                <span className={`myproposal-status myproposal-${p.status}`}>
                                    {p.status}
                                </span>
                            </div>

                            <p className="myproposal-summary">{p.summary}</p>

                            <div className="myproposal-footer">
                                <span className="myproposal-time">
                                    Applied {p.appliedAt}
                                </span>

                                <Link
                                    to={`/recruit/project/${p.id}`}
                                    className="myproposal-view"
                                >
                                    View Project
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyProposals;
