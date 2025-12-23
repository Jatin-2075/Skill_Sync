import { useState } from "react";

const Create_Profile = () => {

    return (
        <div>
            <div>
                <h1>HI, Welcome to Skillsync</h1>
                <p>Create Your profile first so that you can interact with people </p>
            </div>
            <div>
                <div>
                    <label>Photo</label>
                    <input type="file" accept="image/*" />
                </div>
                <div>
                    <label>Name</label>
                    <input type="text" placeholder="Your Name" maxLength={20}/>
                </div>
                <div>
                    <label>Date of Birth</label>
                    <input placeholder="D.O.B" type="date" />
                </div>
                <div>
                    <label>Bio</label>
                    <textarea placeholder="Write about you your skills achievements experiences and other... " maxLength={100} />
                </div>
                <div>
                    <label>Job Title</label>
                    <input placeholder="Your Job Title (ex. Developer, student, Manager) " type="text" maxLength={50} minLength={5} />
                </div>
            </div>
        </div>
    )
}

export default Create_Profile;