import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { API } from "../../Config/Api";

type Role = "frontend" | "backend" | "fullstack" | "ml" | "devops" | "";
type SaveStatus = "idle" | "loading" | "ok" | "err";

const SKILL_OPTIONS = ["React", "Vue", "Next.js", "Node.js", "FastAPI", "Django", "Python", "TypeScript", "Docker", "PostgreSQL", "MongoDB"];
const ROLE_OPTIONS: { id: Role; label: string }[] = [
  { id: "frontend", label: "Frontend" },
  { id: "backend", label: "Backend" },
  { id: "fullstack", label: "Fullstack" },
  { id: "ml", label: "ML / AI" },
  { id: "devops", label: "DevOps" },
];

const C = {
  bg: "rgba(13,22,36,0.97)",
  border: "rgba(255,255,255,0.08)",
  green: "#86efac",
  greenDim: "rgba(134,239,172,0.1)",
  greenBorder: "rgba(134,239,172,0.25)",
  muted: "#64748b",
  text: "#f1f5f9",
};

export default function Proposal() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const projectId = searchParams.get("project_id");

  const [role, setRole] = useState<Role>("");
  const [skills, setSkills] = useState<string[]>([]);
  const [message, setMessage] = useState("");
  const [availability, setAvailability] = useState("1-5 hrs");
  const [status, setStatus] = useState<SaveStatus>("idle");
  const [error, setError] = useState("");

  const toggleSkill = (s: string) =>
    setSkills((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]));

  const submit = async () => {
    if (!projectId) {
      setError("No project selected. Go back and pick a project.");
      return;
    }
    if (!role) {
      setError("Please select a role");
      return;
    }
    if (!message.trim()) {
      setError("Please write a proposal message");
      return;
    }

    setStatus("loading");
    setError("");

    try {
      await API("POST", "/projects/proposals/", {
        project_id: Number(projectId),
        role,
        skills,
        message,
        availability,
      });
      setStatus("ok");
      setTimeout(() => navigate("/projects"), 1500);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Submission failed");
      setStatus("err");
    }
  };

  const btnStyle = (active: boolean): React.CSSProperties => ({
    padding: "8px 16px",
    borderRadius: 8,
    border: active ? `1px solid ${C.greenBorder}` : "1px solid rgba(255,255,255,0.07)",
    background: active ? C.greenDim : "rgba(255,255,255,0.02)",
    color: active ? C.green : C.muted,
    fontFamily: "monospace",
    fontSize: 13,
    fontWeight: active ? 600 : 400,
    cursor: "pointer",
    transition: "all 0.15s",
  });

  return (
    <div style={{ maxWidth: 640, margin: "0 auto", padding: "40px 24px 80px", color: C.muted, fontFamily: "'DM Sans', sans-serif" }}>

      <div style={{ marginBottom: 32 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
          <span style={{ fontFamily: "monospace", color: "rgba(134,239,172,0.5)", fontSize: 13 }}>✉</span>
          <h1 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 26, color: C.text, margin: 0 }}>
            Send Proposal
          </h1>
        </div>
        {projectId && (
          <p style={{ fontFamily: "monospace", fontSize: 12, color: C.muted }}>
            Applying to project #{projectId}
          </p>
        )}
      </div>

      {error && (
        <div style={{ background: "rgba(248,113,113,0.08)", border: "1px solid rgba(248,113,113,0.25)", borderRadius: 10, color: "#f87171", fontSize: 13, padding: "10px 14px", marginBottom: 20, fontFamily: "monospace" }}>
          ⚠ {error}
        </div>
      )}

      {status === "ok" && (
        <div style={{ background: C.greenDim, border: `1px solid ${C.greenBorder}`, borderRadius: 10, color: C.green, fontSize: 13, padding: "10px 14px", marginBottom: 20, fontFamily: "monospace" }}>
          ✓ Proposal sent! Redirecting…
        </div>
      )}

      {/* Role */}
      <div style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: 16, padding: 24, marginBottom: 16 }}>
        <label style={{ display: "block", fontFamily: "monospace", fontSize: 11, color: C.muted, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12 }}>
          Select Role
        </label>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {ROLE_OPTIONS.map(({ id, label }) => (
            <button key={id} onClick={() => setRole(id)} style={btnStyle(role === id)}>
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Skills */}
      <div style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: 16, padding: 24, marginBottom: 16 }}>
        <label style={{ display: "block", fontFamily: "monospace", fontSize: 11, color: C.muted, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12 }}>
          Relevant Skills
        </label>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {SKILL_OPTIONS.map((s) => (
            <button key={s} onClick={() => toggleSkill(s)} style={btnStyle(skills.includes(s))}>
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Message */}
      <div style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: 16, padding: 24, marginBottom: 16 }}>
        <label style={{ display: "block", fontFamily: "monospace", fontSize: 11, color: C.muted, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 10 }}>
          Proposal Message
        </label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Tell the project owner why you're a good fit…"
          maxLength={1000}
          rows={5}
          style={{
            width: "100%", boxSizing: "border-box",
            background: "rgba(6,12,22,0.75)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 10, color: "#cbd5e1",
            fontSize: 14, padding: "10px 14px",
            outline: "none", fontFamily: "inherit",
            resize: "vertical", transition: "border-color 0.15s",
          }}
        />
        <div style={{ textAlign: "right", fontFamily: "monospace", fontSize: 11, color: C.muted, marginTop: 4 }}>
          {message.length} / 1000
        </div>
      </div>

      {/* Availability */}
      <div style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: 16, padding: 24, marginBottom: 24 }}>
        <label style={{ display: "block", fontFamily: "monospace", fontSize: 11, color: C.muted, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 10 }}>
          Weekly Availability
        </label>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {["1-5 hrs", "5-10 hrs", "10-20 hrs", "20+ hrs"].map((a) => (
            <button key={a} onClick={() => setAvailability(a)} style={btnStyle(availability === a)}>
              {a}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={submit}
        disabled={status === "loading" || status === "ok"}
        style={{
          width: "100%", padding: "13px", borderRadius: 12, border: "none",
          background: "linear-gradient(135deg, rgba(134,239,172,.18), rgba(56,189,248,.14))",
          borderTop: `1px solid ${C.greenBorder}`,
          color: C.green, fontFamily: "monospace", fontWeight: 700,
          fontSize: 14, cursor: "pointer",
          opacity: status === "loading" ? 0.6 : 1,
        }}
      >
        {status === "loading" ? "Sending…" : "Send Proposal →"}
      </button>
    </div>
  );
}
