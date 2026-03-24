import React, { useState, useEffect, useCallback } from "react";
import {API} from "../../Config/Api";
import "./Profile.css";
import type { Personal, Skill, CodingHandles, Details } from "../../Config/Types";

type SaveStatus = "idle" | "loading" | "ok" | "err";
type Page = "details" | "personal" | "skills" | "handles";

interface StepConfig {
    id: Page;
    label: string;
    icon: string;
}

const STEPS: StepConfig[] = [
    { id: "details", label: "Account", icon: "👤" },
    { id: "personal", label: "Personal Info", icon: "🧑" },
    { id: "skills", label: "Skills", icon: "⚡" },
    { id: "handles", label: "Coding Links", icon: "💻" },
];

function Field({ label, children }: { label: string; children: React.ReactNode }) {
    return (
        <div className="field">
            <label className="field-label">{label}</label>
            {children}
        </div>
    );
}

function SaveButton({ status, onClick }: { status: SaveStatus; onClick: () => void }) {
    const label =
        status === "loading" ? "Saving…"
            : status === "ok" ? "✓ Saved"
                : status === "err" ? "Retry"
                    : "Save Changes";

    return (
        <button
            className={`save-btn save-btn--${status}`}
            onClick={onClick}
            disabled={status === "loading"}
        >
            {label}
        </button>
    );
}

function PageHeader({ icon, title, desc }: { icon: string; title: string; desc: string }) {
    return (
        <div className="page-header">
            <span className="page-icon">{icon}</span>
            <div>
                <h2 className="page-title">{title}</h2>
                <p className="page-desc">{desc}</p>
            </div>
        </div>
    );
}

function DetailsPage() {
    const [form, setForm] = useState<Details>({ username: "" });
    const [status, setStatus] = useState<SaveStatus>("idle");

    useEffect(() => {
        API<Details>("GET", "/get_details/").then(setForm).catch(() => { });
    }, []);

    const save = async () => {
        setStatus("loading");
        try {
            await API("POST", "/add_details/", form);
            setStatus("ok");
        } catch {
            setStatus("err");
        }
    };

    return (
        <div className="page-content">
            <PageHeader icon="👤" title="Account" desc="Your unique profile identifier" />

            <Field label="Username">
                <div className="prefixed-input">
                    <span className="prefixed-input__prefix">@</span>
                    <input
                        className="input prefixed-input__field"
                        placeholder="johndoe"
                        value={form.username}
                        maxLength={20}
                        onChange={(e) => setForm({ username: e.target.value })}
                    />
                </div>
            </Field>
            <p className="hint">Max 20 characters. This will be your unique profile handle.</p>

            <SaveButton status={status} onClick={save} />
        </div>
    );
}

function PersonalPage() {
    const [form, setForm] = useState<Personal>({ name: "", email: "", country: "", gender: "", bio: "" });
    const [status, setStatus] = useState<SaveStatus>("idle");

    useEffect(() => {
        API<Personal>("GET", "/get_personal/").then(setForm).catch(() => { });
    }, []);

    const save = async () => {
        setStatus("loading");
        try {
            await API("POST", "/add_personal/", form);
            setStatus("ok");
        } catch {
            setStatus("err");
        }
    };

    const set = (k: keyof Personal) =>
        (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
            setForm((p) => ({ ...p, [k]: e.target.value }));

    return (
        <div className="page-content">
            <PageHeader icon="🧑" title="Personal Info" desc="Your name, contact, and background" />

            <div className="form-grid">
                <Field label="Full Name">
                    <input className="input" placeholder="John Doe" value={form.name} onChange={set("name")} maxLength={20} />
                </Field>
                <Field label="Email">
                    <input className="input" type="email" placeholder="john@example.com" value={form.email} onChange={set("email")} />
                </Field>
                <Field label="Country">
                    <input className="input" placeholder="India" value={form.country} onChange={set("country")} maxLength={30} />
                </Field>
                <Field label="Gender">
                    <select className="input" value={form.gender} onChange={set("gender")}>
                        <option value="">Select gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Non-binary">Non-binary</option>
                        <option value="Prefer not to say">Prefer not to say</option>
                    </select>
                </Field>
            </div>

            <Field label="Bio">
                <textarea
                    className="input textarea"
                    placeholder="Tell us a little about yourself… (max 150 chars)"
                    value={form.bio}
                    onChange={set("bio")}
                    maxLength={150}
                    rows={3}
                />
                <span className="char-count">{form.bio.length} / 150</span>
            </Field>

            <SaveButton status={status} onClick={save} />
        </div>
    );
}

function SkillsPage() {
    const [skills, setSkills] = useState<Skill[]>([]);
    const [newSkill, setNew] = useState("");
    const [status, setStatus] = useState<SaveStatus>("idle");

    useEffect(() => {
        API<Skill[]>("GET", "/get_skills/").then(setSkills).catch(() => { });
    }, []);

    const add = () => {
        const trimmed = newSkill.trim();
        if (!trimmed) return;
        setSkills((p) => [...p, { skill: trimmed }]);
        setNew("");
    };

    const remove = (i: number) => setSkills((p) => p.filter((_, idx) => idx !== i));

    const save = async () => {
        setStatus("loading");
        try {
            await API("POST", "/add_skills/", { skills });
            setStatus("ok");
        } catch {
            setStatus("err");
        }
    };

    return (
        <div className="page-content">
            <PageHeader icon="⚡" title="Skills" desc="Add your technical & professional skills" />

            <div className="skill-add-row">
                <input
                    className="input skill-input"
                    placeholder="e.g. React, Python, Django…"
                    value={newSkill}
                    maxLength={30}
                    onChange={(e) => setNew(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && add()}
                />
                <button className="add-btn" onClick={add}>+ Add</button>
            </div>

            <div className="skills-list">
                {skills.length === 0 && (
                    <p className="hint">No skills yet. Type above and press Enter or click Add.</p>
                )}
                {skills.map((s, i) => (
                    <div key={i} className="skill-chip">
                        <span className="skill-name">{s.skill}</span>
                        <button className="skill-remove" onClick={() => remove(i)}>✕</button>
                    </div>
                ))}
            </div>

            <SaveButton status={status} onClick={save} />
        </div>
    );
}

function CodingHandlesPage() {
    const [form, setForm] = useState<CodingHandles>({ git: "", codeforces: "", leetcode: "" });
    const [status, setStatus] = useState<SaveStatus>("idle");

    useEffect(() => {
        API<CodingHandles>("GET", "/get_username/").then(setForm).catch(() => { });
    }, []);

    const save = async () => {
        setStatus("loading");
        try {
            await API("POST", "/add_username/", form);
            setStatus("ok");
        } catch {
            setStatus("err");
        }
    };

    const set = (k: keyof CodingHandles) =>
        (e: React.ChangeEvent<HTMLInputElement>) =>
            setForm((p) => ({ ...p, [k]: e.target.value }));

    const platforms: { key: keyof CodingHandles; label: string; prefix: string }[] = [
        { key: "git", label: "GitHub", prefix: "github.com/" },
        { key: "codeforces", label: "Codeforces", prefix: "codeforces.com/profile/" },
        { key: "leetcode", label: "LeetCode", prefix: "leetcode.com/u/" },
    ];

    return (
        <div className="page-content">
            <PageHeader icon="💻" title="Coding Links" desc="Your competitive programming & GitHub handles" />

            {platforms.map(({ key, label, prefix }) => (
                <Field key={key} label={label}>
                    <div className="prefixed-input">
                        <span className="prefixed-input__prefix">{prefix}</span>
                        <input
                            className="input prefixed-input__field"
                            placeholder="username"
                            value={form[key]}
                            onChange={set(key)}
                            maxLength={50}
                        />
                    </div>
                </Field>
            ))}

            <SaveButton status={status} onClick={save} />
        </div>
    );
}

export default function Profile() {
    const [activePage, setActivePage] = useState<Page>("details");

    const renderPage = useCallback(() => {
        switch (activePage) {
            case "details": return <DetailsPage />;
            case "personal": return <PersonalPage />;
            case "skills": return <SkillsPage />;
            case "handles": return <CodingHandlesPage />;
        }
    }, [activePage]);

    return (
        <div className="profile-root">
            <div className="profile-shell">

                <div className="profile-top">
                    <h1>My Profile</h1>
                    <p>Manage your personal details, skills and identity</p>
                </div>

                <div className="tabs">
                    {STEPS.map((s) => (
                        <button
                            key={s.id}
                            className={`tab${activePage === s.id ? " tab--active" : ""}`}
                            onClick={() => setActivePage(s.id)}
                        >
                            <span className="tab-icon">{s.icon}</span>
                            {s.label}
                        </button>
                    ))}
                </div>

                <div className="card" key={activePage}>
                    {renderPage()}
                </div>

            </div>
        </div>
    );
}