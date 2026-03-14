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
            const res = await fetch("API/api/token/", {
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
        <div>
            <h2>Login</h2>

            <input
                placeholder="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />

            <input
                type="password"
                placeholder="password"
                onChange={(e) => setPassword(e.target.value)}
            />

            <button onClick={handleSubmit}>Login</button>

            <p>
                New user? <NavLink to="/signup">Signup</NavLink>
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
            const res = await fetch("API/auth/signup/", {
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
        <div>
            <h2>Signup</h2>

            <input
                placeholder="username"
                onChange={(e) => setUsername(e.target.value)}
            />

            <input
                placeholder="email"
                onChange={(e) => setEmail(e.target.value)}
            />

            <input
                type="password"
                placeholder="password"
                onChange={(e) => setPassword(e.target.value)}
            />

            <input
                type="password"
                placeholder="confirm password"
                onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <button onClick={handleSubmit}>
                Create Account
            </button>

            <p>
                Already have account? <NavLink to="/login">Login</NavLink>
            </p>
        </div>
    );
};