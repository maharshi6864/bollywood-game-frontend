import { getRegisterUsername } from "../service/localStorageManager";
import { GLOBAL_URL } from "./globalUrl";

export const resendOtpForRegistration = async () => {
  const data = {
    username: getRegisterUsername(),
  };
  const response = await fetch(GLOBAL_URL + "register/resendOtp", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export const validateOtp = async (otp) => {
  const data = {
    username: getRegisterUsername(),
    otp,
  };
  const response = await fetch(GLOBAL_URL + "register/validateOtp", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};
