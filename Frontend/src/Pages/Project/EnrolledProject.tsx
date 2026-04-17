import { useEffect, useState } from "react";
import { API } from "../../Config/Api";
import type { EnrollmentOut } from "../../Config/Types";

const C = {
  bg: "rgba(13,22,36,0.97)",
  border: "rgba(255,255,255,0.08)",
  green: "#86efac",
  greenDim: "rgba(134,239,172,0.1)",
  greenBorder: "rgba(134,239,172,0.25)",
  muted: "#64748b",
  text: "#f1f5f9",
};

export default function EnrolledProjects() {
  const [enrollments, setEnrollments] = useState<EnrollmentOut[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    API<EnrollmentOut[]>("GET", "/projects/enrolled/")
      .then(setEnrollments)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const leave = async (projectId: number) => {
    if (!confirm("Leave this project?")) return;
    try {
      await API("POST", `/projects/${projectId}/leave/`);
      setEnrollments((prev) => prev.filter((e) => e.project_id !== projectId));
    } catch (e) {
      alert(e instanceof Error ? e.message : "Failed to leave project");
    }
  };

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: "40px 24px 80px", color: C.muted, fontFamily: "'DM Sans', sans-serif" }}>

      <div style={{ marginBottom: 32 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
          <span style={{ fontFamily: "monospace", color: "rgba(134,239,172,0.5)", fontSize: 13 }}>📋</span>
          <h1 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 26, color: C.text, margin: 0 }}>My Enrollments</h1>
        </div>
        <p style={{ fontFamily: "monospace", fontSize: 12, color: C.muted }}>Projects you're actively contributing to</p>
      </div>

      {error && (
        <div style={{ background: "rgba(248,113,113,0.08)", border: "1px solid rgba(248,113,113,0.25)", borderRadius: 10, color: "#f87171", fontSize: 13, padding: "10px 14px", marginBottom: 20, fontFamily: "monospace" }}>
          ⚠ {error}
        </div>
      )}

      {loading && <p style={{ color: C.muted, fontFamily: "monospace", fontSize: 13 }}>Loading…</p>}

      {!loading && enrollments.length === 0 && !error && (
        <div style={{
          background: C.bg, border: `1px solid ${C.border}`, borderRadius: 16,
          padding: "48px 24px", textAlign: "center",
        }}>
          <p style={{ fontFamily: "monospace", fontSize: 13, color: C.muted, marginBottom: 16 }}>
            You're not enrolled in any projects yet.
          </p>
          <a href="/projects" style={{ color: C.green, fontFamily: "monospace", fontSize: 13 }}>
            Browse projects →
          </a>
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {enrollments.map((e) => (
          <div key={e.id} style={{
            background: C.bg, border: `1px solid ${C.border}`,
            borderRadius: 16, padding: "20px 24px",
            display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16,
            flexWrap: "wrap",
          }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                <span style={{
                  background: C.greenDim, border: `1px solid ${C.greenBorder}`,
                  borderRadius: 6, padding: "2px 8px",
                  color: C.green, fontFamily: "monospace", fontSize: 11, fontWeight: 600,
                }}>
                  {e.role}
                </span>
                <span style={{ color: "#334155", fontFamily: "monospace", fontSize: 11 }}>Project #{e.project_id}</span>
              </div>
              <p style={{ color: C.muted, fontFamily: "monospace", fontSize: 11, margin: 0 }}>
                Joined {new Date(e.joined_at).toLocaleDateString()}
              </p>
            </div>
            <button
              onClick={() => leave(e.project_id)}
              style={{
                padding: "7px 16px", borderRadius: 8, cursor: "pointer",
                background: "transparent", border: "1px solid rgba(248,113,113,0.2)",
                color: "#f87171", fontFamily: "monospace", fontSize: 12,
                transition: "all 0.15s",
              }}
            >
              Leave Project
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
