// Logout.jsx
import { useEffect } from "react";
import { logout } from "../apis/login";
import { useNavigate } from "react-router-dom";
import { useWebSocket } from "../WebSocketContext";

const Logout = () => {
  const navigate = useNavigate();
  const { disconnect } = useWebSocket();

  useEffect(() => {
    const logOut = async () => {
      const username = localStorage.getItem("username");
      if (username) {
        disconnect(username); // Notify server that the user is offline
      }
      const response = await logout();
      if (response) {
        localStorage.removeItem("username"); // Remove username from local storage
        navigate("/");
      }
    };

    logOut();
  }, []);

  return <div>logged out</div>;
};

export default Logout;
