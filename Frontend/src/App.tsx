import { Routes, Route } from "react-router-dom";

import MainLayout from "./Components/MainLayout";

// Auth
import { Login, Signup } from "./Pages/Auth/Auth";
import CreateProfile from "./Pages/Auth/CreateProfile";
import Profile from "./Pages/Auth/Profile";

// Core pages
import Dashboard from "./Pages/Dashboard";
import Community from "./Pages/Community";
import Settings from "./Pages/Settings";
import Intro from "./Pages/Intro";

// Project pages
import ShowProject from "./Pages/Project/ShowProject";
import PostProject from "./Pages/Project/PostProject";
import EnrolledProject from "./Pages/Project/EnrolledProject";
import Proposal from "./Pages/Project/Proposal";
import SkillQuiz from "./Pages/Skills/SkillQuiz";
import Discover from "./Pages/Discover";

function App() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<Intro />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/create-profile" element={<CreateProfile />} />

      {/* Main App Layout */}
      <Route element={<MainLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/community" element={<Community />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/:username" element={<Profile />} />

        {/* Project routes */}
        <Route path="/projects" element={<ShowProject />} />
        <Route path="/projects/post" element={<PostProject />} />
        <Route path="/projects/enrolled" element={<EnrolledProject />} />
        <Route path="/projects/proposal" element={<Proposal />} />

        {/* Skills */}
        <Route path="/skills/quiz" element={<SkillQuiz />} />

        {/* Discover / Recruiter */}
        <Route path="/discover" element={<Discover />} />
      </Route>
    </Routes>
  );
}

export default App;
