import React, { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import type { CSSProperties } from "react";

const C = {
  bg: "#080a0f", bgCard: "#0f1117", bgSection: "#0b0e14", border: "#1c2030",
  text: "#ffffff", textMuted: "#8b92a5", textDim: "#404560",
  blue: "#3b82f6", blueDark: "#2563eb", cyan: "#06b6d4",
  syne: "'Syne', sans-serif", dm: "'DM Sans', sans-serif",
};

function useCounter(target: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (ts: number) => {
      if (!startTime) startTime = ts;
      const p = Math.min((ts - startTime) / duration, 1);
      setCount(Math.floor(p * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return count;
}

function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function useTyping(words: string[], speed = 85, pause = 2000) {
  const [display, setDisplay] = useState("");
  const [wi, setWi] = useState(0);
  const [ci, setCi] = useState(0);
  const [del, setDel] = useState(false);
  useEffect(() => {
    const w = words[wi];
    const t = setTimeout(() => {
      if (!del) {
        setDisplay(w.slice(0, ci + 1));
        if (ci + 1 === w.length) setTimeout(() => setDel(true), pause);
        else setCi((c) => c + 1);
      } else {
        setDisplay(w.slice(0, ci - 1));
        if (ci - 1 === 0) { setDel(false); setWi((x) => (x + 1) % words.length); setCi(0); }
        else setCi((c) => c - 1);
      }
    }, del ? speed / 2 : speed);
    return () => clearTimeout(t);
  }, [ci, del, wi, words, speed, pause]);
  return display;
}

const KEYFRAMES = `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&family=DM+Sans:wght@300;400;500;600&display=swap');
*, *::before, *::after { box-sizing: border-box; }
@keyframes ss-fadeUp { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
@keyframes ss-blink  { 0%,100%{opacity:1} 50%{opacity:0} }
@keyframes ss-pulse  { 0%,100%{opacity:1} 50%{opacity:0.35} }
.ss-f1{animation:ss-fadeUp 0.7s ease both;animation-delay:0.1s}
.ss-f2{animation:ss-fadeUp 0.7s ease both;animation-delay:0.25s}
.ss-f3{animation:ss-fadeUp 0.7s ease both;animation-delay:0.4s}
.ss-f4{animation:ss-fadeUp 0.7s ease both;animation-delay:0.55s}
.ss-f5{animation:ss-fadeUp 0.7s ease both;animation-delay:0.7s}
.ss-cursor{display:inline-block;width:3px;height:0.8em;background:#3b82f6;margin-left:3px;vertical-align:middle;border-radius:2px;animation:ss-blink 1s step-end infinite;}
.ss-dot{animation:ss-pulse 2s ease-in-out infinite;}
.ss-btn-p{transition:filter 0.2s ease,transform 0.2s ease,box-shadow 0.2s ease !important;}
.ss-btn-p:hover{filter:brightness(1.12);transform:translateY(-2px) scale(1.02) !important;box-shadow:0 8px 30px rgba(59,130,246,0.45) !important;}
.ss-btn-s{transition:background 0.2s ease,border-color 0.2s ease,transform 0.2s ease !important;}
.ss-btn-s:hover{background:rgba(255,255,255,0.06) !important;border-color:#3b4260 !important;transform:translateY(-2px) scale(1.02) !important;}
.ss-card{transition:border-color 0.25s ease,box-shadow 0.25s ease,transform 0.25s ease !important;}
.ss-card:hover{border-color:#2a3a5c !important;box-shadow:0 0 40px rgba(59,130,246,0.09) !important;transform:translateY(-3px);}
`;

const Stat = ({ value, suffix, label, started }: { value: number; suffix: string; label: string; started: boolean }) => {
  const n = useCounter(value, 2000, started);
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
      <div style={{ fontFamily: C.syne, fontSize: "clamp(1.7rem,3vw,2.4rem)", fontWeight: 900, letterSpacing: "-0.02em", lineHeight: 1 }}>
        <span style={{ color: C.text }}>{n.toLocaleString()}</span>
        <span style={{ color: C.blue }}>{suffix}</span>
      </div>
      <div style={{ color: C.textMuted, fontSize: "0.8rem", letterSpacing: "0.05em" }}>{label}</div>
    </div>
  );
};

const FCard = ({ icon, title, desc, delay, inView }: { icon: string; title: string; desc: string; delay: number; inView: boolean }) => (
  <div className="ss-card" style={{ backgroundColor: C.bgCard, border: `1px solid ${C.border}`, borderRadius: "16px", padding: "28px", opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(28px)", transition: `opacity 0.55s ease ${delay}ms, transform 0.55s ease ${delay}ms` }}>
    <div style={{ width: "46px", height: "46px", borderRadius: "11px", background: "rgba(255,255,255,0.04)", border: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px", marginBottom: "18px" }}>{icon}</div>
    <div style={{ fontFamily: C.syne, fontSize: "0.95rem", fontWeight: 700, color: C.text, marginBottom: "8px" }}>{title}</div>
    <div style={{ color: C.textMuted, fontSize: "0.85rem", lineHeight: 1.7 }}>{desc}</div>
  </div>
);

const Intro: React.FC = () => {
  const typed = useTyping(["Teammates.", "Collaborators.", "Co-Founders.", "Mentors.", "Friends."]);
  const { ref: rStats, inView: iStats } = useInView(0.25);
  const { ref: rFeat, inView: iFeat } = useInView(0.06);
  const { ref: rCta, inView: iCta } = useInView(0.2);

  const pad: CSSProperties = { position: "relative", padding: "96px 24px", zIndex: 1 };
  const wrap: CSSProperties = { maxWidth: "1040px", margin: "0 auto" };
  const lbl: CSSProperties = { color: C.blue, fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "12px" };
  const h2: CSSProperties = { fontFamily: C.syne, fontSize: "clamp(1.8rem,4vw,3rem)", fontWeight: 900, letterSpacing: "-0.025em", color: C.text, lineHeight: 1.1 };
  const btnP: CSSProperties = { display: "inline-flex", alignItems: "center", justifyContent: "center", padding: "14px 32px", borderRadius: "12px", fontSize: "0.95rem", fontWeight: 600, color: "#fff", border: "none", cursor: "pointer", background: `linear-gradient(135deg,${C.blueDark},${C.cyan})`, boxShadow: "0 4px 20px rgba(59,130,246,0.28)", textDecoration: "none" };
  const btnS: CSSProperties = { display: "inline-flex", alignItems: "center", justifyContent: "center", padding: "14px 32px", borderRadius: "12px", fontSize: "0.95rem", fontWeight: 500, color: C.textMuted, cursor: "pointer", background: "transparent", border: `1px solid ${C.border}`, textDecoration: "none" };

  return (
    <>
      <style>{KEYFRAMES}</style>
      <div style={{ position: "relative", minHeight: "100vh", overflowX: "hidden", backgroundColor: C.bg, color: C.text, fontFamily: C.dm }}>

        {/* Hero */}
        <section style={{ ...pad, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", minHeight: "100vh", padding: "112px 24px 80px" }}>
          <div className="ss-f1" style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(59,130,246,0.09)", border: "1px solid rgba(59,130,246,0.18)", borderRadius: "999px", padding: "6px 16px", color: C.blue, fontSize: "0.73rem", fontWeight: 500, letterSpacing: "0.04em", marginBottom: "28px" }}>
            <span className="ss-dot" style={{ width: "6px", height: "6px", borderRadius: "50%", background: C.blue, display: "inline-block" }} />
            Now in public beta · 12,000+ developers joined
          </div>

          <h1 className="ss-f2" style={{ fontFamily: C.syne, fontSize: "clamp(2.2rem,7vw,5.5rem)", fontWeight: 900, lineHeight: 1.07, letterSpacing: "-0.03em", margin: "0 0 22px", maxWidth: "900px" }}>
            Build Projects.{" "}<br />
            <span style={{ background: `linear-gradient(135deg,${C.blue},${C.cyan})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Find {typed}
            </span>
            <span className="ss-cursor" />
            <br />Grow Together.
          </h1>

          <p className="ss-f3" style={{ maxWidth: "510px", color: C.textMuted, fontSize: "1rem", lineHeight: 1.75, margin: "0 0 36px" }}>
            SkillSync is where developers meet, collaborate on real projects, and build careers — not just code.
          </p>

          <div className="ss-f4" style={{ display: "flex", gap: "14px", flexWrap: "wrap", justifyContent: "center", marginBottom: "52px" }}>
            <NavLink to="/signup" className="ss-btn-p" style={btnP}>Get Started Free →</NavLink>
            <NavLink to="/projects" className="ss-btn-s" style={btnS}>Explore Projects</NavLink>
          </div>
        </section>

        {/* Stats */}
        <div ref={rStats}>
          <section style={{ ...pad, padding: "60px 24px", borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}` }}>
            <div style={{ ...wrap, display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(140px,1fr))", gap: "36px" }}>
              <Stat value={12000} suffix="+" label="Developers" started={iStats} />
              <Stat value={3400} suffix="+" label="Projects Built" started={iStats} />
              <Stat value={980} suffix="+" label="Teams Formed" started={iStats} />
              <Stat value={96} suffix="%" label="Satisfaction" started={iStats} />
            </div>
          </section>
        </div>

        {/* Features */}
        <div ref={rFeat}>
          <section style={pad}>
            <div style={wrap}>
              <div style={{ textAlign: "center", marginBottom: "52px", opacity: iFeat ? 1 : 0, transform: iFeat ? "none" : "translateY(18px)", transition: "opacity 0.55s ease,transform 0.55s ease" }}>
                <p style={lbl}>Everything you need</p>
                <h2 style={h2}>Built for builders.</h2>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: "18px" }}>
                <FCard delay={0} inView={iFeat} icon="🧠" title="Skill Verification" desc="Pass a quiz, earn a verified badge. Your skills are proven — not just listed. This is what makes you stand out." />
                <FCard delay={80} inView={iFeat} icon="🚀" title="Launch Projects" desc="Post your idea, define roles, and recruit a team. From concept to shipped product in record time." />
                <FCard delay={160} inView={iFeat} icon="🔍" title="Smart Discovery" desc="Recruiters and collaborators find you by verified skill, GitHub stars, and country. No cold DMs needed." />
                <FCard delay={80} inView={iFeat} icon="🏆" title="Skill Leaderboards" desc="Sync GitHub, LeetCode, and Codeforces. Your stats speak for themselves — no resume needed." />
                <FCard delay={160} inView={iFeat} icon="📡" title="Activity Tracking" desc="GitHub integration tracks real project activity — commits, contributors, issues — and scores your projects." />
                <FCard delay={240} inView={iFeat} icon="💼" title="Recruiter Mode" desc="Companies scout SkillSync for proven collaborators. Build in public, get hired for it." />
              </div>
            </div>
          </section>
        </div>

        {/* CTA */}
        <div ref={rCta}>
          <section style={{ ...pad, overflow: "hidden", textAlign: "center" }}>
            <div style={{ pointerEvents: "none", position: "absolute", inset: 0, zIndex: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ width: "680px", height: "320px", borderRadius: "50%", background: "radial-gradient(ellipse,#2563eb,transparent 70%)", opacity: 0.16, filter: "blur(80px)" }} />
            </div>
            <div style={{ position: "relative", zIndex: 1, maxWidth: "680px", margin: "0 auto", opacity: iCta ? 1 : 0, transform: iCta ? "none" : "translateY(22px)", transition: "opacity 0.7s ease,transform 0.7s ease" }}>
              <h2 style={{ fontFamily: C.syne, fontSize: "clamp(1.9rem,5vw,3.6rem)", fontWeight: 900, letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: "18px" }}>
                Your next teammate is{" "}
                <span style={{ background: `linear-gradient(135deg,${C.blue},${C.cyan})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>already here.</span>
              </h2>
              <p style={{ color: C.textMuted, fontSize: "1rem", lineHeight: 1.75, margin: "0 auto 36px", maxWidth: "460px" }}>
                Stop building alone. Join thousands of developers shipping real products and growing real careers.
              </p>
              <NavLink to="/signup" className="ss-btn-p" style={btnP}>Create Free Account →</NavLink>
              <p style={{ color: C.textDim, fontSize: "0.73rem", marginTop: "18px" }}>No credit card required · Free forever for developers</p>
            </div>
          </section>
        </div>

      </div>
    </>
  );
};

export default Intro;
