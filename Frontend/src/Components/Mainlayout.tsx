import { Outlet, NavLink } from "react-router-dom";
import { useState } from "react";

type NavItem = {
  to: string;
  icon: string;
  label: string;
};

const navItems: NavItem[] = [
  { to: "/dashboard", icon: "📊", label: "Dashboard" },
  { to: "/projects", icon: "📁", label: "Projects" },
  { to: "/skills/quiz", icon: "🧠", label: "Skill Quiz" },
  { to: "/discover", icon: "🔍", label: "Discover" },
  { to: "/community", icon: "💬", label: "Community" },
  { to: "/settings", icon: "⚙️", label: "Settings" },
];

const MainLayout = () => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  return (
    <div style={{ display: "flex", height: "100vh", width: "100%", background: "#060d14" }}>
      {/* Sidebar */}
      <aside
        style={{
          width: "72px",
          backgroundColor: "#0b1120",
          borderRight: "1px solid rgba(255,255,255,0.06)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingTop: "16px",
          gap: "4px",
          flexShrink: 0,
        }}
      >
        {/* Logo */}
        <NavLink
          to="/dashboard"
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "10px",
            background: "linear-gradient(135deg, rgba(134,239,172,.15), rgba(56,189,248,.12))",
            border: "1px solid rgba(134,239,172,0.25)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#86efac",
            fontWeight: 800,
            fontSize: "14px",
            textDecoration: "none",
            marginBottom: "12px",
          }}
        >
          S
        </NavLink>

        <nav style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "2px", width: "100%" }}>
          {navItems.map(({ to, icon, label }) => (
            <div
              key={to}
              style={{ position: "relative", width: "100%", display: "flex", justifyContent: "center" }}
              onMouseEnter={() => setHoveredItem(label)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <NavLink
                to={to}
                style={({ isActive }) => ({
                  width: "48px",
                  height: "48px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "12px",
                  fontSize: "20px",
                  textDecoration: "none",
                  transition: "all 0.15s ease",
                  background: isActive ? "rgba(134,239,172,0.12)" : "transparent",
                  border: isActive ? "1px solid rgba(134,239,172,0.25)" : "1px solid transparent",
                  transform: isActive ? "scale(1.05)" : "scale(1)",
                })}
              >
                {icon}
              </NavLink>

              {/* Tooltip */}
              {hoveredItem === label && (
                <div
                  style={{
                    position: "absolute",
                    left: "calc(100% + 10px)",
                    top: "50%",
                    transform: "translateY(-50%)",
                    zIndex: 50,
                    background: "rgba(13,22,36,0.97)",
                    border: "1px solid rgba(134,239,172,0.2)",
                    color: "#94a3b8",
                    fontSize: "12px",
                    fontFamily: "'JetBrains Mono', monospace",
                    fontWeight: 500,
                    padding: "6px 12px",
                    borderRadius: "8px",
                    whiteSpace: "nowrap",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.5)",
                    pointerEvents: "none",
                  }}
                >
                  {label}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Profile avatar at bottom */}
        <div style={{ marginTop: "auto", marginBottom: "16px" }}>
          <NavLink
            to="/profile"
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #7c3aed, #db2777)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontWeight: 700,
              fontSize: "13px",
              textDecoration: "none",
              boxShadow: "0 2px 12px rgba(124,58,237,0.35)",
            }}
          >
            U
          </NavLink>
        </div>
      </aside>

      {/* Main content */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <header
          style={{
            height: "52px",
            backgroundColor: "rgba(11,17,32,0.95)",
            borderBottom: "1px solid rgba(255,255,255,0.05)",
            display: "flex",
            alignItems: "center",
            paddingLeft: "24px",
            paddingRight: "24px",
            backdropFilter: "blur(12px)",
            flexShrink: 0,
          }}
        >
          <span
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 800,
              fontSize: "16px",
              color: "#f1f5f9",
              letterSpacing: "-0.01em",
            }}
          >
            Skill<span style={{ color: "#86efac" }}>Sync</span>
          </span>
        </header>

        <main
          style={{
            flex: 1,
            overflowY: "auto",
            background: "linear-gradient(135deg, #060d14 0%, #0b1520 50%, #060d14 100%)",
          }}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
