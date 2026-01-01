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
const App:React.FC = () =>{
    return (
        <Routes>

            {/* Auth system files  */}
            <Route path="/login" element={<Login/>}/>
            <Route path="/signup" element={<Signup/>}/>

            <Route path="/pageone" element={<Page1/>}/>
            <Route path="/pagetwo" element={<Page2/>}/>
            <Route path="/pagethree" element={<Page3/>}/>
            <Route path="/pagefour" element={<Page4/>}/>
            <Route path="/pagefive" element={<Page5/>}/>
            {/* Intro and other not useable */}
            <Route path="/" element={<Intro/>}/>

            {/* Main Files Connection profile and other */}
            <Route element={<MainLayout/>} >
                <Route path="/dashboard" element={<Dashboard/>}/>
            </Route>
        </Routes>
    )
}

export default App;  