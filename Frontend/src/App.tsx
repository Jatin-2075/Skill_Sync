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
<<<<<<< HEAD
=======
import FindCollaborators from "./Features/Recruitment/findcollaborators"
>>>>>>> 2e395f31c6437dbdbb905c5dfa893842ce52886b

const App = () =>{
    return (
        <Routes>
<<<<<<< HEAD
            {/* Intro and other not useable */}
            <Route path="/" element={<Intro/>}/>

            {/* Auth system files  */}
            <Route path="/login" element={<Login/>}/>
            <Route path="/signup" element={<Signup/>}/>

            {/*profile creation page*/}
=======

            <Route path="/login" element={<Login/>}/>
            <Route path="/signup" element={<Signup/>}/>

>>>>>>> 2e395f31c6437dbdbb905c5dfa893842ce52886b
            <Route path="/pageone" element={<Page1/>}/>
            <Route path="/pagetwo" element={<Page2/>}/>
            <Route path="/pagethree" element={<Page3/>}/>
            <Route path="/pagefour" element={<Page4/>}/>
            <Route path="/pagefive" element={<Page5/>}/>

<<<<<<< HEAD
            {/* Main Files Connection profile and other */}
            <Route element={<MainLayout/>} >
                <Route path="/postproject" element={<PostProjectPage/>}/>
                <Route path="/dashboard" element={<Dashboard/>}/>
            </Route>
        </Routes>
    )
}

=======

            <Route path="/" element={<Intro/>}/>

            <Route element={<MainLayout/>} >
                <Route path="/dashboard" element={<Dashboard/>}/>
                <Route path="/postproject" element={<PostProjectPage/>}/>
                <Route path="/findcollaborators" element={<FindCollaborators/>} ></Route>
            </Route> 
        </Routes>
    )
}

>>>>>>> 2e395f31c6437dbdbb905c5dfa893842ce52886b
export default App;  