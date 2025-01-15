import React from "react";
import ReactDOM from "react-dom/client";
import store from "./store/store";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {Provider} from "react-redux";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import OtpConfirm from "./pages/OtpConfirm";
import Logout from "./pages/Logout";
import Friends from "./pages/Friends";
import {WebSocketProvider} from "./WebSocketContext.jsx";
import ProtectedRoutes from "./ProtectRoutes.jsx";

window.global = window;

const router = createBrowserRouter([
    // Public routes (no WebSocketProvider)
    {
        path: "/login",
        element: <Login/>,
    },
    {
        path: "/register",
        element: <Register/>,
    },
    {
        path: "/confirmRegistration",
        element: <OtpConfirm/>,
    },

    // Protected routes (wrapped with WebSocketProvider)
    {
        path: "/",
        element: (
            <ProtectedRoutes>
                <WebSocketProvider>
                    <Home/>
                </WebSocketProvider>
            </ProtectedRoutes>
        ),
    },
    {
        path: "/Friends",
        element: (
            <ProtectedRoutes>
                <WebSocketProvider>
                    <Friends/>
                </WebSocketProvider>
            </ProtectedRoutes>
        ),
    },
    {
        path: "/logout",
        element: (
            <Logout/>
        ),
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <Provider store={store}>
        <RouterProvider router={router}/>
    </Provider>
);
