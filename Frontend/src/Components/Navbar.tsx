<<<<<<< HEAD
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { LayoutDashboard, UserSquare2Icon ,Upload} from "lucide-react";
import "../Style/navbar.css";

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
        <nav className="navbar">
            <div className="navbar-container">
                {mainNav.map(({ path, name, icon: Icon }) => (
                    <NavLink key={path}  to={path}  className={({ isActive }) => isActive ? "nav-item active" : "nav-item"} >
                        <Icon size={20} className="nav-icon" />
                        {width > 768 && <span className="nav-text">{name}</span>}
                    </NavLink>
                ))}
=======
import React from 'react';
import { Search, Bell } from 'lucide-react';
import '../Style/navbar.css';

const Navbar = () => {
  return (
    <header className="navbar-header">
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
>>>>>>> 8c8f06fdde1fef21a0e7cac5dfd67afeff94cc0d
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
          <a className="navbar-link" href="#">Dashboard</a>
          <a className="navbar-link" href="#">Challenges</a>
          <a className="navbar-link navbar-link-active" href="#">Recruitment</a>
          <a className="navbar-link" href="#">Community</a>
        </div>
        
        <div className="navbar-actions">
          <button className="navbar-notification-btn">
            <Bell size={20} />
            <span className="navbar-notification-badge"></span>
          </button>
          <div className="navbar-avatar"></div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;