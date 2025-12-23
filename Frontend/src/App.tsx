import React from "react";
import { Route, Routes } from "react-router-dom";


import Login from "./Pages/Auth/Login";
import Dashboard from "./Pages/Dashboard";
import Signup from "./Pages/Auth/Signup";
import Create_Profile from "./Pages/Auth/Create_Profile";


const App:React.FC = () =>{
    return (
        <Routes>

            {/* Auth system files  */}
            <Route path="/Login" element={<> <Login/> </>} />
            <Route path="/Signup" element={<> <Signup/> </>} />
            <Route path="/Create" element={<> <Create_Profile/> </>} />

            {/* Dashboard and other not useable */}
            <Route path="/Dashboard" element={ <> <Dashboard/> </>} />

            {/* Main Files Connection profile and other */}
            
        </Routes>
    )
}

export default App;