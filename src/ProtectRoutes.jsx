import React, { useEffect, useState } from "react";
import {Navigate, useNavigate} from "react-router-dom";
import { fetchUserDetails } from "./apis/user";
import { useDispatch } from "react-redux";
import { userActions } from "./store/userStore";

const ProtectedRoutes = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const authenticateUser = async () => {
            try {
                const response = await fetchUserDetails();
                if (response.status) {
                    dispatch(userActions.saveUser(response.object));
                } else {
                console.log("Authenticate user");
                    navigate("/login");
                }
            } catch (error) {
                console.error("Error in fetching user details:", error);
                navigate("/login");
            } finally {
                setLoading(false);
            }
        };

        authenticateUser();
    }, [dispatch]);

    // Wait until user details are fetched
    if (loading) return <div>Loading...</div>;

    return children;
};

export default ProtectedRoutes;
