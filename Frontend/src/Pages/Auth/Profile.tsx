import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { API } from "../../Config/Api";
import type { PublicProfileOut, GitHubStatsOut } from "../../Config/Types";

export default function ProfilePage() {
  const { username } = useParams<{ username?: string }>();
  const myUsername = localStorage.getItem("username") ?? "";
  const target = username ?? myUsername;

  const [profile, setProfile] = useState<PublicProfileOut | null>(null);
  const [ghStats, setGhStats] = useState<GitHubStatsOut | null>(null);
  const [syncing, setSyncing] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!target) return;
    API<PublicProfileOut>("GET", `/profile/${target}/`)
      .then(setProfile)
      .catch((e) => setError(e.message));

    // Load GitHub stats for own profile
    if (!username) {
      API<GitHubStatsOut>("GET", "/profile/github/stats/")
        .then(setGhStats)
        .catch(() => null);
    }
  }, [target, username]);

  const syncGithub = async () => {
    setSyncing(true);
    try {
      const stats = await API<GitHubStatsOut>("POST", "/profile/github/sync/");
      setGhStats(stats);
    } catch (e) {
      alert(e instanceof Error ? e.message : "Sync failed");
    } finally {
      setSyncing(false);
    }
  };

  if (error) {
    return (
      <div style={{ padding: 40, color: "#f87171", fontFamily: "monospace" }}>
        ⚠ {error}
      </div>
    );
  }

  if (!profile) {
    return (
      <div style={{ padding: 40, color: "#64748b", fontFamily: "monospace" }}>
        Loading profile…
      </div>
    );
  }

  const isOwnProfile = !username;
  const stats = ghStats ?? {
    github: profile.github,
    github_stars: profile.github_stars,
    github_repos: profile.github_repos,
    github_languages: profile.github_languages,
    github_contributions: profile.github_contributions,
    github_synced_at: null,
  };

  return (
    <div style={{
      maxWidth: 760,
      margin: "0 auto",
      padding: "40px 24px 80px",
      color: "#e2e8f0",
      fontFamily: "'DM Sans', sans-serif",
    }}>
      {/* Header */}
      <div style={{
        background: "rgba(13,22,36,0.97)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "18px",
        padding: "28px",
        marginBottom: "20px",
        display: "flex",
        gap: "20px",
        alignItems: "flex-start",
      }}>
        <div style={{
          width: 64, height: 64, borderRadius: "50%",
          background: "linear-gradient(135deg, #7c3aed, #db2777)",
          display: "flex", alignItems: "center", justifyContent: "center",
          color: "#fff", fontWeight: 800, fontSize: 24, flexShrink: 0,
        }}>
          {profile.username[0].toUpperCase()}
        </div>
        <div style={{ flex: 1 }}>
          <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: 22, fontWeight: 800, color: "#f1f5f9", margin: "0 0 4px" }}>
            {profile.name ?? profile.username}
          </h1>
          <p style={{ color: "#64748b", fontSize: 13, margin: "0 0 8px", fontFamily: "monospace" }}>
            @{profile.username}
            {profile.country && ` · ${profile.country}`}
          </p>
          {profile.bio && (
            <p style={{ color: "#94a3b8", fontSize: 14, lineHeight: 1.6, margin: 0 }}>{profile.bio}</p>
          )}
        </div>
      </div>

      {/* GitHub Stats */}
      {stats.github && (
        <div style={{
          background: "rgba(13,22,36,0.97)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "18px",
          padding: "24px",
          marginBottom: "20px",
        }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
            <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: 15, fontWeight: 700, color: "#f1f5f9", margin: 0 }}>
              GitHub Stats
            </h3>
            {isOwnProfile && (
              <button
                onClick={syncGithub}
                disabled={syncing}
                style={{
                  background: "rgba(134,239,172,0.1)",
                  border: "1px solid rgba(134,239,172,0.25)",
                  borderRadius: "8px",
                  color: "#86efac",
                  fontFamily: "monospace",
                  fontSize: 12,
                  padding: "5px 12px",
                  cursor: "pointer",
                  opacity: syncing ? 0.5 : 1,
                }}
              >
                {syncing ? "Syncing…" : "⟳ Sync"}
              </button>
            )}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
            {[
              { label: "⭐ Stars", value: stats.github_stars },
              { label: "📦 Repos", value: stats.github_repos },
              { label: "🔥 Contributions", value: stats.github_contributions },
            ].map(({ label, value }) => (
              <div key={label} style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: 10,
                padding: "12px 14px",
              }}>
                <div style={{ color: "#64748b", fontSize: 11, fontFamily: "monospace", marginBottom: 4 }}>{label}</div>
                <div style={{ color: "#f1f5f9", fontFamily: "monospace", fontSize: 20, fontWeight: 700 }}>{value}</div>
              </div>
            ))}
          </div>
          {stats.github_languages && Object.keys(stats.github_languages).length > 0 && (
            <div style={{ marginTop: 14, display: "flex", flexWrap: "wrap", gap: 6 }}>
              {Object.entries(stats.github_languages).map(([lang, count], i) => (
                <span key={lang} style={{
                  padding: "3px 10px",
                  borderRadius: 6,
                  fontFamily: "monospace",
                  fontSize: 12,
                  background: ["rgba(134,239,172,.08)","rgba(56,189,248,.08)","rgba(251,191,36,.07)","rgba(167,139,250,.08)","rgba(249,115,22,.08)","rgba(244,63,94,.07)"][i % 6],
                  border: ["1px solid rgba(134,239,172,.2)","1px solid rgba(56,189,248,.2)","1px solid rgba(251,191,36,.18)","1px solid rgba(167,139,250,.2)","1px solid rgba(249,115,22,.18)","1px solid rgba(244,63,94,.18)"][i % 6],
                  color: ["#86efac","#7dd3fc","#fcd34d","#c4b5fd","#fdba74","#fda4af"][i % 6],
                }}>
                  {lang} ({count})
                </span>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Verified Badges */}
      {profile.verifications.length > 0 && (
        <div style={{
          background: "rgba(13,22,36,0.97)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "18px",
          padding: "24px",
          marginBottom: "20px",
        }}>
          <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: 15, fontWeight: 700, color: "#f1f5f9", margin: "0 0 14px" }}>
            🏅 Verified Skills
          </h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {profile.verifications.map((v) => (
              <div key={v.skill_name} style={{
                background: "rgba(134,239,172,0.08)",
                border: "1px solid rgba(134,239,172,0.3)",
                borderRadius: 8,
                padding: "6px 14px",
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}>
                <span style={{ color: "#86efac", fontSize: 13, fontFamily: "monospace", fontWeight: 600 }}>
                  ✓ {v.skill_name.charAt(0).toUpperCase() + v.skill_name.slice(1)}
                </span>
                <span style={{ color: "#64748b", fontSize: 11, fontFamily: "monospace" }}>
                  {Math.round(v.score)}%
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {profile.skills.length > 0 && (
        <div style={{
          background: "rgba(13,22,36,0.97)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "18px",
          padding: "24px",
          marginBottom: "20px",
        }}>
          <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: 15, fontWeight: 700, color: "#f1f5f9", margin: "0 0 14px" }}>
            ⚡ Skills
          </h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {profile.skills.map((s, i) => (
              <span key={s.id} style={{
                padding: "4px 12px",
                borderRadius: 6,
                fontFamily: "monospace",
                fontSize: 12,
                background: ["rgba(134,239,172,.08)","rgba(56,189,248,.08)","rgba(251,191,36,.07)","rgba(167,139,250,.08)","rgba(249,115,22,.08)"][i % 5],
                border: ["1px solid rgba(134,239,172,.2)","1px solid rgba(56,189,248,.2)","1px solid rgba(251,191,36,.18)","1px solid rgba(167,139,250,.2)","1px solid rgba(249,115,22,.18)"][i % 5],
                color: ["#86efac","#7dd3fc","#fcd34d","#c4b5fd","#fdba74"][i % 5],
              }}>
                {s.skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Handles */}
      {profile.github && (
        <div style={{
          background: "rgba(13,22,36,0.97)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "18px",
          padding: "24px",
        }}>
          <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: 15, fontWeight: 700, color: "#f1f5f9", margin: "0 0 14px" }}>
            🔗 Dev Links
          </h3>
          {profile.github && (
            <a
              href={`https://github.com/${profile.github}`}
              target="_blank"
              rel="noreferrer"
              style={{ color: "#86efac", fontSize: 14, display: "block", marginBottom: 6, textDecoration: "none" }}
            >
              ↗ github.com/{profile.github}
            </a>
          )}
        </div>
      )}
    </div>
  );
}
