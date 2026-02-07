import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { API } from "../../../config/Api";

interface Project {
    id: string;
    title: string;
    summary: string;
    category: string;
    creator: string;

    narrative: {
        problem: string;
        solution: string;
        repo: string;
    };

    team: {
        desired_members: number;
        min_rating: number;
    };

    collaboration: {
        commitment: string;
        style: string;
    };

    techstack: string[];
}



const ProjectDetails = () => {
    const { id } = useParams();

    const [project, setProject] = useState<Project | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const data: any = await API("GET", `/project/detail/${id}/`);

                if (!data?.project) {
                    throw new Error("Invalid response");
                }

                setProject(data.project);

            } catch (err) {
                console.log(err);
                setError("Failed to load project");
            } finally {
                setLoading(false);
            }
        };

        fetchProject();
    }, [id]);


    if (loading) return <h2>Loading bro...</h2>;
    if (error) return <h2>{error}</h2>;
    if (!project) return <h2>No project found</h2>;

    return (
        <div className="project-page app-container">

            <div className="project-header">
                <div className="project-breadcrumb">
                    Recruitment › Projects › {project?.title}
                </div>

                <div className="project-title-row">
                    <div>
                        <h1 className="project-title">{project?.title}</h1>
                        <p className="project-owner">
                            By <span>@{project?.creator}</span>
                        </p>
                    </div>

                    <Link to="apply" className="project-apply-btn">
                        Apply to Join
                    </Link>
                </div>

                <div className="project-tags">
                    <span className="project-tag">
                        {project?.category}
                    </span>
                </div>
            </div>

            <div className="project-layout">
                <div className="project-main">

                    <section className="project-section">
                        <h3>Summary</h3>
                        <p>{project?.summary}</p>
                    </section>

                    <section className="project-section">
                        <h3>Problem Statement</h3>
                        <p>{project?.narrative?.problem}</p>
                    </section>

                    <section className="project-section">
                        <h3>Solution</h3>
                        <p>{project?.narrative?.solution}</p>
                    </section>

                    <section className="project-section">
                        <h3>Tech Stack</h3>
                        <div className="project-tech">
                            {project?.techstack?.map((t, i) => (
                                <span key={i} className="tech-pill">{t}</span>
                            ))}
                        </div>
                    </section>

                </div>

                <aside className="project-side">
                    <div className="project-card">
                        <h4>Team Needs</h4>
                        <p>
                            Members needed: {project?.team?.desired_members}
                        </p>
                        <p>
                            Min rating: {project?.team?.min_rating}
                        </p>
                    </div>

                    <div className="project-card">
                        <h4>Collaboration</h4>
                        <p>{project?.collaboration?.commitment}</p>
                        <p>{project?.collaboration?.style}</p>
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
