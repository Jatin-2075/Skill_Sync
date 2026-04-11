import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { API } from "../../Config/Api";
import type { Project, ActivityFilter } from "../../Config/Types";

const C = {
  bg: "rgba(13,22,36,0.97)",
  border: "rgba(255,255,255,0.08)",
  green: "#86efac",
  greenDim: "rgba(134,239,172,0.1)",
  greenBorder: "rgba(134,239,172,0.25)",
  muted: "#64748b",
  text: "#f1f5f9",
};

const BADGE_COLORS: Record<string, { bg: string; border: string; text: string }> = {
  trending: { bg: "rgba(251,191,36,.08)", border: "rgba(251,191,36,.3)", text: "#fbbf24" },
  active:   { bg: "rgba(134,239,172,.07)", border: "rgba(134,239,172,.3)", text: "#86efac" },
  low:      { bg: "rgba(148,163,184,.05)", border: "rgba(148,163,184,.2)", text: "#94a3b8" },
  dead:     { bg: "rgba(248,113,113,.06)", border: "rgba(248,113,113,.25)", text: "#f87171" },
};

export default function ShowProject() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [query, setQuery] = useState("");
  const [badge, setBadge] = useState<ActivityFilter>("all");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    API<Project[]>("GET", "/projects/?limit=100")
      .then(setProjects)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const filtered = projects.filter((p) => {
    const matchBadge = badge === "all" || p.activity_badge === badge;
    const q = query.toLowerCase();
    const matchSearch =
      !q ||
      p.title.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      (p.tech_stack ?? []).join(" ").toLowerCase().includes(q);
    return matchBadge && matchSearch;
  });

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "40px 24px 80px", color: C.muted, fontFamily: "'DM Sans', sans-serif" }}>

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28, flexWrap: "wrap", gap: 12 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
            <span style={{ fontFamily: "monospace", color: "rgba(134,239,172,0.5)", fontSize: 13 }}>04</span>
            <h1 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 26, color: C.text, margin: 0 }}>Projects</h1>
          </div>
          <p style={{ fontFamily: "monospace", fontSize: 12, color: C.muted }}>Browse open projects to collaborate on</p>
        </div>
        <NavLink
          to="/projects/post"
          style={{
            padding: "9px 20px", borderRadius: 10, textDecoration: "none",
            background: C.greenDim, border: `1px solid ${C.greenBorder}`,
            color: C.green, fontFamily: "monospace", fontSize: 13, fontWeight: 600,
          }}
        >
          + Post Project
        </NavLink>
      </div>

      {/* Search + filter */}
      <div style={{ display: "flex", gap: 10, marginBottom: 20, flexWrap: "wrap" }}>
        <input
          style={{
            flex: 1, minWidth: 200,
            background: "rgba(6,12,22,0.75)", border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 10, color: "#cbd5e1", fontSize: 13, padding: "9px 13px",
            outline: "none", fontFamily: "monospace",
          }}
          placeholder="Search title, tech, description…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {(["all", "trending", "active", "low", "dead"] as ActivityFilter[]).map((f) => {
          const active = badge === f;
          const bc = f !== "all" ? BADGE_COLORS[f] : null;
          return (
            <button
              key={f}
              onClick={() => setBadge(f)}
              style={{
                padding: "7px 14px", borderRadius: 8, cursor: "pointer",
                fontFamily: "monospace", fontSize: 12, fontWeight: active ? 600 : 400,
                background: active ? (bc?.bg ?? C.greenDim) : "rgba(255,255,255,0.02)",
                border: active ? `1px solid ${bc?.border ?? C.greenBorder}` : "1px solid rgba(255,255,255,0.07)",
                color: active ? (bc?.text ?? C.green) : C.muted,
                transition: "all 0.15s",
              }}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          );
        })}
      </div>

      {error && (
        <div style={{ background: "rgba(248,113,113,0.08)", border: "1px solid rgba(248,113,113,0.25)", borderRadius: 10, color: "#f87171", fontSize: 13, padding: "10px 14px", marginBottom: 20, fontFamily: "monospace" }}>
          ⚠ {error}
        </div>
      )}

      {loading && (
        <p style={{ color: C.muted, fontFamily: "monospace", fontSize: 13 }}>Loading projects…</p>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {filtered.map((p) => {
          const bc = BADGE_COLORS[p.activity_badge] ?? BADGE_COLORS.low;
          return (
            <div key={p.id} style={{
              background: C.bg, border: `1px solid ${C.border}`,
              borderLeft: `3px solid ${bc.text}`,
              borderRadius: 16, padding: "20px 24px",
              transition: "border-color 0.2s, transform 0.2s",
            }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(134,239,172,0.2)";
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor = C.border;
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12, marginBottom: 8 }}>
                <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: 17, fontWeight: 700, color: C.text, margin: 0 }}>
                  {p.title}
                </h3>
                <span style={{
                  padding: "3px 10px", borderRadius: 999,
                  fontFamily: "monospace", fontSize: 10, fontWeight: 700,
                  letterSpacing: "0.06em", textTransform: "uppercase", flexShrink: 0,
                  background: bc.bg, border: `1px solid ${bc.border}`, color: bc.text,
                }}>
                  {p.activity_badge}
                </span>
              </div>

              <p style={{ fontSize: 13, color: C.muted, lineHeight: 1.6, margin: "0 0 12px", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                {p.description || "No description provided."}
              </p>

              {/* Tech stack */}
              {p.tech_stack && p.tech_stack.length > 0 && (
                <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 14 }}>
                  {p.tech_stack.slice(0, 8).map((t, i) => (
                    <span key={t} style={{
                      padding: "2px 8px", borderRadius: 5,
                      fontFamily: "monospace", fontSize: 11,
                      background: ["rgba(134,239,172,.08)","rgba(56,189,248,.08)","rgba(251,191,36,.07)","rgba(167,139,250,.08)","rgba(249,115,22,.08)"][i % 5],
                      border: ["1px solid rgba(134,239,172,.2)","1px solid rgba(56,189,248,.2)","1px solid rgba(251,191,36,.18)","1px solid rgba(167,139,250,.2)","1px solid rgba(249,115,22,.18)"][i % 5],
                      color: ["#86efac","#7dd3fc","#fcd34d","#c4b5fd","#fdba74"][i % 5],
                    }}>
                      {t}
                    </span>
                  ))}
                </div>
              )}

              <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
                {p.is_open && (
                  <NavLink
                    to={`/projects/proposal?project_id=${p.id}`}
                    style={{
                      padding: "7px 16px", borderRadius: 8, textDecoration: "none",
                      background: C.greenDim, border: `1px solid ${C.greenBorder}`,
                      color: C.green, fontFamily: "monospace", fontSize: 12, fontWeight: 600,
                    }}
                  >
                    Apply →
                  </NavLink>
                )}
                {!p.is_open && (
                  <span style={{ padding: "7px 16px", borderRadius: 8, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", color: C.muted, fontFamily: "monospace", fontSize: 12 }}>
                    Closed
                  </span>
                )}
                {p.github_url && (
                  <a href={p.github_url} target="_blank" rel="noreferrer" style={{
                    padding: "7px 16px", borderRadius: 8, textDecoration: "none",
                    background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)",
                    color: C.muted, fontFamily: "monospace", fontSize: 12,
                  }}>
                    ↗ GitHub
                  </a>
                )}
                {p.demo_url && (
                  <a href={p.demo_url} target="_blank" rel="noreferrer" style={{
                    padding: "7px 16px", borderRadius: 8, textDecoration: "none",
                    background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)",
                    color: C.muted, fontFamily: "monospace", fontSize: 12,
                  }}>
                    ↗ Demo
                  </a>
                )}
                <span style={{ marginLeft: "auto", fontFamily: "monospace", fontSize: 11, color: "#334155" }}>
                  ⭐ {p.stars} · #{p.id}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {!loading && filtered.length === 0 && (
        <div style={{ textAlign: "center", padding: "60px 20px", color: C.muted, fontFamily: "monospace", fontSize: 13 }}>
          {projects.length === 0 ? "No projects yet. Be the first to post one!" : "No projects match your search."}
        </div>
      )}
    </div>
  );
}
