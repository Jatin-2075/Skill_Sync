import type React from "react";
import { API } from "../config/Api";
import { useState } from "react";

type platformuser = {
    stackoverflow: string,
    codeforces: string,
    github: string,
}

type Resultbackend = {
    githubusername: string,
    stackusername: string,
    codeforcesusername: string,
}

const Platformuser = () => {

    const [Username, Setusername] = useState<platformuser>({
        stackoverflow: "",
        codeforces: "",
        github: "",
    })
    
    const [result, Setresult] = useState<Resultbackend>({
        stackusername: "",
        githubusername: "",
        codeforcesusername: "",
    });

    const handlechange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        Setusername((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handlesubmit = async () => {
        alert("now will only check the username")
        try {
            const res = await API("POST", "/auth/usernamecheck", Username)
            const data = await res.json()
            console.log(Username);
            console.log(data)
            Setresult(data);

        } catch (err){
            alert(err)
            console.log(err)
        }
    }

    return (
        <div className="profile-section">
            <div className="input-row">
                <div className="general-option">
                    <label>Codeforces Profile</label>
                    <input value={Username.codeforces} onChange={handlechange} name="codeforces" placeholder="ex. Joe12" type="text" />
                </div>
            </div>
            <div className="input-row">
                <div className="general-option">
                    <label>Github Profile</label>
                    <input value={Username.github} onChange={handlechange} name="github" placeholder="ex. Joe12" type="text" />
                </div>
            </div>
            <div className="input-row">
                <div className="general-option">
                    <label>StackOverflow Profile</label>
                    <input value={Username.stackoverflow} onChange={handlechange} name="stackoverflow" placeholder="ex. Joe12" type="text" />
                </div>
            </div>
            <button className="platform-submit-button" type="button" onClick={handlesubmit}>Submit</button>
        </div>
    )
}

export default Platformuser;