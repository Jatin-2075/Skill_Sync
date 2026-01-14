import React from "react";
import { Route, Routes } from "react-router-dom";

import Login from "./Auth/Login";
import Signup from "./Auth/Signup";

import Intro from "./Pages/Intro";
import Dashboard from "./Pages/Dashboard";
import MainLayout from "./Components/Mainlayout";

<<<<<<< HEAD
import Page1 from "./Components/Profile/page1";
import Page2 from "./Components/Profile/page2";
import Page3 from "./Components/Profile/page3";
import Page4 from "./Components/Profile/page4";
import Page5 from "./Components/Profile/page5";
import PostProject from "./Pages/Recruitment/postproject";
import FindCollaborators from "./Pages/Recruitment/findcollaborators";
=======
import Page1 from "./Features/Profile/page1";
import Page2 from "./Features/Profile/page2";
import Page3 from "./Features/Profile/page3";
import Page4 from "./Features/Profile/page4";
import Page5 from "./Features/Profile/page5";
import PostProjectPage from "./Features/Recruitment/postproject";
>>>>>>> 62eb6994667de257197a117aab49e7ac13bed739

const App: React.FC = () => {
  return (
    <Routes>

      {/* Pages WITHOUT Navbar */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/" element={<Intro />} />
      <Route path="/pageone" element={<Page1 />} />
      <Route path="/pagetwo" element={<Page2 />} />
      <Route path="/pagethree" element={<Page3 />} />
      <Route path="/pagefour" element={<Page4 />} />
      <Route path="/pagefive" element={<Page5 />} />

<<<<<<< HEAD
      {/* Pages WITH Navbar */}
      <Route element={<MainLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        
        <Route path="/postproject" element={<PostProject />} />
        <Route path="/findcollaborators" element={<FindCollaborators/>}></Route>
      </Route>
=======
            {/*profile creation page*/}
            <Route path="/pageone" element={<Page1/>}/>
            <Route path="/pagetwo" element={<Page2/>}/>
            <Route path="/pagethree" element={<Page3/>}/>
            <Route path="/pagefour" element={<Page4/>}/>
            <Route path="/pagefive" element={<Page5/>}/>

            <Route path="/postproject" element={<PostProjectPage/>}/>
            {/* Intro and other not useable */}
            <Route path="/" element={<Intro/>}/>
>>>>>>> 62eb6994667de257197a117aab49e7ac13bed739

    </Routes>
  );
};

export default App;
