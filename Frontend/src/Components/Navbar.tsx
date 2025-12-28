import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { LayoutDashboard, Book, BookHeart } from "lucide-react";

import "../Style/navbar.css"
import Profile from "../Pages/Profile/Profile";

const Navbar = () => {
    const [width, setWidth] = useState<number>(0);

    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const Nav = [
        { path: "/dashboard", name: "Dashboard", icon: LayoutDashboard },
        { path: "/community", name: "Community", icon: Book },
        { path: "/knowns", name: "Knows", icon: BookHeart },
    ];

    return (
        <nav className="navbar">
            <div className="navbar-container">
                {Nav.map(({ path, name, icon: Icon }) => (
                    <NavLink key={path} to={path} className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
                        <Icon size={18} className="nav-icon" />
                        {width > 786 && <span className="nav-text">{name}</span>}
                    </NavLink>
                ))}
            </div>
            <div>
                <Profile />
            </div>
        </nav>
    );
};

export default Navbar;
