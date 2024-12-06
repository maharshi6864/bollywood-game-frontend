import {GLOBAL_URL} from "./globalUrl";

export const fetchFriends = async () => {
    const response = await fetch(GLOBAL_URL + "friend/getFriends", {
        method: "GET",
        credentials: "include",
    });
    return response.json();
};

export const searchPlayer = async (searchString) => {
    const response = await fetch(GLOBAL_URL + "player/searchPlayer?searchString="
        + searchString, {
        method: "GET",
        credentials: "include",
    });
    return response.json();
};

export const savefriend = async ({playerId,playerName}) => {
    const data = {id:playerId,playerName:playerName};
    const response = await fetch(GLOBAL_URL + "friend/saveFriend", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include",
    });

    if (!response.ok) {
        return {status: false};
    }

    return response.json();
};

export const removefriend = async (id) => {
    const response = await fetch(GLOBAL_URL + "friend/removeFriend?id="
        + Number.parseInt(id), {
        method: "GET",
        credentials: "include",
    });
    return response.json();
};

