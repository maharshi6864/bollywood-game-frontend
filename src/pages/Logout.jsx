// Logout.jsx
import { useEffect } from "react";
import { logout } from "../apis/login";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const logOut = async () => {
      const response = await logout();
      if (response.status) {
        navigate("/login");
      }
    };

    logOut();
  }, []);

  return <div>logged out</div>;
};

export default Logout;
