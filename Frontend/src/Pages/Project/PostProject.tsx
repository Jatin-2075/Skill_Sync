import { useState } from "react"

export default function PostProject() {

    const [form, setForm] = useState({
        title: "",
        description: "",
        techStack: "",
        github: "",
        demo: "",
        screenshot: ""
    })

    const update = (key: string, value: string) => {
        setForm(prev => ({ ...prev, [key]: value }))
    }

    const submit = () => {

        fetch("http://localhost:8000/projects", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(form)
        })
            .then(res => res.json())
            .then(data => {
                console.log("project created", data)
            })
            .catch(err => console.log(err))
    }

    return (
        <div>

            <h1>Post Project</h1>

            <input
                placeholder="Project title"
                value={form.title}
                onChange={(e) => update("title", e.target.value)}
            />

            <textarea
                placeholder="Description"
                value={form.description}
                onChange={(e) => update("description", e.target.value)}
            />

            <input
                placeholder="Tech stack"
                value={form.techStack}
                onChange={(e) => update("techStack", e.target.value)}
            />

            <input
                placeholder="Github link"
                value={form.github}
                onChange={(e) => update("github", e.target.value)}
            />

            <input
                placeholder="Demo link"
                value={form.demo}
                onChange={(e) => update("demo", e.target.value)}
            />

            <input
                placeholder="Screenshot url"
                value={form.screenshot}
                onChange={(e) => update("screenshot", e.target.value)}
            />

            <button onClick={submit}>
                Post Project
            </button>

        </div>
    )
}