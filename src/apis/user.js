import {GLOBAL_URL} from "./globalUrl.js";

export const fetchUserDetails = async () => {
    const response = await fetch(GLOBAL_URL + "user/getUserDetails", {
        method: "GET",
        credentials: "include",
    });
    return response.json();
};