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
            </div>
        </nav>
    );
};

export default Navbar;