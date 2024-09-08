import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import RegisterLoginLayout from "../layout/RegisterLoginLayout";
import { login } from "../apis/login.js";
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { userDetailsActions } from "../store/userDetails.js";
import { getRegisterUsername } from "../service/localStorageManager.js";
import { deleteToken } from "../service/cookieManager.js";
import { Bounce, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const username = useRef();
  const password = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  // Parse the query parameters
  const queryParams = new URLSearchParams(location.search);
  const message = queryParams.get("msg");

  const notifyInfo = () =>
    toast.info("User Registration Completed.", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });

  const toastInvalidLogin = () =>
    toast.info("Username or password invalid.", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });

  useEffect(() => {
    deleteToken();
    if (message == "rc") {
      notifyInfo();
    }

    if (getRegisterUsername()) {
      navigate("/confirmRegistration");
    }
  }, []);

  const handleOnLogin = async (event) => {
    event.preventDefault();
    let response;
    response = await login(username.current.value, password.current.value);
    if (response.status) {
      console.log(response, ">>>> REsponse");
      navigate("/");
    } else {
      toastInvalidLogin();
    }
  };

  return (
    <RegisterLoginLayout>
      <div className="card-title mb-4">
        {" "}
        <h2>Login</h2>
      </div>
      <form onSubmit={handleOnLogin}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            User Name
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            ref={username}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            ref={password}
          />
        </div>
        <div className="mb-4 text-center">
          <p className="">
            Dont have account ? <Link to="/register">register</Link>
          </p>
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Login
        </button>
      </form>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition:Bounce
      ></ToastContainer>
    </RegisterLoginLayout>
  );
};

export default Login;
