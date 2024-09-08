import { useEffect } from "react";
import { logout } from "../apis/login";

const Logout = () => {
  useEffect(() => {
    logout();
  }, []);
  return <div>logged out</div>;
};

export default Logout;
