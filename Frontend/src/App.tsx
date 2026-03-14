import { BrowserRouter, Routes, Route } from "react-router-dom";

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
import Porposal from "./Pages/Project/Porposal";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public */}
        <Route path="/" element={<Intro />} />
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/create-profile" element={<CreateProfile />} />
        <Route path="/profile" element={<Profile />} />

        {/* Main App Layout */}
        <Route element={<MainLayout />}>

          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/community" element={<Community />} />
          <Route path="/settings" element={<Settings />} />

          {/* Project routes */}
          <Route path="/projects" element={<ShowProject />} />
          <Route path="/projects/post" element={<PostProject />} />
          <Route path="/projects/enrolled" element={<EnrolledProject />} />
          <Route path="/projects/proposal" element={<Porposal />} />

        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;