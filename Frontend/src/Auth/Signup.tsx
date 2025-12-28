import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import { API_BASE_URL } from "../config/Api";

import "../Style/signup.css"

const Signup = () => {

    const navigate = useNavigate();

    const [Email, SetEmail] = useState<string>("");
    const [Username, SetUsername] = useState<string>("");
    const [Password, SetPassword] = useState<string>("");
    const [ConfirmPassword, SetConfirmPassword] = useState<string>("");

    const HandleSubmit = async () => {

        console.log(Username, Email, Password)

        if (ConfirmPassword != Password) {
            alert("password Doesn't match")
            return
        }

        try {
            const res = await fetch(`${API_BASE_URL}/auth/signup/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: Username,
                    email: Email,
                    password: Password
                }),
            });

            const data = await res.json();
            console.log(data);
            alert(data.msg);

            if (data.success) {
                const reslogin = await fetch(`${API_BASE_URL}/api/token/`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        username: Username,
                        password: Password,
                    }),
                });
                if (!reslogin.ok) {
                    alert("Invalid Credentials")
                    return
                }
                const datalogin = await reslogin.json();

                localStorage.setItem("access", datalogin.access)
                localStorage.setItem("refresh", datalogin.refresh)
                const access = localStorage.getItem("access")

                console.log(datalogin);

                if (access) {
                    
                    navigate("/create")
                }

                else {
                    alert("Something went wrong check")
                }
            }
        }
        catch (err) {
            console.log(err)
        }
    }

    return (
        <div className="ss-signup">
            <div className="signup-container">
                <div className="signup-card">
                    <div className="signup-header">
                        <h1 className="brand">SkillSync</h1>
                        <h3 className="subtitle">Signup</h3>
                    </div>

                    <div className="signup-form">
                        <div className="input-group">
                            <label>Username</label>
                            <input placeholder="Username" onChange={(e) => SetUsername(e.target.value)} type="text" />
                        </div>

                        <div className="input-group">
                            <label>Email</label>
                            <input placeholder="Email" type="email" onChange={(e) => SetEmail(e.target.value)} />
                        </div>

                        <div className="input-group">
                            <label>Password</label>
                            <input type="password" onChange={(e) => SetPassword(e.target.value)} />
                        </div>

                        <div className="input-group">
                            <label>Confirm Password</label>
                            <input type="password" onChange={(e) => SetConfirmPassword(e.target.value)} />
                        </div>

                        <button className="btn primary" onClick={HandleSubmit}>
                            Create Account
                        </button>

                        <div className="login-redirect">
                            <p>Already have an account?</p> <NavLink to="/login" >Login</NavLink> 
                        </div>
                    </div>
                </div>
            </div>
        </div>


    )


}

export default Signup;