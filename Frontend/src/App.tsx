import React from "react";
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
import PostProjectPage from "./Features/Recruitment/postproject";

const App:React.FC = () =>{
    return (
        <Routes>
            {/* Intro and other not useable */}
            <Route path="/" element={<Intro/>}/>

            {/* Auth system files  */}
            <Route path="/login" element={<Login/>}/>
            <Route path="/signup" element={<Signup/>}/>

            {/*profile creation page*/}
            <Route path="/pageone" element={<Page1/>}/>
            <Route path="/pagetwo" element={<Page2/>}/>
            <Route path="/pagethree" element={<Page3/>}/>
            <Route path="/pagefour" element={<Page4/>}/>
            <Route path="/pagefive" element={<Page5/>}/>

            {/* Main Files Connection profile and other */}
            <Route element={<MainLayout/>} >
                <Route path="/postproject" element={<PostProjectPage/>}/>
                <Route path="/dashboard" element={<Dashboard/>}/>
            </Route>
        </Routes>
    )
}

export default App;  