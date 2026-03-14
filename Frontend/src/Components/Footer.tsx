import React from "react";

const Footer: React.FC = () => {
    return (<footer className="w-full h-14 bg-zinc-900 text-zinc-400 flex items-center justify-center text-sm">
        © {new Date().getFullYear()} SkillSync • Built by Jatin </footer>
    );
};

export default Footer;