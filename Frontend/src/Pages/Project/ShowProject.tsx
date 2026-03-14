import { useEffect, useState } from "react";

interface Project {
    id: number;
    title: string;
    description: string;
    tech: string[];
    developer: string;
    github: string;
    demo?: string;
}

export default function ProjectsPage() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [query, setQuery] = useState("");

    useEffect(() => {
        fetch("http://localhost:8000/projects")
            .then((res) => res.json())
            .then((data) => setProjects(data))
            .catch((err) => console.log(err));
    }, []);

    const filtered = projects.filter((p) =>
        p.title.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <div>
            <h1>Projects</h1>

            <input
                placeholder="search project"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />

            {filtered.map((project) => (
                <div key={project.id} style={{ border: "1px solid gray", padding: 10, margin: 10 }}>
                    <h3>{project.title}</h3>

                    <p>{project.description}</p>

                    <p>Developer: {project.developer}</p>

                    <p>Tech: {project.tech.join(", ")}</p>

                    <a href={project.github}>Github</a>

                    {project.demo && <a href={project.demo}> Demo</a>}
                </div>
            ))}
        </div>
    );
}