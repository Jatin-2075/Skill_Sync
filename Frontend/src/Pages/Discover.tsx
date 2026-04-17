import { useState, useEffect, useCallback } from "react";
import { NavLink } from "react-router-dom";
import { API } from "../Config/Api";
import type { DevCard } from "../Config/Types";

const C = {
  bg: "rgba(13,22,36,0.97)",
  border: "rgba(255,255,255,0.08)",
  green: "#86efac",
  greenDim: "rgba(134,239,172,0.1)",
  greenBorder: "rgba(134,239,172,0.25)",
  muted: "#64748b",
  text: "#f1f5f9",
  sub: "#94a3b8",
};

const input: React.CSSProperties = {
  background: "rgba(6,12,22,0.75)",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: 10,
  color: "#cbd5e1",
  fontSize: 13,
  padding: "8px 12px",
  outline: "none",
  fontFamily: "monospace",
  width: "100%",
  boxSizing: "border-box",
};

export default function Discover() {
  const [devs, setDevs] = useState<DevCard[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [skill, setSkill] = useState("");
  const [country, setCountry] = useState("");
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [minStars, setMinStars] = useState(0);

  const search = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const params = new URLSearchParams();
      if (skill) params.set("skill", skill);
      if (country) params.set("country", country);
      if (verifiedOnly) params.set("verified_only", "true");
      if (minStars > 0) params.set("min_stars", String(minStars));
      params.set("limit", "30");

      const data = await API<DevCard[]>("GET", `/discover/developers/?${params}`);
      setDevs(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Search failed");
    } finally {
      setLoading(false);
    }
  }, [skill, country, verifiedOnly, minStars]);

  useEffect(() => {
    search();
  }, [search]);

  return (
    <div style={{ maxWidth: 960, margin: "0 auto", padding: "40px 24px 80px", color: C.sub, fontFamily: "'DM Sans', sans-serif" }}>

      {/* Title */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
          <span style={{ fontFamily: "monospace", color: "rgba(134,239,172,0.5)", fontSize: 13 }}>05</span>
          <h1 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 28, color: C.text, margin: 0, letterSpacing: "-0.02em" }}>
            Discover Developers
          </h1>
        </div>
        <p style={{ fontFamily: "monospace", fontSize: 12, color: C.muted }}>
          Find teammates, collaborators, or talent by skill and proof
        </p>
      </div>

      {/* Filters */}
      <div style={{
        background: C.bg,
        border: `1px solid ${C.border}`,
        borderRadius: 16,
        padding: "20px 24px",
        marginBottom: 24,
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
        gap: 14,
        alignItems: "end",
      }}>
        <div>
          <label style={{ display: "block", fontFamily: "monospace", fontSize: 10, color: C.muted, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>Skill</label>
          <input
            style={input}
            placeholder="e.g. python, react…"
            value={skill}
            onChange={(e) => setSkill(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && search()}
          />
        </div>

        <div>
          <label style={{ display: "block", fontFamily: "monospace", fontSize: 10, color: C.muted, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>Country</label>
          <input
            style={input}
            placeholder="e.g. India, USA…"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && search()}
          />
        </div>

        <div>
          <label style={{ display: "block", fontFamily: "monospace", fontSize: 10, color: C.muted, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>Min GitHub Stars</label>
          <input
            style={input}
            type="number"
            min={0}
            placeholder="0"
            value={minStars || ""}
            onChange={(e) => setMinStars(Number(e.target.value) || 0)}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
            <button
              role="switch"
              aria-checked={verifiedOnly}
              onClick={() => setVerifiedOnly((v) => !v)}
              style={{
                width: 40, height: 22, borderRadius: 999,
                background: verifiedOnly ? "rgba(134,239,172,0.2)" : "rgba(255,255,255,0.07)",
                border: verifiedOnly ? "1px solid rgba(134,239,172,0.35)" : "1px solid rgba(255,255,255,0.1)",
                cursor: "pointer", position: "relative", flexShrink: 0, transition: "all 0.2s",
              }}
            >
              <span style={{
                position: "absolute", top: 2,
                left: verifiedOnly ? 19 : 3,
                width: 16, height: 16, borderRadius: "50%",
                background: verifiedOnly ? C.green : "#475569",
                transition: "left 0.2s, background 0.2s",
              }} />
            </button>
            <span style={{ fontFamily: "monospace", fontSize: 12, color: C.sub }}>Verified only</span>
          </label>

          <button
            onClick={search}
            disabled={loading}
            style={{
              padding: "8px 16px", borderRadius: 9, border: "none",
              background: "linear-gradient(135deg, rgba(134,239,172,.18), rgba(56,189,248,.14))",
              borderTop: `1px solid ${C.greenBorder}`,
              color: C.green, fontFamily: "monospace", fontWeight: 600,
              fontSize: 13, cursor: "pointer", opacity: loading ? 0.6 : 1,
            }}
          >
            {loading ? "Searching…" : "🔍 Search"}
          </button>
        </div>
      </div>

      {error && (
        <div style={{ background: "rgba(248,113,113,0.08)", border: "1px solid rgba(248,113,113,0.25)", borderRadius: 10, color: "#f87171", fontSize: 13, padding: "10px 14px", marginBottom: 20, fontFamily: "monospace" }}>
          ⚠ {error}
        </div>
      )}

      {/* Results count */}
      <div style={{ fontFamily: "monospace", fontSize: 12, color: C.muted, marginBottom: 16 }}>
        {loading ? "Searching…" : `${devs.length} developer${devs.length !== 1 ? "s" : ""} found`}
      </div>

      {/* Dev cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
        {devs.map((dev) => (
          <NavLink
            key={dev.username}
            to={`/profile/${dev.username}`}
            style={{ textDecoration: "none" }}
          >
            <div style={{
              background: C.bg,
              border: `1px solid ${C.border}`,
              borderRadius: 16,
              padding: 20,
              cursor: "pointer",
              transition: "border-color 0.2s, transform 0.2s",
            }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(134,239,172,0.2)";
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(-3px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor = C.border;
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
              }}
            >
              {/* Avatar + name */}
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                <div style={{
                  width: 42, height: 42, borderRadius: "50%", flexShrink: 0,
                  background: "linear-gradient(135deg, #7c3aed, #db2777)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "#fff", fontWeight: 700, fontSize: 16,
                }}>
                  {dev.username[0].toUpperCase()}
                </div>
                <div style={{ minWidth: 0 }}>
                  <div style={{ color: C.text, fontWeight: 600, fontSize: 15, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {dev.name ?? dev.username}
                  </div>
                  <div style={{ color: C.muted, fontSize: 12, fontFamily: "monospace" }}>
                    @{dev.username}
                    {dev.country && ` · ${dev.country}`}
                  </div>
                </div>
              </div>

              {/* Bio */}
              {dev.bio && (
                <p style={{ color: C.sub, fontSize: 13, lineHeight: 1.55, margin: "0 0 12px", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                  {dev.bio}
                </p>
              )}

              {/* GitHub stars */}
              {dev.github_stars > 0 && (
                <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 10 }}>
                  <span style={{ color: "#fcd34d", fontSize: 13 }}>⭐</span>
                  <span style={{ color: C.sub, fontFamily: "monospace", fontSize: 12 }}>{dev.github_stars} stars</span>
                </div>
              )}

              {/* Verified badges */}
              {dev.verified_skills.length > 0 && (
                <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 8 }}>
                  {dev.verified_skills.slice(0, 4).map((s) => (
                    <span key={s} style={{
                      background: C.greenDim, border: `1px solid ${C.greenBorder}`,
                      borderRadius: 5, padding: "2px 8px",
                      color: C.green, fontFamily: "monospace", fontSize: 11, fontWeight: 600,
                    }}>
                      ✓ {s}
                    </span>
                  ))}
                  {dev.verified_skills.length > 4 && (
                    <span style={{ color: C.muted, fontFamily: "monospace", fontSize: 11 }}>
                      +{dev.verified_skills.length - 4} more
                    </span>
                  )}
                </div>
              )}

              {/* Top skills */}
              {dev.top_skills.length > 0 && (
                <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                  {dev.top_skills.slice(0, 5).map((s, i) => (
                    <span key={s} style={{
                      padding: "2px 8px", borderRadius: 5,
                      fontFamily: "monospace", fontSize: 11,
                      background: ["rgba(56,189,248,.08)","rgba(167,139,250,.08)","rgba(251,191,36,.07)","rgba(249,115,22,.08)","rgba(244,63,94,.07)"][i % 5],
                      border: ["1px solid rgba(56,189,248,.18)","1px solid rgba(167,139,250,.18)","1px solid rgba(251,191,36,.15)","1px solid rgba(249,115,22,.15)","1px solid rgba(244,63,94,.15)"][i % 5],
                      color: ["#7dd3fc","#c4b5fd","#fcd34d","#fdba74","#fda4af"][i % 5],
                    }}>
                      {s}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </NavLink>
        ))}
      </div>

      {!loading && devs.length === 0 && (
        <div style={{ textAlign: "center", padding: "60px 20px", color: C.muted, fontFamily: "monospace", fontSize: 13 }}>
          No developers found. Try adjusting your filters.
        </div>
      )}
    </div>
  );
}
