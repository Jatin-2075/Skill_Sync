import Footer from "../Components/Footer"


const Dashboard = () => {

    return (
        <div>
            <div>
                <h1>Skillsync</h1>
            </div>
            <div>
                { /* this is first para about the skillsync  */}
                <p>SkillSync is a platform where students, developers, and professionals connect through their skills</p>
                <p>Showcase your profile, discover people like you, collaborate on projects, and grow your network.</p>
                <p>Your skills. Your people. Your opportunities — all in one place</p>
            </div>
            <div>
                {/* my skillsync feature  */}

                <div>
                    <div>
                        <h3>Smart Profile</h3>
                        <p>Upload photo, bio, skills & portfolio links.</p>
                    </div>

                    <div >
                        <h3>Skill-based Networking</h3>
                        <p>Find people by skills and match fast.</p>
                    </div>

                    <div>
                        <h3>Real-Time Chat</h3>
                        <p>1:1 messaging, file sharing, online status.</p>
                    </div>

                    <div>
                        <h3>Project Collaboration</h3>
                        <p>Create projects, invite teammates, collaborate.</p>
                    </div>
                </div>
            </div>

            {/* why to use this section */}
            <div>
                <h2>Why Use SkillSync?</h2>
                <div>
                    <div>
                        <h3>Connect with People Who Match Your Skills</h3>
                        <p>Find students, developers, and professionals with similar interests.</p>
                    </div>
                    <div>
                        <h3>Build Your Personal Brand</h3>
                        <p>Create a profile that highlights your skills, achievements, and growth.</p>
                    </div>
                    <div>
                        <h3>Real-Time Interaction</h3>
                        <p>Chat instantly, share ideas, and collaborate on projects.</p>
                    </div>
                    <div>
                        <h3>Skill-Focused Networking</h3>
                        <p>Connect with people based on talent, not follower count.</p>
                    </div>
                    <div>
                        <h3>Grow Your Career</h3>
                        <p>Discover opportunities and build experience that actually matters.</p>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default Dashboard;