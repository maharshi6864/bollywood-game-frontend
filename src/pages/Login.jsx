// Login.jsx
import { Link, useLocation, useNavigate } from "react-router-dom";
import RegisterLoginLayout from "../layout/RegisterLoginLayout";
import { login } from "../apis/login.js";
import { useRef } from "react";
import { Bounce, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
    const username = useRef();
    const password = useRef();
    const navigate = useNavigate();

    const toastInvalidLogin = () =>
        toast.info("Username or password invalid.", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "light",
            transition: Bounce,
        });

    const handleOnLogin = async (event) => {
        event.preventDefault();
        const response = await login(username.current.value, password.current.value);
        if (response.status) {
            navigate("/");
        } else {
            toastInvalidLogin();
        }
    };

    return (
        <RegisterLoginLayout>
            <div className="card-title mb-4">
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
                    <p>
                        Don't have an account? <Link to="/register">Register</Link>
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
            />
        </RegisterLoginLayout>
    );
};

export default Login;
