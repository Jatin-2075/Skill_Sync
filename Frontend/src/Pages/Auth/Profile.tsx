import { useState, useEffect } from "react";

type User = {
  name: string
  age: number
  gender: string
  country: string
  org: string
  github?: string
  codeforces?: string
  leetcode?: string
  email: string
}

export default function ProfilePage() {

    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        fetch("API/profile/me/")
            .then(res => res.json())
            .then(data => setUser(data))
            .catch(err => console.log(err));
    }, []);

    if (!user) return <p>Loading...</p>;

    return (
        <div>

            <h2>{user.name}</h2>

            <p>Age: {user.age}</p>
            <p>Gender: {user.gender}</p>
            <p>Country: {user.country}</p>
            <p>Organization: {user.org}</p>

            <h3>Developer Accounts</h3>

            {user.github && (
                <a href={`https://github.com/${user.github}`} target="_blank">
                    GitHub: {user.github}
                </a>
            )}

            {user.codeforces && (
                <a href={`https://codeforces.com/profile/${user.codeforces}`} target="_blank">
                    Codeforces: {user.codeforces}
                </a>
            )}

            {user.leetcode && (
                <a href={`https://leetcode.com/${user.leetcode}`} target="_blank">
                    LeetCode: {user.leetcode}
                </a>
            )}

            <h3>Contact</h3>

            <p>{user.email}</p>

        </div>
    );
}