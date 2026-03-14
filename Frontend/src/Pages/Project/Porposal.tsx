import { useState } from "react"

export default function SendProposal() {

    const [role, setRole] = useState("")
    const [skills, setSkills] = useState<string[]>([])
    const [proposal, setProposal] = useState("")
    const [availability, setAvailability] = useState("")

    const submitProposal = () => {

        fetch("http://localhost:8000/proposals", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                project_id: 1,
                role,
                skills,
                proposal,
                availability
            })
        })
            .then(res => res.json())
            .then(data => {
                console.log("proposal sent", data)
            })
            .catch(err => console.log(err))

    }

    return (
        <div>

            <h1>Send Proposal</h1>

            <div>
                <p>Select Role</p>

                <button onClick={() => setRole("frontend")}>Frontend</button>
                <button onClick={() => setRole("backend")}>Backend</button>
                <button onClick={() => setRole("fullstack")}>Fullstack</button>
            </div>

            <div>
                <p>Skills</p>

                <button onClick={() => setSkills([...skills, "React"])}>React</button>
                <button onClick={() => setSkills([...skills, "Node"])}>Node</button>
                <button onClick={() => setSkills([...skills, "Python"])}>Python</button>
            </div>

            <div>
                <p>Proposal</p>

                <textarea
                    value={proposal}
                    onChange={(e) => setProposal(e.target.value)}
                />
            </div>

            <div>
                <p>Availability</p>

                <select onChange={(e) => setAvailability(e.target.value)}>
                    <option>1-5 hrs</option>
                    <option>5-10 hrs</option>
                    <option>10-20 hrs</option>
                </select>
            </div>

            <button onClick={submitProposal}>
                Send Proposal
            </button>

        </div>
    )
}