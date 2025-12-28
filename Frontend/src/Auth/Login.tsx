import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import { API_BASE_URL } from "../config/Api";

import "../Style/login.css"

const Login = () => {

    const navigate = useNavigate()

    const [UserName, SetUserName] = useState<string>("");
    const [Password, SetPassword] = useState<string>("");

    const HandleSubmit = async () => {
        try {
            const res = await fetch(`${API_BASE_URL}/api/token/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: UserName,
                    password: Password,
                }),
            });

            if (!res.ok) {
                alert("Invalid Credentials")
                return
            }

            const data = await res.json();

            localStorage.setItem("access", data.access)
            localStorage.setItem("refresh", data.refresh)

            const access = localStorage.getItem("access")
            console.log(data);

            if (access) {
                navigate("/dashboard")
            }

            else {
                alert("Something went wrong check")
            }
        } catch (err) {
            alert("something went wrong")
            console.log(err)
        }
    };



    return (
        <div className="ss-login">
            <div className="login-container">
                <div className="login-card">
                    <div className="login-header">
                        <h1 className="brand">Skillsync</h1>
                        <h3 className="subtitle">Login</h3>
                    </div>

                    <div className="login-form">
                        <div className="input-group">
                            <label>UserName</label>
                            <input placeholder="UserName" required maxLength={100} onChange={(e) => SetUserName(e.target.value)} />
                        </div>

                        <div className="input-group">
                            <label>Password</label>
                            <input type="password" placeholder="Password" required maxLength={20} minLength={8} onChange={(e) => SetPassword(e.target.value)} />
                        </div>

                        <button className="btn primary" onClick={HandleSubmit}> Submit </button>
                        <div className="signup-redirect">
                            <p>New user? <NavLink to="/signup">Signup</NavLink> </p>
                        </div>

                    </div>
                </div>
            </div>
        </div>

    )


}

export default Login;