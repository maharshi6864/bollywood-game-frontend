export const getUserName = () => {
  return localStorage.getItem("username");
};

export const setUserName = (username) => {
  localStorage.setItem("username", username);
};
