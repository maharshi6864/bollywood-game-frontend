import { json, Link, useNavigate } from "react-router-dom";
import RegisterLoginLayout from "../layout/RegisterLoginLayout";
import { useRef, useState } from "react";
import { checkValidUsername, registerUser } from "../apis/register.js";
import { useForm } from "react-hook-form";
import {
  setRegisterOtpExp,
  setRegisterUsername,
} from "../service/localStorageManager.js";

const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const password = watch("password");

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data, event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await registerUser(
        data.email,
        data.username,
        data.password
      );
      if (response.status) {
        setRegisterUsername(response.object.username);
        setRegisterOtpExp(response.object.timeStamp);
        navigate("/confirmRegistration");
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <RegisterLoginLayout>
      <div className="card-title mb-4">
        {" "}
        <h2>Register</h2>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="text"
            className="form-control"
            id="emailAddress"
            aria-describedby="emailHelp"
            {...register("email", {
              required: "Email address must be required.",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Invalid email address",
              },
            })}
          />
          {errors.email && (
            <p className="text-danger">{errors.email.message}</p>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Username
          </label>
          <input
            type="text"
            className="form-control"
            id="username"
            aria-describedby="emailHelp"
            {...register("username", {
              required: "Username must be required.",
              validate: async (value) => {
                let response = await checkValidUsername(value);
                return response.status || "Username already in use.";
              },
            })}
          />
          {errors.username && (
            <p className="text-danger">{errors.username.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            {...register("password", {
              required: "Password must be required.",
              minLength: {
                value: 8,
                message: "Password must be at least 6 characters long",
              },
            })}
          />
          {errors.password && (
            <p className="text-danger">{errors.password.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Re-Password
          </label>
          <input
            type="password"
            className="form-control"
            id="re_password"
            {...register("rePassword", {
              required: "Please confirm your password",
              validate: (value) =>
                value === password || "Passwords do not match",
            })}
          />
          {errors.rePassword && (
            <p className="text-danger">{errors.rePassword.message}</p>
          )}
        </div>
        <div className="mb-4 text-center">
          <p className="">
            Already have an account ? <Link to="/login">login</Link>
          </p>
        </div>
        {loading ? (
          <button
            type="submit"
            disabled="disabled"
            className="btn btn-primary w-100"
          >
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </button>
        ) : (
          <button type="submit" className="btn btn-primary w-100">
            Register
          </button>
        )}
      </form>
    </RegisterLoginLayout>
  );
};

export default Register;
