import { useState, useEffect } from "react";
import { API } from "../../Config/Api";
import type { QuizOut, QuizResult } from "../../Config/Types";

type Stage = "select" | "quiz" | "result";

const COLORS = {
  bg: "rgba(13,22,36,0.97)",
  border: "rgba(255,255,255,0.08)",
  green: "#86efac",
  greenDim: "rgba(134,239,172,0.1)",
  greenBorder: "rgba(134,239,172,0.25)",
  red: "#f87171",
  redDim: "rgba(248,113,113,0.08)",
  muted: "#64748b",
  text: "#f1f5f9",
  sub: "#94a3b8",
};

const card: React.CSSProperties = {
  background: COLORS.bg,
  border: `1px solid ${COLORS.border}`,
  borderRadius: 18,
  padding: 28,
  marginBottom: 20,
};

export default function SkillQuiz() {
  const [supported, setSupported] = useState<string[]>([]);
  const [selected, setSelected] = useState<string>("");
  const [stage, setStage] = useState<Stage>("select");
  const [quiz, setQuiz] = useState<QuizOut | null>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<QuizResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    API<string[]>("GET", "/skills/supported/")
      .then(setSupported)
      .catch(() => setError("Could not load skills list"));
  }, []);

  const startQuiz = async () => {
    if (!selected) return;
    setLoading(true);
    setError("");
    try {
      const data = await API<QuizOut>("GET", `/skills/quiz/${selected}/`);
      setQuiz(data);
      setAnswers({});
      setStage("quiz");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load quiz");
    } finally {
      setLoading(false);
    }
  };

  const submitQuiz = async () => {
    if (!quiz) return;
    const unanswered = quiz.questions.filter((q) => !answers[q.id]);
    if (unanswered.length > 0) {
      setError(`Answer all ${quiz.total} questions before submitting`);
      return;
    }
    setLoading(true);
    setError("");
    try {
      const data = await API<QuizResult>("POST", "/skills/quiz/submit/", {
        skill: quiz.skill,
        answers,
      });
      setResult(data);
      setStage("result");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Submission failed");
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setStage("select");
    setSelected("");
    setQuiz(null);
    setAnswers({});
    setResult(null);
    setError("");
  };

  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "40px 24px 80px", color: COLORS.sub, fontFamily: "'DM Sans', sans-serif" }}>

      {/* Page title */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
          <span style={{ fontFamily: "monospace", color: "rgba(134,239,172,0.5)", fontSize: 13 }}>03</span>
          <h1 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 28, color: COLORS.text, margin: 0, letterSpacing: "-0.02em" }}>
            Skill Verification
          </h1>
        </div>
        <p style={{ fontFamily: "monospace", fontSize: 12, color: COLORS.muted }}>
          Pass the quiz → earn a verified badge on your public profile
        </p>
      </div>

      {error && (
        <div style={{ background: COLORS.redDim, border: `1px solid rgba(248,113,113,0.25)`, borderRadius: 10, color: COLORS.red, fontSize: 13, padding: "10px 14px", marginBottom: 20, fontFamily: "monospace" }}>
          ⚠ {error}
        </div>
      )}

      {/* ── STAGE: Select ── */}
      {stage === "select" && (
        <div style={card}>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 17, fontWeight: 700, color: COLORS.text, margin: "0 0 6px" }}>
            Choose a skill to verify
          </h2>
          <p style={{ fontSize: 13, color: COLORS.muted, marginBottom: 24 }}>
            Each quiz has 5 questions. Score ≥ 70% to earn your badge.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: 10, marginBottom: 24 }}>
            {supported.map((skill) => (
              <button
                key={skill}
                onClick={() => setSelected(skill)}
                style={{
                  padding: "12px 10px",
                  borderRadius: 10,
                  border: selected === skill
                    ? `1px solid ${COLORS.greenBorder}`
                    : "1px solid rgba(255,255,255,0.07)",
                  background: selected === skill ? COLORS.greenDim : "rgba(255,255,255,0.02)",
                  color: selected === skill ? COLORS.green : COLORS.sub,
                  fontFamily: "monospace",
                  fontSize: 13,
                  fontWeight: selected === skill ? 600 : 400,
                  cursor: "pointer",
                  transition: "all 0.15s",
                  textTransform: "capitalize",
                }}
              >
                {skill}
              </button>
            ))}
          </div>

          <button
            onClick={startQuiz}
            disabled={!selected || loading}
            style={{
              padding: "11px 28px",
              borderRadius: 10,
              border: "none",
              background: selected
                ? "linear-gradient(135deg, rgba(134,239,172,.18), rgba(56,189,248,.14))"
                : "rgba(255,255,255,0.04)",
              borderTop: selected ? `1px solid ${COLORS.greenBorder}` : "1px solid transparent",
              color: selected ? COLORS.green : COLORS.muted,
              fontFamily: "monospace",
              fontWeight: 600,
              fontSize: 14,
              cursor: selected ? "pointer" : "not-allowed",
              opacity: loading ? 0.6 : 1,
            }}
          >
            {loading ? "Loading quiz…" : `Start ${selected ? selected.charAt(0).toUpperCase() + selected.slice(1) : ""} Quiz →`}
          </button>
        </div>
      )}

      {/* ── STAGE: Quiz ── */}
      {stage === "quiz" && quiz && (
        <div>
          {/* Progress bar */}
          <div style={{ marginBottom: 24 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
              <span style={{ fontFamily: "monospace", fontSize: 12, color: COLORS.muted, textTransform: "capitalize" }}>
                {quiz.skill} quiz
              </span>
              <span style={{ fontFamily: "monospace", fontSize: 12, color: COLORS.muted }}>
                {Object.keys(answers).length} / {quiz.total} answered
              </span>
            </div>
            <div style={{ height: 4, background: "rgba(255,255,255,0.06)", borderRadius: 99, overflow: "hidden" }}>
              <div style={{
                height: "100%",
                borderRadius: 99,
                width: `${(Object.keys(answers).length / quiz.total) * 100}%`,
                background: "linear-gradient(90deg, #86efac, #7dd3fc)",
                transition: "width 0.3s ease",
              }} />
            </div>
          </div>

          {quiz.questions.map((q, qi) => (
            <div key={q.id} style={{ ...card, marginBottom: 16 }}>
              <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
                <span style={{
                  width: 26, height: 26, borderRadius: 7, flexShrink: 0,
                  background: answers[q.id] ? COLORS.greenDim : "rgba(255,255,255,0.04)",
                  border: answers[q.id] ? `1px solid ${COLORS.greenBorder}` : "1px solid rgba(255,255,255,0.08)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontFamily: "monospace", fontSize: 11, fontWeight: 700,
                  color: answers[q.id] ? COLORS.green : COLORS.muted,
                }}>
                  {qi + 1}
                </span>
                <p style={{ color: COLORS.text, fontSize: 15, lineHeight: 1.55, margin: 0, fontWeight: 500 }}>
                  {q.question}
                </p>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {q.options.map((opt) => {
                  const chosen = answers[q.id] === opt.id;
                  return (
                    <button
                      key={opt.id}
                      onClick={() => setAnswers((a) => ({ ...a, [q.id]: opt.id }))}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        padding: "10px 14px",
                        borderRadius: 9,
                        border: chosen
                          ? `1px solid ${COLORS.greenBorder}`
                          : "1px solid rgba(255,255,255,0.06)",
                        background: chosen ? COLORS.greenDim : "rgba(255,255,255,0.02)",
                        color: chosen ? COLORS.green : COLORS.sub,
                        fontFamily: "inherit",
                        fontSize: 14,
                        cursor: "pointer",
                        textAlign: "left",
                        transition: "all 0.12s",
                      }}
                    >
                      <span style={{
                        width: 22, height: 22, borderRadius: "50%", flexShrink: 0,
                        background: chosen ? "rgba(134,239,172,0.2)" : "rgba(255,255,255,0.04)",
                        border: chosen ? `1px solid ${COLORS.greenBorder}` : "1px solid rgba(255,255,255,0.1)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontFamily: "monospace", fontSize: 10, fontWeight: 700,
                        color: chosen ? COLORS.green : COLORS.muted,
                      }}>
                        {opt.id.toUpperCase()}
                      </span>
                      {opt.text}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          <div style={{ display: "flex", gap: 10 }}>
            <button
              onClick={reset}
              style={{
                padding: "11px 20px", borderRadius: 10,
                border: "1px solid rgba(255,255,255,0.08)",
                background: "transparent", color: COLORS.muted,
                fontFamily: "monospace", fontSize: 13, cursor: "pointer",
              }}
            >
              ← Back
            </button>
            <button
              onClick={submitQuiz}
              disabled={loading || Object.keys(answers).length < quiz.total}
              style={{
                flex: 1, padding: "11px 20px", borderRadius: 10, border: "none",
                background: Object.keys(answers).length === quiz.total
                  ? "linear-gradient(135deg, rgba(134,239,172,.18), rgba(56,189,248,.14))"
                  : "rgba(255,255,255,0.04)",
                borderTop: Object.keys(answers).length === quiz.total ? `1px solid ${COLORS.greenBorder}` : "1px solid transparent",
                color: Object.keys(answers).length === quiz.total ? COLORS.green : COLORS.muted,
                fontFamily: "monospace", fontWeight: 600, fontSize: 14,
                cursor: Object.keys(answers).length === quiz.total ? "pointer" : "not-allowed",
                opacity: loading ? 0.6 : 1,
              }}
            >
              {loading ? "Submitting…" : `Submit Quiz (${Object.keys(answers).length}/${quiz.total})`}
            </button>
          </div>
        </div>
      )}

      {/* ── STAGE: Result ── */}
      {stage === "result" && result && (
        <div>
          {/* Score card */}
          <div style={{
            ...card,
            borderColor: result.passed ? COLORS.greenBorder : "rgba(248,113,113,0.3)",
            textAlign: "center",
            padding: "36px 28px",
          }}>
            <div style={{
              fontSize: 48, marginBottom: 8,
              filter: result.passed ? "none" : "grayscale(1)",
            }}>
              {result.passed ? "🏅" : "😅"}
            </div>
            <h2 style={{
              fontFamily: "'Syne', sans-serif", fontSize: 24, fontWeight: 800,
              color: result.passed ? COLORS.green : COLORS.red,
              margin: "0 0 8px", letterSpacing: "-0.02em",
            }}>
              {result.passed ? "Quiz Passed!" : "Not Quite Yet"}
            </h2>
            {result.badge && (
              <div style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                background: COLORS.greenDim, border: `1px solid ${COLORS.greenBorder}`,
                borderRadius: 999, padding: "5px 16px", marginBottom: 16,
              }}>
                <span style={{ color: COLORS.green, fontSize: 13, fontFamily: "monospace", fontWeight: 600 }}>
                  ✓ {result.badge}
                </span>
              </div>
            )}
            <div style={{
              fontFamily: "monospace", fontSize: 42, fontWeight: 800,
              color: COLORS.text, margin: "12px 0 4px",
            }}>
              {Math.round(result.score)}<span style={{ fontSize: 20, color: COLORS.muted }}>/100</span>
            </div>
            <p style={{ color: COLORS.muted, fontSize: 13, fontFamily: "monospace" }}>
              {result.correct} / {result.total} correct · Pass threshold: 70%
            </p>
            {!result.passed && (
              <p style={{ color: COLORS.muted, fontSize: 12, marginTop: 8 }}>
                You can retake the quiz anytime. Your best score is saved.
              </p>
            )}
          </div>

          {/* Explanations */}
          <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: 15, fontWeight: 700, color: COLORS.text, marginBottom: 12 }}>
            Answer Review
          </h3>
          {result.explanations.map((ex, i) => (
            <div key={ex.question_id} style={{
              ...card,
              borderColor: ex.is_correct
                ? "rgba(134,239,172,0.2)"
                : "rgba(248,113,113,0.2)",
              padding: "18px 22px",
              marginBottom: 12,
            }}>
              <div style={{ display: "flex", gap: 10, marginBottom: 10, alignItems: "flex-start" }}>
                <span style={{ fontSize: 16 }}>{ex.is_correct ? "✅" : "❌"}</span>
                <p style={{ color: COLORS.text, fontSize: 14, margin: 0, lineHeight: 1.55 }}>
                  <span style={{ color: COLORS.muted, fontFamily: "monospace", fontSize: 11 }}>Q{i + 1}. </span>
                  {ex.question}
                </p>
              </div>
              {!ex.is_correct && (
                <div style={{
                  background: "rgba(248,113,113,0.06)", border: "1px solid rgba(248,113,113,0.15)",
                  borderRadius: 8, padding: "8px 12px", marginBottom: 8,
                  color: COLORS.red, fontSize: 13,
                }}>
                  Your answer: <strong>{ex.your_answer?.toUpperCase() || "—"}</strong>
                  {" · "}Correct: <strong>{ex.correct.toUpperCase()} — {ex.correct_text}</strong>
                </div>
              )}
              <p style={{
                background: "rgba(134,239,172,0.04)", border: "1px solid rgba(134,239,172,0.12)",
                borderRadius: 8, padding: "8px 12px",
                color: "#94a3b8", fontSize: 13, margin: 0, lineHeight: 1.5,
              }}>
                💡 {ex.explanation}
              </p>
            </div>
          ))}

          <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
            <button
              onClick={reset}
              style={{
                padding: "11px 24px", borderRadius: 10,
                border: "1px solid rgba(255,255,255,0.08)",
                background: "transparent", color: COLORS.muted,
                fontFamily: "monospace", fontSize: 13, cursor: "pointer",
              }}
            >
              Try Another Skill
            </button>
            {!result.passed && (
              <button
                onClick={() => {
                  setAnswers({});
                  setResult(null);
                  setStage("quiz");
                }}
                style={{
                  padding: "11px 24px", borderRadius: 10, border: "none",
                  background: "linear-gradient(135deg, rgba(134,239,172,.18), rgba(56,189,248,.14))",
                  borderTop: `1px solid ${COLORS.greenBorder}`,
                  color: COLORS.green,
                  fontFamily: "monospace", fontWeight: 600, fontSize: 13, cursor: "pointer",
                }}
              >
                Retake Quiz
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
