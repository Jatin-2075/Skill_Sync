import { useState } from "react";
import { NavLink } from "react-router-dom";

type NavItem = {
    to: string;
    icon: string;
    label: string;
};

const navItems: NavItem[] = [
    { to: "/", icon: "🏠", label: "Home" },
    { to: "/dashboard", icon: "📊", label: "Dashboard" },
    { to: "/projects", icon: "📁", label: "Projects" },
    { to: "/profile", icon: "👤", label: "Profile" },
    { to: "/friends", icon: "🤝", label: "Friends" },
];

const Navbar = () => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [hoveredItem, setHoveredItem] = useState<string | null>(null);

    return (
        <>
            <div className="md:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-3 bg-white/70 dark:bg-black/70 backdrop-blur-xl border-b border-black/10 dark:border-white/10 shadow-sm">
                <span className="text-sm font-semibold tracking-tight text-gray-800 dark:text-gray-100">
                    SkillSync
                </span>
                <button
                    onClick={() => setMobileOpen(!mobileOpen)}
                    className="w-8 h-8 flex flex-col justify-center gap-1.5 group"
                    aria-label="Toggle menu" >
                    <span
                        className={`block h-0.5 bg-gray-700 dark:bg-gray-200 rounded transition-all duration-300 origin-center ${mobileOpen ? "rotate-45 translate-y-2" : ""}`}/>
                    <span
                        className={`block h-0.5 bg-gray-700 dark:bg-gray-200 rounded transition-all duration-300 ${mobileOpen ? "opacity-0 scale-x-0" : ""}`}/>
                    <span
                        className={`block h-0.5 bg-gray-700 dark:bg-gray-200 rounded transition-all duration-300 origin-center ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`}/>
                </button>
            </div>

            {mobileOpen && ( <div className="md:hidden fixed inset-0 z-40 bg-black/30 backdrop-blur-sm" onClick={() => setMobileOpen(false)}/> )}

            <div className={`md:hidden fixed top-0 left-0 z-50 h-full w-64 bg-white/90 dark:bg-[#1c1c1e]/95 backdrop-blur-2xl shadow-2xl border-r border-black/10 dark:border-white/10 transition-transform duration-300 ease-in-out pt-16 ${mobileOpen ? "translate-x-0" : "-translate-x-full" }`}>
                <div className="px-3 pt-4 pb-6">
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 px-3 mb-2">
                        Navigation
                    </p>
                    {navItems.map(({ to, icon, label }) => (
                        <NavLink
                            key={to}
                            to={to}
                            onClick={() => setMobileOpen(false)}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-3 py-2.5 rounded-xl mb-0.5 text-sm font-medium transition-all duration-150 ${isActive
                                    ? "bg-blue-500/15 text-blue-600 dark:text-blue-400"
                                    : "text-gray-700 dark:text-gray-300 hover:bg-black/5 dark:hover:bg-white/8" }`
                            } >
                            <span className="text-lg leading-none">{icon}</span>
                            <span className="tracking-tight">{label}</span>
                        </NavLink>
                    ))}
                </div>
            </div>

            <aside className="hidden md:flex flex-col items-center w72px min-h-screen bg-white/60 dark:bg-[#1c1c1e]/80 backdrop-blur-2xl border-r border-black/6 dark:border-white/6 shadow-[1px_0_0_0_rgba(0,0,0,0.04)] py-5 gap-1 relative z-10">
            
                <div className="w-9 h-9 rounded-[10px] bg-linear-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-md shadow-blue-500/30 mb-4 shrink-0">
                    <span className="text-white text-sm font-bold tracking-tight">M</span>
                </div>

                <nav className="flex flex-col items-center gap-0.5 w-full px-2">
                    {navItems.map(({ to, icon, label }) => (
                        <div
                            key={to}
                            className="relative w-full flex justify-center"
                            onMouseEnter={() => setHoveredItem(label)}
                            onMouseLeave={() => setHoveredItem(null)} >
                            <NavLink to={to}
                                className={({ isActive }) => `relative w-12 h-12 flex items-center justify-center rounded-xl text-xl transition-all duration-200 ease-out group ${isActive ? "bg-white dark:bg-white/10 shadow-md shadow-black/10 dark:shadow-black/30 scale-105" : "hover:bg-black/6 dark:hover:bg-white/8 hover:scale-105 active:scale-95" }` } >
                                {({ isActive }) => (
                                    <>
                                        <span className="leading-none select-none">{icon}</span>
                                        {/* Active dot */}
                                        {isActive && (
                                            <span className="absolute -right-1 top-1/2 -translate-y-1/2 w-1 h-4 rounded-full bg-blue-500 shadow-sm shadow-blue-500/50" />
                                        )}
                                    </>
                                )}
                            </NavLink>

                            <div
                                className={`pointer-events-none absolute left-[calc(100%+10px)] top-1/2 -translate-y-1/2 z-50 transition-all duration-150 ease-out ${hoveredItem === label
                                        ? "opacity-100 translate-x-0"
                                        : "opacity-0 -translate-x-1" }`} >
                                <div className="bg-gray-900/90 dark:bg-gray-100/95 text-white dark:text-gray-900 text-xs font-medium px-2.5 py-1.5 rounded-lg shadow-lg whitespace-nowrap backdrop-blur-sm">
                                    {label}

                                    <span className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-gray-900/90 dark:border-r-gray-100/95" />
                                </div>
                            </div>
                        </div>
                    ))}
                </nav>

                <div className="mt-auto flex flex-col items-center gap-2">
                    <div className="w-8 h-px bg-black/10 dark:bg-white/10 rounded-full" />
                    <div className="w-9 h-9 rounded-full bg-linear-to-br from-violet-400 to-pink-500 shadow-md shadow-violet-400/30 flex items-center justify-center text-white text-xs font-semibold cursor-pointer hover:scale-105 transition-transform duration-200 select-none">
                        U
                    </div>
                </div>
            </aside>
        </>
    );
};

export default Navbar;