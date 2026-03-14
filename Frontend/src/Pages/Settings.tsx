import { useState } from "react"

type UserProfile = {
    name: string
    email: string
    bio: string
    location: string
    website: string
}

type Notifications = {
    emailUpdates: boolean
    weeklyDigest: boolean
    newMatches: boolean
    messages: boolean
}

const initialProfile: UserProfile = {
    name: "Jatin Dev",
    email: "jatin@skillsync.io",
    bio: "Full-stack developer building SkillSync",
    location: "India",
    website: ""
}

const initialNotifications: Notifications = {
    emailUpdates: true,
    weeklyDigest: false,
    newMatches: true,
    messages: true
}

export default function Settings() {

    const [profile, setProfile] = useState(initialProfile)
    const [editMode, setEditMode] = useState(false)
    const [notifications, setNotifications] = useState(initialNotifications)

    const updateField = (key: keyof UserProfile, value: string) => {
        setProfile(prev => ({ ...prev, [key]: value }))
    }

    const toggleNotif = (key: keyof Notifications) => {
        setNotifications(prev => ({ ...prev, [key]: !prev[key] }))
    }

    return (
        <div style={{ padding: 30, maxWidth: 700 }}>

            <h1>Settings</h1>

            {/* PROFILE */}
            <h2>Profile</h2>

            {!editMode && (
                <div>
                    <p><b>Name:</b> {profile.name}</p>
                    <p><b>Email:</b> {profile.email}</p>
                    <p><b>Bio:</b> {profile.bio}</p>
                    <p><b>Location:</b> {profile.location}</p>
                    <p><b>Website:</b> {profile.website}</p>

                    <button onClick={() => setEditMode(true)}>
                        Edit Profile
                    </button>
                </div>
            )}

            {editMode && (
                <div style={{ display: "grid", gap: 10 }}>

                    <input
                        value={profile.name}
                        onChange={e => updateField("name", e.target.value)}
                        placeholder="Name"
                    />

                    <input
                        value={profile.email}
                        onChange={e => updateField("email", e.target.value)}
                        placeholder="Email"
                    />

                    <textarea
                        value={profile.bio}
                        onChange={e => updateField("bio", e.target.value)}
                        placeholder="Bio"
                    />

                    <input
                        value={profile.location}
                        onChange={e => updateField("location", e.target.value)}
                        placeholder="Location"
                    />

                    <input
                        value={profile.website}
                        onChange={e => updateField("website", e.target.value)}
                        placeholder="Website"
                    />

                    <button onClick={() => setEditMode(false)}>
                        Save
                    </button>

                </div>
            )}

            {/* NOTIFICATIONS */}
            <h2 style={{ marginTop: 30 }}>Notifications</h2>

            {Object.entries(notifications).map(([key, value]) => (
                <div key={key} style={{ marginBottom: 10 }}>

                    <label>
                        <input
                            type="checkbox"
                            checked={value}
                            onChange={() => toggleNotif(key as keyof Notifications)}
                        />
                        {" "}
                        {key}
                    </label>

                </div>
            ))}

            {/* LEGAL */}
            <h2 style={{ marginTop: 30 }}>Legal</h2>

            <button>
                Privacy Policy
            </button>

            {/* DANGER */}
            <h2 style={{ marginTop: 30 }}>Danger Zone</h2>

            <button style={{ color: "red" }}>
                Delete Account
            </button>

        </div>
    )
}