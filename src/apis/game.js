import {GLOBAL_URL} from "./globalUrl.js";

export const getGameDetails = async () => {
  const response = await fetch(GLOBAL_URL + "game/getGameDetails", {
    method: "GET",
    credentials: "include",
  });
  return response.json();
};

export const startGame = async (data) => {
  const response = await fetch(GLOBAL_URL + "game/startGame", {
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
}

export const gameRequestReply = async (data) => {
  const response = await fetch(GLOBAL_URL + "game/gameRequestReply", {
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
}

export const endGame = async (data) => {
  const response = await fetch(GLOBAL_URL + "game/endGame", {
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
}

export const reSendRequestToPlayer = async (data) => {
  const response = await fetch(GLOBAL_URL + "game/reSendRequestToPlayer", {
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
}

export const getHintFromAi = async (data) => {
  const response = await fetch(GLOBAL_URL + "game/getHintFromAi", {
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
}