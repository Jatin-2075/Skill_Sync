import { Route, Routes } from "react-router-dom";

import Login from "./Auth/Login";
import Signup from "./Auth/Signup";

import Intro from "./Pages/Intro";
import Dashboard from "./Pages/Dashboard";
import MainLayout from "./Components/Mainlayout";

import Page1 from "./Features/Profile/page1";
import Page2 from "./Features/Profile/page2";
import Page3 from "./Features/Profile/page3";
import Page4 from "./Features/Profile/page4";
import Page5 from "./Features/Profile/page5";

import MainRecruit from "./Features/Recruitment/mainrecruit";
import PostProjectPage from "./Features/Recruitment/recruit/postproject";
import FindCollaborators from "./Features/Recruitment/recruit/findcollaborators";
import ProjectDetails from "./Features/Recruitment/recruit/projectdetails";

import MyProposals from "./Features/Recruitment/project/myproposal";
import GiveProposals from "./Features/Recruitment/project/giveproposal"

const App = () => {
  return (
    <Routes>

      <Route path="/" element={<Intro />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route path="/pageone" element={<Page1 />} />
      <Route path="/pagetwo" element={<Page2 />} />
      <Route path="/pagethree" element={<Page3 />} />
      <Route path="/pagefour" element={<Page4 />} />
      <Route path="/pagefive" element={<Page5 />} />

      <Route element={<MainLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/recruit" element={<MainRecruit />}>
          <Route index element={<FindCollaborators />} />
          <Route path="findcollaborators" element={<FindCollaborators />} />
          <Route path="postproject" element={<PostProjectPage />} />
          <Route path="myproposals" element={<MyProposals />} />
          <Route path="giveproposals" element={<GiveProposals/>} ></Route>
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
