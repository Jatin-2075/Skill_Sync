import { Bell, Search } from 'lucide-react';
import '../Style/navbar.css';
import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Navbar = () => {
  const [width, setWidth] = useState<number>(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header className="navbar-header">
      <div className="navbar-container">
        <div className="navbar-left">
          <div className="navbar-brand">
            <div className="navbar-logo">
              <svg className="navbar-logo-svg" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path d="M42.4379 44C42.4379 44 36.0744 33.9038 41.1692 24C46.8624 12.9336 42.2078 4 42.2078 4L7.01134 4C7.01134 4 11.6577 12.932 5.96912 23.9969C0.876273 33.9029 7.27094 44 7.27094 44L42.4379 44Z" fill="currentColor"></path>
              </svg>
            </div>
            <h2 className="navbar-title">SkillRank</h2>
          </div>

          <label className="navbar-search-wrapper">
            <div className="navbar-search-container">
              <div className="navbar-search-icon">
                <Search size={20} />
              </div>
              <input
                className="navbar-search-input"
                placeholder="Search"
              />
            </div>
          </label>
        </div>
        
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
              to="/recruit"
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
            <div
              className="navbar-avatar"
              style={{
                backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuADzaHGFxSTdv3u6-6DDXuMfzKk6M6pyGPIUXerdUw7HZW1uxO8CBsjy4bqCN02EYhg-QNn7Y8-QmWs5J3HfXcRSSN1p0qK_d_IFbPJqBvRG_HjRyBWc0BRET5EGvZdpACm6jmAWIomPzpNUhxpXoh4JmXm1gRdwiqkKSO553LXsUuR1cUdL1EE9YZPr9ocU-cYju1_XCOsr5-JgLwMex4NMHMTQC9kDW_3a9K90GyHyF_SAY3pl9PUQ0HpgD6n4ur30xQ-Y4lzFGc")'
              }}
            ></div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;