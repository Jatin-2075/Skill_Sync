import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../../Config/Api";
import type { Project } from "../../Config/Types";

const C = {
  bg: "rgba(13,22,36,0.97)",
  border: "rgba(255,255,255,0.08)",
  green: "#86efac",
  greenDim: "rgba(134,239,172,0.1)",
  greenBorder: "rgba(134,239,172,0.25)",
  muted: "#64748b",
  text: "#f1f5f9",
};

const inputStyle: React.CSSProperties = {
  width: "100%", boxSizing: "border-box",
  background: "rgba(6,12,22,0.75)",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: 10, color: "#cbd5e1",
  fontSize: 14, padding: "10px 14px",
  outline: "none", fontFamily: "inherit",
  transition: "border-color 0.15s",
};

const TECH_OPTIONS = ["React", "Vue", "Next.js", "TypeScript", "Node.js", "FastAPI", "Django", "Python", "PostgreSQL", "MongoDB", "Docker", "Redis", "Flutter", "Swift", "Kotlin"];

export default function PostProject() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    description: "",
    github_url: "",
    demo_url: "",
    screenshot_url: "",
    is_open: true,
  });
  const [techStack, setTechStack] = useState<string[]>([]);
  const [customTech, setCustomTech] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const set = (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((p) => ({ ...p, [k]: e.target.value }));

  const toggleTech = (t: string) =>
    setTechStack((prev) => prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]);

  const addCustomTech = () => {
    const t = customTech.trim();
    if (t && !techStack.includes(t)) setTechStack((p) => [...p, t]);
    setCustomTech("");
  };

  const submit = async () => {
    if (!form.title.trim()) {
      setError("Project title is required");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const project = await API<Project>("POST", "/projects/", {
        ...form,
        tech_stack: techStack,
      });
      navigate(`/dashboard?new=${project.id}`);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to post project");
      setLoading(false);
    }
  };

  const card: React.CSSProperties = {
    background: C.bg, border: `1px solid ${C.border}`,
    borderRadius: 16, padding: 24, marginBottom: 16,
  };
  const label: React.CSSProperties = {
    display: "block", fontFamily: "monospace", fontSize: 11,
    color: C.muted, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8,
  };

  return (
    <div style={{ maxWidth: 680, margin: "0 auto", padding: "40px 24px 80px", color: C.muted, fontFamily: "'DM Sans', sans-serif" }}>

      <div style={{ marginBottom: 32 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
          <span style={{ fontFamily: "monospace", color: "rgba(134,239,172,0.5)", fontSize: 13 }}>+</span>
          <h1 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 26, color: C.text, margin: 0 }}>
            Post a Project
          </h1>
        </div>
        <p style={{ fontFamily: "monospace", fontSize: 12, color: C.muted }}>List your project and find collaborators</p>
      </div>

      {error && (
        <div style={{ background: "rgba(248,113,113,0.08)", border: "1px solid rgba(248,113,113,0.25)", borderRadius: 10, color: "#f87171", fontSize: 13, padding: "10px 14px", marginBottom: 20, fontFamily: "monospace" }}>
          ⚠ {error}
        </div>
      )}

      {/* Basic info */}
      <div style={card}>
        <div style={{ marginBottom: 14 }}>
          <label style={label}>Project Title *</label>
          <input style={inputStyle} placeholder="e.g. AI Resume Builder" value={form.title} onChange={set("title")} maxLength={120} />
        </div>
        <div>
          <label style={label}>Description</label>
          <textarea
            style={{ ...inputStyle, resize: "vertical", minHeight: 90 }}
            placeholder="What are you building and who are you looking for?"
            value={form.description}
            onChange={set("description")}
            rows={3}
          />
        </div>
      </div>

      {/* Tech stack */}
      <div style={card}>
        <label style={label}>Tech Stack</label>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 14 }}>
          {TECH_OPTIONS.map((t) => (
            <button
              key={t}
              onClick={() => toggleTech(t)}
              style={{
                padding: "6px 12px", borderRadius: 7,
                border: techStack.includes(t) ? `1px solid ${C.greenBorder}` : "1px solid rgba(255,255,255,0.07)",
                background: techStack.includes(t) ? C.greenDim : "rgba(255,255,255,0.02)",
                color: techStack.includes(t) ? C.green : C.muted,
                fontFamily: "monospace", fontSize: 12, cursor: "pointer", transition: "all 0.15s",
              }}
            >
              {t}
            </button>
          ))}
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <input
            style={{ ...inputStyle, flex: 1 }}
            placeholder="Add custom tech…"
            value={customTech}
            onChange={(e) => setCustomTech(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addCustomTech()}
            maxLength={30}
          />
          <button
            onClick={addCustomTech}
            style={{
              padding: "8px 14px", borderRadius: 9,
              background: C.greenDim, border: `1px solid ${C.greenBorder}`,
              color: C.green, fontFamily: "monospace", fontSize: 12,
              fontWeight: 600, cursor: "pointer",
            }}
          >
            + Add
          </button>
        </div>
      </div>

      {/* Links */}
      <div style={card}>
        {[
          { k: "github_url" as const, label: "GitHub URL", placeholder: "https://github.com/you/repo" },
          { k: "demo_url" as const, label: "Demo URL (optional)", placeholder: "https://yourproject.vercel.app" },
          { k: "screenshot_url" as const, label: "Screenshot URL (optional)", placeholder: "https://..." },
        ].map(({ k, label: lbl, placeholder }) => (
          <div key={k} style={{ marginBottom: 14 }}>
            <label style={label}>{lbl}</label>
            <input style={inputStyle} placeholder={placeholder} value={form[k]} onChange={set(k)} />
          </div>
        ))}

        <label style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
          <button
            role="switch"
            aria-checked={form.is_open}
            onClick={() => setForm((p) => ({ ...p, is_open: !p.is_open }))}
            style={{
              width: 40, height: 22, borderRadius: 999, cursor: "pointer",
              background: form.is_open ? "rgba(134,239,172,0.2)" : "rgba(255,255,255,0.07)",
              border: form.is_open ? "1px solid rgba(134,239,172,0.35)" : "1px solid rgba(255,255,255,0.1)",
              position: "relative", flexShrink: 0, transition: "all 0.2s",
            }}
          >
            <span style={{
              position: "absolute", top: 2,
              left: form.is_open ? 19 : 3,
              width: 16, height: 16, borderRadius: "50%",
              background: form.is_open ? C.green : "#475569",
              transition: "left 0.2s, background 0.2s",
            }} />
          </button>
          <span style={{ fontFamily: "monospace", fontSize: 12, color: C.muted }}>
            Open for applications
          </span>
        </label>
      </div>

      <button
        onClick={submit}
        disabled={loading}
        style={{
          width: "100%", padding: "13px", borderRadius: 12, border: "none",
          background: "linear-gradient(135deg, rgba(134,239,172,.18), rgba(56,189,248,.14))",
          borderTop: `1px solid ${C.greenBorder}`,
          color: C.green, fontFamily: "monospace", fontWeight: 700,
          fontSize: 14, cursor: "pointer", opacity: loading ? 0.6 : 1,
        }}
      >
        {loading ? "Posting…" : "Post Project →"}
      </button>
    </div>
  );
}
