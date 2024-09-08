export const deleteToken = () => {
  // Set the cookie's expiration date to a past date to delete it
  document.cookie =
    "Authentication=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
};
