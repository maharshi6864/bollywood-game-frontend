import { getRegisterUsername } from "../service/localStorageManager";
import { GLOBAL_URL } from "./globalUrl";

export const registerUser = async (email, username, password) => {
  const data = { email, username, password };
  const response = await fetch(GLOBAL_URL + "register", {
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

export const confirmUserForRegistration = async () => {
  const data = { username: getRegisterUsername() };
  const response = await fetch(
    GLOBAL_URL + "register/confirmUserForRegistration",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export const checkValidUsername = async (username) => {
  const response = await fetch(GLOBAL_URL + "register/checkUsernameAvail", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: username,
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  let s = await response.json();
  return s;
};

//This method is called when the user has already registed but otp validation is remaining.
export const getOtpValidation = async (username) => {
  const response = await fetch(
    GLOBAL_URL + "register/getOtpValidationDetailsForExistingUser",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: username,
    }
  );

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  let s = await response.json();
  return s;
};
