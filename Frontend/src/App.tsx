import React from "react";
import { Route, Routes } from "react-router-dom";


import Login from "./Auth/Login";
import Signup from "./Auth/Signup";
import Create_Profile from "./Pages/Profile/Create_Profile";

import Intro from "./Pages/Intro";
import Dashboard from "./Pages/Dashboard";
import MainLayout from "./Components/Mainlayout";
import Profile from "./Pages/Profile/Show_Profile";

const App:React.FC = () =>{
    return (
        <Routes>

            {/* Auth system files  */}
            <Route path="/login" element={<Login/>}/>
            <Route path="/signup" element={<Signup/>}/>
            <Route path="/create" element={<Create_Profile/>} />

            {/* Intro and other not useable */}
            <Route path="/" element={<Intro/>}/>

            {/* Main Files Connection profile and other */}
            <Route element={<MainLayout/>} >
                <Route path="/dashboard" element={<Dashboard/>}/>
                <Route path="/profile" element={<Profile/>}/>
            </Route>
        </Routes>
    )
}

export default App;  