import { GLOBAL_URL } from "./globalUrl";

export const loadUser = async () => {
  const response = await fetch(GLOBAL_URL + "loadUsername", {
    method: "GET",
    credentials: "include",
  });
  return response.json();
};
