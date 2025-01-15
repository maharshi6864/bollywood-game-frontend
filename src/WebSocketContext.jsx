import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import SockJS from "sockjs-client";
import { over } from "stompjs";
import { useDispatch, useSelector } from "react-redux";
import { friendsActions } from "./store/friendsStore.js";
import { gameActions } from "./store/gameStore.js";
import { SOCKET_URL } from "./apis/globalUrl.js";

const WebSocketContext = createContext();
let stompClient = null;

export const WebSocketProvider = ({ children }) => {
    const [isConnected, setIsConnected] = useState(false);
    const userDetails = useSelector((state) => state.userStore.userDetails);
    const dispatch = useDispatch();

    useEffect(() => {
        // console.log("Connected", userDetails);
        if (userDetails && !isConnected) {
            connect(userDetails.playerName);
        }
    }, [userDetails, isConnected]);

    const connect = (username) => {
        const sock = new SockJS(SOCKET_URL);
        stompClient = over(sock);

        stompClient.debug = null;

        stompClient.connect({}, () => onConnected(username), onError);
    };

    const onConnected = (username) => {
        setIsConnected(true);
        stompClient.subscribe("/topic/general", onMessageReceived);
        playerJoin(username);
    };

    const playerJoin = (username) => {
        stompClient.send(
            "/app/general",
            {},
            JSON.stringify({ message: "Online", body: username, type: "status" })
        );
    };

    const onMessageReceived = (payload) => {
        const payloadData = JSON.parse(payload.body);

        if (payloadData.type === "status" && payloadData.body !== userDetails.playerName) {
            // console.log("Received message", payloadData);
            dispatch(friendsActions.changeOnlineStatus({ username: payloadData.body, status: payloadData.message }));

        } else if (payloadData.type === "gameRequest" && payloadData.message === userDetails.playerName) {
            dispatch(gameActions.saveGameDetails(payloadData.body));
        }
    };

    const onError = (err) => {
        console.error("Error:", err);
    };

    const disconnect = (username) => {
        if (stompClient && isConnected) {
            stompClient.send(
                "/app/general",
                {},
                JSON.stringify({ message: "Offline", body: username, type: "status" })
            );
            stompClient.disconnect(() => {
                setIsConnected(false);
                // console.log("Disconnected from WebSocket");
            });
        }
    };

    return (
        <WebSocketContext.Provider value={{ connect, disconnect, isConnected }}>
            {children}
        </WebSocketContext.Provider>
    );
};
