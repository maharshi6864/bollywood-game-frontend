// ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoutes = ({ children }) => {
    const username = localStorage.getItem("username");

    if (!username) {
        // Redirect to login page if the user is not authenticated
        return <Navigate to="/login" replace />;
    }

    // Render the child component if authenticated
    return children;
};

export default ProtectedRoutes;
