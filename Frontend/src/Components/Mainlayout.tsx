import { Outlet, Navigate} from "react-router-dom";
import Navbar from "./Navbar";

const MainLayout = () => {

    const access = localStorage.getItem("access")
    if(!access){
        return <Navigate to='/login' replace />
    }

    return (
        <>
            <Navbar />
            <Outlet />
        </>
    )
}

export default MainLayout;