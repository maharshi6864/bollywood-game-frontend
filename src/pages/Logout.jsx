import { useEffect } from "react";
import { logout } from "../apis/login";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const logOut = async () => {
      const response = await logout();
      if (response) {
        navigate("/");
      }
    };

    logOut();
  }, []);
  return <div>logged out</div>;
};

export default Logout;
