import { useEffect, useState } from "react";
import { API } from "../../config/Api";
import {
    User,
    Mail,
    MapPin,
    Briefcase,
    GraduationCap,
    Code,
    Folder
} from "lucide-react";

import "../../Style/profile.css";

const Profile = () => {
    const [profile, setProfile] = useState<any>(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await API("GET", "/auth/profile/");
                const data = await res.json();
                setProfile(data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchProfile();
    }, []);

    if (!profile) return <div className="profile-loading">Loading...</div>;

    return (
        <div className="profile-wrapper">
            {/* Header - full width */}
            <div className="profile-header glass">
                <div>
                    <h1>{profile.personal?.name}</h1>
                    <p>{profile.work?.preferredrole}</p>
                </div>
                <User size={42} />
            </div>

            {/* Grid: 2x2 + Projects full width */}
            <div className="profile-grid">
                {/* Personal */}
                <div className="profile-card glass">
                    <h3><User size={16} /> Personal</h3>
                    <p><Mail size={14} /> {profile.personal?.contactmail}</p>
                    <p><MapPin size={14} /> {profile.personal?.location}, {profile.personal?.country}</p>
                    <a href={profile.personal?.portfolio} target="_blank" rel="noopener noreferrer">
                        Portfolio
                    </a>
                </div>

                {/* Education */}
                <div className="profile-card glass">
                    <h3><GraduationCap size={16} /> Education</h3>
                    <p>{profile.student?.college}</p>
                    <p>{profile.student?.branch}</p>
                    <p>{profile.student?.year} → {profile.student?.passingyear}</p>
                </div>

                {/* Work */}
                <div className="profile-card glass">
                    <h3><Briefcase size={16} /> Work</h3>
                    <p>{profile.work?.workingprofile}</p>
                    <p>{profile.work?.company}</p>
                    <p>{profile.work?.yearexperience} yrs</p>
                </div>

                {/* Skills */}
                <div className="profile-card glass">
                    <h3><Code size={16} /> Skills</h3>
                    <div className="skill-tags">
                        {profile.skills.map((s: string) => (
                            <span key={s}>{s}</span>
                        ))}
                    </div>
                </div>

                {/* Projects - spans full width */}
                <div className="profile-card profile-projects glass">
                    <h3><Folder size={16} /> Projects</h3>
                    {profile.projects.map((p: any) => (
                        <div key={p.name} className="project-item">
                            <h4>{p.name}</h4>
                            <p>{p.description}</p>
                            <a href={p.link} target="_blank" rel="noopener noreferrer">View</a>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Profile;