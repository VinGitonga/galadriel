import { Outlet } from "react-router-dom";
import Navbar from "../Navbar";

const AppLayout = () => {
    return (
        <>
            <Navbar />
            <main>
                <Outlet />
            </main>
        </>
    );
};

export default AppLayout;
