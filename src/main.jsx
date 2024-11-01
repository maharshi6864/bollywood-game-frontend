// index.js
import React from "react";
import ReactDOM from "react-dom/client";
import store from "./store/store";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import OtpConfirm from "./pages/OtpConfirm";
import Logout from "./pages/Logout";
import Friends from "./pages/Friends";
import { WebSocketProvider } from "./WebSocketContext.jsx";
import ProtectedRoutes from "./ProtectRoutes.jsx";


window.global = window;

const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <ProtectedRoutes>
                <Home />
            </ProtectedRoutes>
        ),
    },
    {
        path: "/Friends",
        element: (
            <ProtectedRoutes>
                <Friends />
            </ProtectedRoutes>
        ),
    },
    {
        path: "/logout",
        element: (
            <ProtectedRoutes>
                <Logout />
            </ProtectedRoutes>
        ),
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
        path: "/confirmRegistration",
        element: <OtpConfirm />,
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <Provider store={store}>
        <WebSocketProvider>
            <RouterProvider router={router} />
        </WebSocketProvider>
    </Provider>
);
