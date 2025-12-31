import React, { useState } from "react"
import { API } from "../../config/Api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import "../../Style/createprofile.css"

type PersonalDetails = {
    name: string;
    contactmail: string;
    portfolio: string;
    country: string;
    location: string;
}

type StudentDetails = {
    currentstatus: string,
    level: string,
    college: string,
    year: string,
    passingyear: string,
    branch: string,
}

type WorkDetails = {
    workingprofile: string,
    preferredrole: string,
    yearexpereience: string,
    company: string,
}

type Platformusername = {
    github: string,
    codeforces: string,
    stackoverflow: string,
}

type ProjectDetails = {
    name: string,
    link: string,
    description: string,
}

const Create_Profile = () => {

    const navigate = useNavigate();

    const [skills, setSkills] = useState<string[]>([]);
    const [currentSkill, setCurrentSkill] = useState<string>("");

    const [projects, setProjects] = useState<ProjectDetails[]>([
        { name: "", description: "", link: "" }
    ]);

    const [personaldetails, setpersonaldetails] = useState<PersonalDetails>({
        name: "",
        contactmail: "",
        country: "",
        portfolio: "",
        location: "",
    })

    const handlePersonal = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setpersonaldetails((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const [studentdetails, setstudentdetails] = useState<StudentDetails>({
        level: "",
        college: "",
        year: "",
        passingyear: "",
        branch: "",
        currentstatus: "",
    })

    const handleStudent = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setstudentdetails((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const [workdetails, setworkdetails] = useState<WorkDetails>({
        preferredrole: "",
        yearexpereience: "",
        workingprofile: "",
        company: "",
    })

    const handleWork = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setworkdetails((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const [platformuser, setplatformusername] = useState<Platformusername>({
        github: "",
        codeforces: "",
        stackoverflow: "",
    })

    const HandleUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setplatformusername((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleSkillKeyPress = (e: React.KeyboardEvent<HTMLInputElement | HTMLSelectElement>) => {
        if (e.key === 'Enter' && currentSkill.trim()) {
            e.preventDefault();
            if (!skills.includes(currentSkill.trim())) {
                setSkills([...skills, currentSkill.trim()]);
                setCurrentSkill('');
            }
        }
    };

    const removeSkill = (skillToRemove: string) => {
        setSkills(skills.filter(skill => skill !== skillToRemove));
    };


    const addProject = () => {
        const last = projects[projects.length - 1];
        if (!last.name || !last.description || !last.link) return;
        if (projects.length < 3) {
            setProjects([
                ...projects,
                { name: "", description: "", link: "" }
            ]);
        }
    };

    const removeProject = (index: number) => {
        setProjects(projects.filter((_, i) => i !== index));
    };


    const updateProject = (
        index: number,
        field: keyof ProjectDetails,
        value: string
    ) => {
        const newprojects = [...projects];
        newprojects[index][field] = value;
        setProjects(newprojects);
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = {
            personal: personaldetails,
            student: studentdetails,
            work: workdetails,
            skills: skills,
            platformusername: platformuser,

            projects: projects.filter(
                p => p.name.trim() && p.description.trim() && p.link.trim()
            ),

        };
        console.log(formData);
        try {
            const res = await API("POST", "/auth/personalsave/", formData)
            const data = await res.json()
            console.log(data.mg)
            toast.info(data.mg);
            if (res.ok) {
                navigate("/dashboard")
            }
        } catch (err) {
            console.log(err)
            toast.error('Something went wrong');
        }
        toast.success('Profile Created! Check console for data.');
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="bg-gradient"></div>
                <div className="bg-grid"></div>
                <div className="main-wrapper">
                    <div className="form-grid">
                        <div className="child-container">
                            <div className="personal-detail-card">
                                <h1 className="card-heading">Personal Details</h1>
                                <div className="input-row">
                                    <div className="general-option">
                                        <label>Name</label>
                                        <input name="name" required onChange={handlePersonal} placeholder="ex. Joe" type="text" />
                                    </div>
                                    <div className="general-option">
                                        <label>Email</label>
                                        <input name="contactmail" required onChange={handlePersonal} placeholder="ex. example@gmail.com" type="text" />
                                    </div>
                                </div>
                                <div className="input-row">
                                    <div className="general-option">
                                        <label>Portfolio Link</label>
                                        <input name="portfolio" required onChange={handlePersonal} placeholder="ex. https://www.joesportfolio.com" type="text" />
                                    </div>
                                    <div className="general-option">
                                        <label>Country</label>
                                        <input name="country" required onChange={handlePersonal} placeholder="ex. U.S.A" type="text" />
                                    </div>
                                </div>
                                <div className="input-row">
                                    <div className="general-option">
                                        <label>City</label>
                                        <input name="location" required onChange={handlePersonal} placeholder="ex. California" type="text" />
                                    </div>
                                </div>
                            </div>
                        </div>

                    <div className="child-container">
                        <div className="education-card">
                            <h1>Education Details</h1>
                            <div className="input-row">
                                <div className="general-option">
                                    <label>Current Status</label>
                                    <select name="currentstatus" onChange={handleStudent}>
                                        <option value="student">Student</option>
                                        <option value="full-time">Working Professional</option>
                                        <option value="intern">Intern</option>
                                    </select>
                                </div>
                                <div className="general-option">
                                    <label>Education Level</label>
                                    <select name="level" onChange={handleStudent}>
                                        <option value="bachelor">Bachelor's</option>
                                        <option value="master">Master's</option>
                                        <option value="phd">PhD</option>
                                        <option value="diploma">Diploma</option>
                                    </select>
                                </div>
                                <div className="general-option">
                                    <label>College/University</label>
                                    <input name="college" onChange={handleStudent}placeholder="Ex. IIT Mandi" type="text" />
                                </div>
                            </div>
                            <div className="input-row">
                                <div className="general-option">
                                    <label>Year</label>
                                    <input name="year" onChange={handleStudent} placeholder="ex. 2" type="number" />
                                </div>
                                <div className="general-option">
                                    <label>Branch</label>
                                    <input name="branch" onChange={handleStudent} placeholder="ex. Mathematics and Computing" type="text" />
                                </div>
                            </div>
                            <div className="input-row">
                                <div className="general-option">
                                    <label>Passing Year</label>
                                    <input name="passingyear" onChange={handleStudent} placeholder="ex. 2028" type="number" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="child-container">
                        <div className="working-professional-card">
                            <h1>Professional Details</h1>
                            <div className="input-row">
                                <div className="general-option">
                                    <label>Preferred Role</label>
                                    <input name="preferredrole" onChange={handleWork} placeholder="ex. Web Developer" type="text" />
                                </div>
                                <div className="general-option">
                                    <label>Working Profile</label>
                                    <select className="select-student" name="workingprofile" onChange={handleWork}>
                                        <option className="option-student" value="part-time">Part Time</option>
                                        <option className="option-student" value="full-time">Full Time</option>
                                    
                                    </select>
                                </div>
                                <div className="general-option">
                                    <label>Company Name</label>
                                    <input name="company" onChange={handleWork} placeholder="ex. Google" type="text" />
                                </div>
                            </div>
                            <div className="input-row">
                                <div className="general-option">
                                    <label>Years of Experience</label>
                                    <input name="yearexpereience" onChange={handleWork} placeholder="ex. 2" type="number" />
                                </div>
                            </div>

                                <div className="project-container">
                                    <label>Projects (Max 3)</label>

                                    {projects.map((project, index) => (
                                        <div key={index} className="project-entry">

                                            <input
                                                placeholder="Project Name"
                                                value={project.name}
                                                onChange={(e) =>
                                                    updateProject(index, "name", e.target.value)
                                                }
                                                required
                                            />

                                            <textarea
                                                placeholder="Project Description"
                                                value={project.description}
                                                onChange={(e) =>
                                                    updateProject(index, "description", e.target.value)
                                                }
                                                required
                                            />

                                            <input
                                                placeholder="Project Link"
                                                value={project.link}
                                                onChange={(e) =>
                                                    updateProject(index, "link", e.target.value)
                                                }
                                                required
                                            />

                                            {projects.length > 1 && (
                                                <button
                                                    type="button"
                                                    onClick={() => removeProject(index)}
                                                >
                                                    Remove
                                                </button>
                                            )}
                                        </div>
                                    ))}

                                    {projects.length < 3 && (
                                        <button type="button" onClick={addProject}>
                                            + Add Project
                                        </button>
                                    )}
                                </div>

                                <div className="skills-container">
                                    <label>Add Your Skills</label>
                                    <div className="skills-input-wrapper" onClick={() => document.getElementById('skillInput')?.focus()}>
                                        <div className="skills-container-display">
                                            {skills.map((skill, index) => (
                                                <span key={index} className="skill-tag">
                                                    {skill}
                                                    <span className="remove-skill" onClick={() => removeSkill(skill)}> x </span>
                                                </span>
                                            ))}
                                        </div>
                                        <input id="skillInput" className="skill-input" placeholder="Type a skill and press Enter" value={currentSkill} onChange={(e) => setCurrentSkill(e.target.value)} onKeyPress={handleSkillKeyPress} />
                                    </div>
                                    <p className="help-text">Press Enter to add a skill. Click the x to remove.</p>
                                </div>

                                <div className="profile-section">
                                    <div className="input-row">
                                        <div className="general-option">
                                            <label>Codeforces Profile</label>
                                            <input onChange={HandleUsername} name="codeforces" placeholder="ex. Joe12" type="text" />
                                        </div>
                                    </div>
                                    <div className="input-row">
                                        <div className="general-option">
                                            <label>Github Profile</label>
                                            <input onChange={HandleUsername} name="github" placeholder="ex. Joe12" type="text" />
                                        </div>
                                    </div>
                                    <div className="input-row">
                                        <div className="general-option">
                                            <label>StackOverflow Profile</label>
                                            <input onChange={HandleUsername} name="stackoverflow" placeholder="ex. Joe12" type="text" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <button className="submit-button" type="submit"> Create Profile </button>
                </div>
            </form>
        </div>
    )
}
export default Create_Profile;

