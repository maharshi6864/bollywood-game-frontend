// WebSocketContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import SockJS from "sockjs-client";
import { over } from "stompjs";
import { fetchUserDetails } from "./apis/user.js";
import {useDispatch, useSelector} from "react-redux";
import {friendsActions} from "./store/friendsStore.js";

const WebSocketContext = createContext();

let stompClient = null;

export const useWebSocket = () => useContext(WebSocketContext);

export const WebSocketProvider = ({ children }) => {
    const [isConnected, setIsConnected] = useState(false);

    const dispatch=useDispatch();

    useEffect(() => {
        const username = localStorage.getItem("username");
        if (username && !isConnected) {
            connect(username);
        }
    }, [isConnected]);

    const connect = async (username) => {
        try {
            const response = await fetchUserDetails();
            if (response.status) {
                // Handle the successful user response, e.g., set user details
            }
        } catch (e) {
            console.error("Failed to fetch user details:", e);
        }
        if (!stompClient || !isConnected) {
            const sock = new SockJS("http://localhost:8080/ws");
            stompClient = over(sock);
            stompClient.connect({}, () => onConnected(username), onError);
        }
    };

    const onConnected = (username) => {
        setIsConnected(true);
        stompClient.subscribe("/topic/status", onMessageReceived);
        playerJoin(username);
    };

    const playerJoin = (username) => {
        stompClient.send(
            "/app/status",
            {},
            JSON.stringify({ message: "online", body: username, type: "status" })
        );
    };

    const onMessageReceived = (payload) => {
        const payloadData = JSON.parse(payload.body);
        console.log("Received payload", payloadData);
        if (payloadData.type==="status")
        {
            dispatch(friendsActions.changeOnlineStatus({username:payloadData.body,status:payloadData.message==="online"}));
        }
    };

    const onError = (err) => {
        console.error("Error:", err);
    };

    // New disconnect function to indicate offline status and close connection
    const disconnect = (username) => {
        if (stompClient && isConnected) {
            stompClient.send(
                "/app/status",
                {},
                JSON.stringify({ message: "offline", body: username, type: "status" })
            );
            stompClient.disconnect(() => {
                setIsConnected(false);
                console.log("Disconnected from WebSocket");
            });
        }
    };

    return (
        <WebSocketContext.Provider value={{ connect, disconnect, isConnected }}>
            {children}
        </WebSocketContext.Provider>
    );
};
