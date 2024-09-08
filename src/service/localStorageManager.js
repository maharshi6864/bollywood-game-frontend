export const setRegisterUsername = (regUsername) => {
  localStorage.setItem("registerUsername", regUsername);
};

export const getRegisterUsername = () => {
  return localStorage.getItem("registerUsername");
};

export const setRegisterOtpExp = (timestamp) => {
  return localStorage.setItem("registerOtpExpire", timestamp);
};

export const getRegisterOtpExp = () => {
  return localStorage.getItem("registerOtpExpire");
};
