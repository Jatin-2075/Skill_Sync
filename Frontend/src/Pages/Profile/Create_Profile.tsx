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
    currentstatus: string;
    level: string,
    college: string,
    year: number,
    passingyear: number,
    branch : string,
}

type WorkDetails = {
    workingprofile: string;
    preferredrole: string;
    yearexpereience: number;
    company: string;
}

const Create_Profile = () => {

    const navigate = useNavigate();

    const [skills, setSkills] = useState<string[]>([]);
    const [currentSkill, setCurrentSkill] = useState<string>("");
    const [projects, setProjects] = useState<string[]>([""]);

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
        year: 0,
        passingyear: 0,
        branch : "",
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
        preferredrole : "",
        yearexpereience: 0,
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
        if (projects.length < 3) {
            setProjects([...projects, '']);
        }
    };

    const removeProject = (index: number) => {
        setProjects(projects.filter((_, i) => i !== index));
    };


    const updateProject = (index: number, value: string) => {
        const newProjects = [...projects];
        newProjects[index] = value;
        setProjects(newProjects);
    };

    const handleSubmit = async () => {
        const formData = {
            personal: personaldetails,
            student: studentdetails,
            work: workdetails,
            skills: skills,
            projects: projects.filter(p => p.trim() !== '')
        };

        try {
            const res = await API("POST", "/auth/personalsave/", formData)
            const data = await res.json()
            console.log(data.mg)
            toast.info(data.mg);
            if(res.ok){
                navigate("/dashboard")
            }
            
        } catch (err){
            console.log(err)
            toast.error('Something went wrong');
        }

        console.log('Form Data:', formData);
        toast.success('Profile Created! Check console for data.');

    };


    return (
        <div>
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
                                    <input name="name" onChange={handlePersonal} placeholder="ex. Joe" type="text" />
                                </div>
                                <div className="general-option">
                                    <label>Email</label>
                                    <input name="contactmail" onChange={handlePersonal} placeholder="ex. example@gmail.com" type="text" />
                                </div>
                            </div>
                            <div className="input-row">
                                <div className="general-option">
                                    <label>Portfolio Link</label>
                                    <input name="portfolio" onChange={handlePersonal} placeholder="ex. https://www.joesportfolio.com" type="text" />
                                </div>
                                <div className="general-option">
                                    <label>Country</label>
                                    <input name="country" onChange={handlePersonal} placeholder="ex. U.S.A" type="text" />
                                </div>
                            </div>
                            <div className="input-row">
                                <div className="general-option">
                                    <label>City</label>
                                    <input name="location" onChange={handlePersonal} placeholder="ex. California" type="text" />
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
                                        <option className="option-class" value="student">Student</option>
                                        <option className="option-class" value="full-time">Working Professional</option>
                                        <option className="option-class" value="intern">Intern</option>
                                    </select>
                                </div>
                                <div className="general-option">
                                    <label>Education Level</label>
                                    <select name="level" onChange={handleStudent}>
                                        <option className="option-class" value="bachelor">Bachelor's</option>
                                        <option className="option-class" value="master">Master's</option>
                                        <option className="option-class" value="phd">PhD</option>
                                        <option className="option-class" value="diploma">Diploma</option>
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
                                    <select name="workingprofile" onChange={handleWork}>
                                        <option className="option-class" value="part-time">Part Time</option>
                                        <option className="option-class" value="full-time">Full Time</option>
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
                                <label>Project Links (Max 3)</label>
                                {projects.map((project, index) => (
                                    <div key={index} className="project-entry">
                                        <input
                                            placeholder={`Project ${index + 1} URL`}
                                            type="text"
                                            value={project}
                                            name="project"
                                            onChange={(e) => updateProject(index, e.target.value)}
                                        />
                                        {projects.length > 1 && (
                                            <button
                                                className="remove-project-btn"
                                                onClick={() => removeProject(index)}
                                            >
                                                Remove
                                            </button>
                                        )}
                                    </div>
                                ))}
                                {projects.length < 3 && (
                                    <button
                                        className="add-project-btn"
                                        onClick={addProject}
                                    >
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
                                    <input
                                        id="skillInput"
                                        className="skill-input"
                                        placeholder="Type a skill and press Enter"
                                        value={currentSkill}
                                        onChange={(e) => setCurrentSkill(e.target.value)}
                                        onKeyPress={handleSkillKeyPress}
                                    />
                                </div>
                                <p className="help-text">Press Enter to add a skill. Click the x to remove.</p>
                            </div>

                            <div className="profile-section">
                                <div className="input-row">
                                    <div className="general-option">
                                        <label>Codeforces Profile</label>
                                        <input placeholder="ex. Joe12" type="text" />
                                    </div>
                                </div>
                                <div className="input-row">
                                    <div className="general-option">
                                        <label>Github Profile</label>
                                        <input placeholder="ex. Joe12" type="text" />
                                    </div>
                                </div>
                                <div className="input-row">
                                    <div className="general-option">
                                        <label>StackOverflow Profile</label>
                                        <input placeholder="ex. Joe12" type="text" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <button className="submit-button" onClick={handleSubmit}>
                    Create Profile
                </button>
            </div>
        </div>
    )
}
export default Create_Profile;

