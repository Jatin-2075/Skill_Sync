import { API_BASE_URL } from "../../Config/Api";
import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";

export const Login = () => {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        const user = localStorage.getItem("username") || "";
        setUsername(user);
    }, []);

    const handleSubmit = async () => {
        try {
            const res = await fetch(`${API_BASE_URL}/api/token/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username,
                    password
                })
            });

            if (!res.ok) {
                alert("Invalid credentials");
                return;
            }

            const data = await res.json();

            localStorage.setItem("access", data.access);
            localStorage.setItem("refresh", data.refresh);

            navigate("/Explore");

        } catch (err) {
            console.log(err);
            alert("Login failed");
        }
    };

    return (
        <div className="login-container">
            <h2 className="login-title">Login</h2>

            <input
                className="login-input"
                placeholder="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />

            <input
                className="login-input"
                type="password"
                placeholder="password"
                onChange={(e) => setPassword(e.target.value)}
            />

            <button className="login-button" onClick={handleSubmit}>
                Login
            </button>

            <p className="login-text">
                New user? <NavLink className="login-link" to="/signup">Signup</NavLink>
            </p>
        </div>
    );
};



export const Signup = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = async () => {

        if (password !== confirmPassword) {
            alert("Passwords don't match");
            return;
        }

        try {
            const res = await fetch(`${API_BASE_URL}/auth/signup/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username,
                    email,
                    password
                })
            });

            const data = await res.json();

            if (data.success) {
                navigate("/login");
            }

        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="signup-container">
            <h2 className="signup-title">Signup</h2>

            <input
                className="signup-input"
                placeholder="username"
                onChange={(e) => setUsername(e.target.value)}
            />

            <input
                className="signup-input"
                placeholder="email"
                onChange={(e) => setEmail(e.target.value)}
            />

            <input
                className="signup-input"
                type="password"
                placeholder="password"
                onChange={(e) => setPassword(e.target.value)}
            />

            <input
                className="signup-input"
                type="password"
                placeholder="confirm password"
                onChange={(e) => setConfirmPassword(e.target.value)}
            />
            

            <button className="signup-button" onClick={handleSubmit}>
                Create Account
            </button>

            <p className="signup-text">
                Already have account?{" "}
                <NavLink className="signup-link" to="/login">
                    Login
                </NavLink>
            </p>
        </div>
    );
};