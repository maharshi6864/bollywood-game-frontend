import { GLOBAL_URL } from "./globalUrl";

export const fetchFriends = async () => {
  const response = await fetch(GLOBAL_URL + "friends", {
    method: "GET",
    credentials: "include",
  });
  return response.json();
};
