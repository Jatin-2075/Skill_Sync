import { Bell, UserSquare2Icon, Upload, LayoutDashboard } from 'lucide-react';
import '../Style/navbar.css';
import { NavLink } from 'react-router-dom'
import { useState, useEffect } from 'react';

const Navbar = () => {
  const [width, setWidth] = useState<number>(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const mainNav = [
    { path: "/dashboard", name: "Dashboard", icon: LayoutDashboard },
    { path: "/postproject", name: "PostProject", icon: Upload },
    { path: "/profile", name: "Profile", icon: UserSquare2Icon },
  ];

  return (
    <div>
      <header>
        <nav className="navbar">
          <div className="navbar-container">
            {mainNav.map(({ path, name, icon: Icon }) => (
              <NavLink key={path} to={path} className={({ isActive }) => isActive ? "nav-item active" : "nav-item"} >
                <Icon size={20} className="nav-icon" />
                {width > 768 && <span className="nav-text">{name}</span>}
              </NavLink>
            ))}
          </div>
          <input
            className="navbar-search-input"
            placeholder="Search"
          />

          <div className="navbar-right">
            <div className="navbar-links">
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  isActive ? "navbar-link navbar-link-active" : "navbar-link"
                }
              >
                Dashboard
              </NavLink>

              <NavLink
                to="/challenges"
                className={({ isActive }) =>
                  isActive ? "navbar-link navbar-link-active" : "navbar-link"
                }
              >
                Challenges
              </NavLink>

              <NavLink
                to="/findcollaborators"
                className={({ isActive }) =>
                  isActive ? "navbar-link navbar-link-active" : "navbar-link"
                }
              >
                Recruitment
              </NavLink>

              <NavLink
                to="/community"
                className={({ isActive }) =>
                  isActive ? "navbar-link navbar-link-active" : "navbar-link"
                }
              >
                Community
              </NavLink>
            </div>


            <div className="navbar-actions">
              <button className="navbar-notification-btn">
                <Bell size={20} />
                <span className="navbar-notification-badge"></span>
              </button>
              <div className="navbar-avatar"></div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;