import { useState } from "react";

const Signup = () => {

    const [Email, SetEmail] = useState<string>("");
    const [Password, SetPassword] = useState<string>("");
    const [ConfirmPassword, SetConfirmPassword] = useState<string>("");

    const HandleSubmit = async () => {
        if (ConfirmPassword === Password) {
            const res = await fetch("", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({
                    email: Email,
                    password: Password
                }),
            });

            const data = await res.json();
            console.log(data);
        }
    }


    return (
        <div>
            <div>
                <h1>Skillsync</h1>
                <h3>Signup</h3>
            </div>
            <div>
                <div>
                    <label>Username</label>
                    <input placeholder="Username" type="text" />
                </div>
                <div>
                    <label>Email</label>
                    <input placeholder="Email" required onChange={(e) => SetEmail(e.target.value)} maxLength={100} />
                </div>
                <div>
                    <label>Password</label>
                    <input placeholder="Password" required onChange={(e) => SetPassword(e.target.value)} maxLength={20} minLength={8} />
                </div>
                <div>
                    <label>Confirm Password</label>
                    <input placeholder="Confirm Password" required onChange={(e) => SetConfirmPassword(e.target.value)} maxLength={20} minLength={8} />
                </div>
                <div>
                    <button type="submit" onClick={() => HandleSubmit()} >Submit</button>
                </div>
            </div>
        </div>
    )


}

export default Signup;