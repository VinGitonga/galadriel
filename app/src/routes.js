import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Meeting from "./pages/Meeting";
import NewMeeting from "./pages/NewMeeting";
import Room from "./pages/Room";
import MyRooms from "./pages/MyRooms";
import AppLayout from "./components/layout";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Landing />,
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/register",
        element: <Register />,
    },
    {
        element: <AppLayout />,
        children: [
            {
                path: "/meeting-view",
                element: <Meeting />,
            },
            {
                path: "/home",
                element: <Home />,
            },
            {
                path: "/new-meeting/:roomId",
                element: <NewMeeting />,
            },
            {
                path: "/room/:roomId",
                element: <Room />,
            },
            {
                path: "/my-rooms",
                element: <MyRooms />,
            },
        ]
    }
]);
