import React from "react";
import { Route, Routes } from "react-router-dom";

import Login from "./Auth/Login";
import Signup from "./Auth/Signup";

import Intro from "./Pages/Intro";
import Dashboard from "./Pages/Dashboard";
import MainLayout from "./Components/Mainlayout";

import Page1 from "./Components/Profile/page1";
import Page2 from "./Components/Profile/page2";
import Page3 from "./Components/Profile/page3";
import Page4 from "./Components/Profile/page4";
import Page5 from "./Components/Profile/page5";
import PostProject from "./Pages/Recruitment/postproject";
import FindCollaborators from "./Pages/Recruitment/findcollaborators";

const App: React.FC = () => {
  return (
    <Routes>

      {/* Pages WITHOUT Navbar */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/" element={<Intro />} />

      {/* Pages WITH Navbar */}
      <Route element={<MainLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/pageone" element={<Page1 />} />
        <Route path="/pagetwo" element={<Page2 />} />
        <Route path="/pagethree" element={<Page3 />} />
        <Route path="/pagefour" element={<Page4 />} />
        <Route path="/pagefive" element={<Page5 />} />
        <Route path="/postproject" element={<PostProject />} />
        <Route path="/findcollaborators" element={<FindCollaborators/>}></Route>
      </Route>

    </Routes>
  );
};

export default App;
