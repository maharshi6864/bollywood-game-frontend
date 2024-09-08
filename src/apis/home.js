import { GLOBAL_URL } from "./globalUrl";

export const loadUser = async () => {
  const response = await fetch(GLOBAL_URL + "loadUsername", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  return response.json();
};
