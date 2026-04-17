import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { API } from "../../Config/Api";
import type { AuthTokens } from "../../Config/Types";

/* ── Shared inline styles ──────────────────────────────────────────────────── */
const S = {
  root: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #060d14 0%, #0b1520 50%, #060d14 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "24px",
    fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
  } as React.CSSProperties,
  card: {
    width: "100%",
    maxWidth: "400px",
    background: "rgba(13,22,36,0.97)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "20px",
    padding: "36px 32px",
    boxShadow: "0 32px 80px rgba(0,0,0,0.6)",
  } as React.CSSProperties,
  logo: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "28px",
  } as React.CSSProperties,
  logoMark: {
    width: "36px",
    height: "36px",
    borderRadius: "9px",
    background: "linear-gradient(135deg, rgba(134,239,172,.15), rgba(56,189,248,.12))",
    border: "1px solid rgba(134,239,172,0.25)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#86efac",
    fontWeight: 800,
    fontSize: "14px",
  } as React.CSSProperties,
  logoText: {
    fontFamily: "'Syne', sans-serif",
    fontWeight: 800,
    fontSize: "18px",
    color: "#f1f5f9",
  } as React.CSSProperties,
  heading: {
    fontFamily: "'Syne', sans-serif",
    fontWeight: 800,
    fontSize: "22px",
    color: "#f1f5f9",
    marginBottom: "6px",
    letterSpacing: "-0.02em",
  } as React.CSSProperties,
  subtext: {
    color: "#64748b",
    fontSize: "13px",
    marginBottom: "28px",
  } as React.CSSProperties,
  label: {
    display: "block",
    fontSize: "11px",
    fontWeight: 600,
    color: "#94a3b8",
    textTransform: "uppercase" as const,
    letterSpacing: "0.05em",
    marginBottom: "6px",
  } as React.CSSProperties,
  input: {
    width: "100%",
    background: "rgba(6,12,22,0.75)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "10px",
    color: "#cbd5e1",
    fontSize: "14px",
    padding: "10px 14px",
    outline: "none",
    fontFamily: "inherit",
    boxSizing: "border-box" as const,
    transition: "border-color 0.15s",
  } as React.CSSProperties,
  field: { marginBottom: "16px" } as React.CSSProperties,
  btn: {
    width: "100%",
    padding: "12px",
    borderRadius: "10px",
    border: "none",
    background: "linear-gradient(135deg, rgba(134,239,172,.18), rgba(56,189,248,.14))",
    borderTop: "1px solid rgba(134,239,172,0.3)",
    color: "#86efac",
    fontFamily: "'JetBrains Mono', monospace",
    fontWeight: 600,
    fontSize: "14px",
    cursor: "pointer",
    marginTop: "8px",
    transition: "all 0.15s",
  } as React.CSSProperties,
  error: {
    background: "rgba(248,113,113,0.08)",
    border: "1px solid rgba(248,113,113,0.25)",
    borderRadius: "8px",
    color: "#f87171",
    fontSize: "13px",
    padding: "10px 14px",
    marginBottom: "16px",
  } as React.CSSProperties,
  footer: {
    marginTop: "20px",
    textAlign: "center" as const,
    color: "#475569",
    fontSize: "13px",
  } as React.CSSProperties,
  link: {
    color: "#86efac",
    textDecoration: "none",
    fontWeight: 500,
  } as React.CSSProperties,
};

/* ── Login ──────────────────────────────────────────────────────────────────── */
export const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!username.trim() || !password) {
      setErrorMsg("Please fill in all fields");
      return;
    }
    setLoading(true);
    setErrorMsg("");

    try {
      const data = await API<AuthTokens>("POST", "/auth/login/", { username, password });
      localStorage.setItem("access", data.access);
      localStorage.setItem("refresh", data.refresh);
      localStorage.setItem("username", username);
      navigate("/dashboard");
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const onKey = (e: React.KeyboardEvent) => e.key === "Enter" && handleSubmit();

  return (
    <div style={S.root}>
      <div style={S.card}>
        <div style={S.logo}>
          <div style={S.logoMark}>S</div>
          <span style={S.logoText}>Skill<span style={{ color: "#86efac" }}>Sync</span></span>
        </div>

        <h2 style={S.heading}>Welcome back</h2>
        <p style={S.subtext}>Sign in to your developer identity</p>

        {errorMsg && <div style={S.error}>{errorMsg}</div>}

        <div style={S.field}>
          <label style={S.label}>Username</label>
          <input
            style={S.input}
            placeholder="johndoe"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={onKey}
            autoComplete="username"
          />
        </div>

        <div style={S.field}>
          <label style={S.label}>Password</label>
          <input
            style={S.input}
            type="password"
            placeholder="••••••••"
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={onKey}
            autoComplete="current-password"
          />
        </div>

        <button style={S.btn} onClick={handleSubmit} disabled={loading}>
          {loading ? "Signing in…" : "Sign In →"}
        </button>

        <p style={S.footer}>
          New here?{" "}
          <NavLink style={S.link} to="/signup">Create account</NavLink>
        </p>
      </div>
    </div>
  );
};

/* ── Signup ─────────────────────────────────────────────────────────────────── */
export const Signup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", username: "", password: "", confirmPassword: "" });
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((p) => ({ ...p, [k]: e.target.value }));

  const handleSubmit = async () => {
    if (!form.username || !form.email || !form.password) {
      setErrorMsg("All fields are required");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setErrorMsg("Passwords don't match");
      return;
    }
    if (form.password.length < 8) {
      setErrorMsg("Password must be at least 8 characters");
      return;
    }
    setLoading(true);
    setErrorMsg("");

    try {
      await API("POST", "/auth/signup/", {
        username: form.username,
        email: form.email,
        password: form.password,
      });
      navigate("/login");
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={S.root}>
      <div style={S.card}>
        <div style={S.logo}>
          <div style={S.logoMark}>S</div>
          <span style={S.logoText}>Skill<span style={{ color: "#86efac" }}>Sync</span></span>
        </div>

        <h2 style={S.heading}>Create account</h2>
        <p style={S.subtext}>Join thousands of developers building together</p>

        {errorMsg && <div style={S.error}>{errorMsg}</div>}

        {[
          { k: "username" as const, label: "Username", placeholder: "johndoe", type: "text", auto: "username" },
          { k: "email" as const, label: "Email", placeholder: "john@example.com", type: "email", auto: "email" },
          { k: "password" as const, label: "Password", placeholder: "••••••••", type: "password", auto: "new-password" },
          { k: "confirmPassword" as const, label: "Confirm Password", placeholder: "••••••••", type: "password", auto: "new-password" },
        ].map(({ k, label, placeholder, type, auto }) => (
          <div key={k} style={S.field}>
            <label style={S.label}>{label}</label>
            <input
              style={S.input}
              type={type}
              placeholder={placeholder}
              value={form[k]}
              onChange={set(k)}
              autoComplete={auto}
            />
          </div>
        ))}

        <button style={S.btn} onClick={handleSubmit} disabled={loading}>
          {loading ? "Creating account…" : "Create Account →"}
        </button>

        <p style={S.footer}>
          Already have an account?{" "}
          <NavLink style={S.link} to="/login">Sign in</NavLink>
        </p>
      </div>
    </div>
  );
};
