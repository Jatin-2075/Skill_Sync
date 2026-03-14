import { useEffect, useState } from "react";

interface Project {
    id: number;
    title: string;
    description: string;
    tech: string[];
    owner: string;
    role: string;
    progress: number;
    status: "active" | "completed" | "paused";
    github: string;
    demo?: string;
}

export default function EnrolledProjects() {

    const [projects, setProjects] = useState<Project[]>([]);
    const [query, setQuery] = useState("");
    const [tab, setTab] = useState("all");

    useEffect(() => {
        fetch("http://localhost:8000/projects/enrolled")
            .then(res => res.json())
            .then(data => setProjects(data))
            .catch(err => console.log(err));
    }, []);

    const leaveProject = (id: number) => {
        fetch(`http://localhost:8000/projects/leave/${id}`, {
            method: "POST"
        })
            .then(() => {
                setProjects(prev => prev.filter(p => p.id !== id));
            })
            .catch(err => console.log(err));
    };

    const filtered = projects.filter(p => {

        const matchTab =
            tab === "all" || p.status === tab;

        const matchSearch =
            p.title.toLowerCase().includes(query.toLowerCase()) ||
            p.tech.join(" ").toLowerCase().includes(query.toLowerCase()) ||
            p.owner.toLowerCase().includes(query.toLowerCase());

        return matchTab && matchSearch;

    });

    return (
        <div>

            <h1>My Projects</h1>

            <input
                placeholder="Search projects"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />

            <div>
                <button onClick={() => setTab("all")}>All</button>
                <button onClick={() => setTab("active")}>Active</button>
                <button onClick={() => setTab("completed")}>Completed</button>
                <button onClick={() => setTab("paused")}>Paused</button>
            </div>

            {filtered.map(project => (
                <div key={project.id} style={{ border: "1px solid gray", margin: 10, padding: 10 }}>

                    <h3>{project.title}</h3>

                    <p>{project.description}</p>

                    <p><b>Owner:</b> {project.owner}</p>

                    <p><b>Role:</b> {project.role}</p>

                    <p><b>Status:</b> {project.status}</p>

                    <p><b>Progress:</b> {project.progress}%</p>

                    <p><b>Tech:</b> {project.tech.join(", ")}</p>

                    <a href={project.github}>Github</a>

                    {project.demo && <a href={project.demo}> Demo</a>}

                    <br />

                    <button onClick={() => leaveProject(project.id)}>
                        Leave Project
                    </button>

                </div>
            ))}

        </div>
    );
}