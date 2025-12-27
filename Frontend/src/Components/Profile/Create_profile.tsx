
const Create_Profile = () => {

    return (
        <div className="profile-wrapper">
            <h1>Hi, Welcome to SkillSync</h1>
            <p>Create your profile to start learning and collaborating</p>

            <div className="profile-form">

                <div className="form-group">
                    <label>Role</label>
                    <select>
                        <option value="">Select role</option>
                        <option value="learner">Learner</option>
                        <option value="mentor">Mentor</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Primary Skills</label>
                    <input type="text" placeholder="React, Python, ML" />
                </div>

                <div className="form-group">
                    <label>Skill Level</label>
                    <select>
                        <option>Beginner</option>
                        <option>Intermediate</option>
                        <option>Advanced</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Learning Goal</label>
                    <input type="text" placeholder="What do you want to master?" />
                </div>

                <div className="form-group">
                    <label>About (optional)</label>
                    <textarea placeholder="Short intro about yourself" />
                </div>

                <button className="save-btn">Create Profile</button>
            </div>
        </div>
    );

}
export default Create_Profile;