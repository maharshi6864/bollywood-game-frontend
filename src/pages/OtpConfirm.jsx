import { useEffect, useRef, useState } from "react";
import RegisterLoginLayout from "../layout/RegisterLoginLayout";
import { useNavigate } from "react-router-dom";
import CountDown from "../components/CountDown";
import {
  getRegisterOtpExp,
  getRegisterUsername,
  setRegisterOtpExp,
  setRegisterUsername,
} from "../service/localStorageManager.js";
import { resendOtpForRegistration, validateOtp } from "../apis/otpValidation";
import { useForm } from "react-hook-form";

const OtpConfirm = () => {
  const navigate = useNavigate();
  const [timeStamp, setTimeStamp] = useState();
  const [loading, setLoading] = useState(false);
  const [loadingConfirmation, setLoadingConfirmation] = useState(false);

  const otp = useRef();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setTimeStamp(getRegisterOtpExp());
    if (getRegisterUsername() == null) {
      navigate(`/login?msg=rc`);
    }
  }, []);

  const handleOnReSendOtp = async () => {
    setLoading(true);
    const response = await resendOtpForRegistration();
    setRegisterUsername(response.object.username);
    setRegisterOtpExp(response.object.timeStamp);
    setTimeStamp(getRegisterOtpExp());
    setLoading(false);
  };

  const onSubmit = async (data, e) => {
    e.preventDefault();
    setLoadingConfirmation(true);
    const response = await validateOtp(data.otp);
    if (response.object.message === "valid") {
      localStorage.clear();
      navigate("/login");
    }
  };

  return (
    <RegisterLoginLayout>
      <div className="card-title mb-4">
        {" "}
        <h2>Confirm Otp</h2>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Enter the Otp send to your email address
          </label>
          <input
            type="text"
            className="form-control"
            id="emailAddress"
            aria-describedby="emailHelp"
            {...register("otp", {
              required: "Please otp.",
              pattern: {
                value: /^\d{6}$/,
                message: "Invalid Otp",
              },
            })}
          />
          {errors.otp && <p className="text-danger">{errors.otp.message}</p>}
          <span className="" style={{ fontSize: "0.8rem" }}>
            <CountDown expirationTime={timeStamp} loading={loading}></CountDown>
          </span>
          <a
            href="#"
            disabled
            className="text-center"
            onClick={handleOnReSendOtp}
          >
            Resend otp
          </a>
        </div>
        <div></div>
        {loading || loadingConfirmation ? (
          <button
            type="submit"
            disabled="disabled"
            className="btn btn-primary w-100"
          >
            {loadingConfirmation ? (
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            ) : (
              "Confirm"
            )}
          </button>
        ) : (
          <button type="submit" className="btn btn-primary w-100">
            Confirm
          </button>
        )}
      </form>
    </RegisterLoginLayout>
  );
};

export default OtpConfirm;
