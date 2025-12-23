import { useState } from "react";

const Login = () => {

    const [UserName, SetUserName] = useState<string>("");
    const [Password, SetPassword] = useState<string>("");

    const HandleSubmit = async () => {
        const res = await fetch("YOUR_API_URL", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
                username: UserName,
                password: Password,
            }),
        });

        const data = await res.json();
        console.log(data);
    };



    return (
        <div>
            <div>
                <h1>Skillsync</h1>
                <h3>Login</h3>
            </div>
            <div>
                <div>
                    <label>UserName</label>
                    <input placeholder="UserName" required onChange={(e) => SetUserName(e.target.value)} maxLength={100} />
                </div>
                <div>
                    <label>Password</label>
                    <input placeholder="Password" required onChange={(e) => SetPassword(e.target.value)} maxLength={20} minLength={8} />
                </div>
                <div>
                    <button type="submit" onClick={() => HandleSubmit()} >Submit</button>
                </div>
            </div>
        </div>
    )


}

export default Login;