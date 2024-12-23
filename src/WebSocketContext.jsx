// WebSocketContext.jsx
import React, {createContext, useContext, useEffect, useRef, useState} from "react";
import SockJS from "sockjs-client";
import {over} from "stompjs";
import {fetchUserDetails} from "./apis/user.js";
import {useDispatch, useSelector} from "react-redux";
import {friendsActions} from "./store/friendsStore.js";
import {gameActions} from "./store/gameStore.js";
import {userActions} from "./store/userStore.js";
import {SOCKET_URL} from "./apis/globalUrl.js";
import {Navigate, useNavigate} from "react-router-dom";

const WebSocketContext = createContext();

let stompClient = null;

export const useWebSocket = () => useContext(WebSocketContext);

export const WebSocketProvider = ({children}) => {
    const [isConnected, setIsConnected] = useState(false);
    const userDetailsRef = useRef(null);
    const dispatch = useDispatch();
    const {userDetails} = useSelector(state => state.userStore);

    useEffect(() => {
        const getUserDetails = async () => {
            try {
                const response = await fetchUserDetails();
                if (response.status) {
                    userDetailsRef.current = response.object;
                    dispatch(userActions.saveUser(response.object));
                }
            } catch (e) {
                console.error("Failed to fetch user details:", e);
            }
        }
        getUserDetails();
        const username = localStorage.getItem("username");

        if (username && !isConnected) {
            connect(username);
        }
    }, [isConnected]);

    const connect = async (username) => {

        if (!stompClient || !isConnected) {
            const sock = new SockJS(SOCKET_URL);
            stompClient = over(sock);

            stompClient.debug = null;

            stompClient.connect({}, () => onConnected(username), onError);
        }
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
            JSON.stringify({message: "Online", body: username, type: "status"})
        );
    };

    const onMessageReceived = (payload) => {
        const payloadData = JSON.parse(payload.body);
        if (payloadData.type === "status" && payloadData.body !== userDetailsRef.current.playerName) {
            console.log("Player Status Received : ", payloadData);
            dispatch(friendsActions.changeOnlineStatus({username: payloadData.body, status: payloadData.message}));
        } else if (payloadData.type === "gameRequest" && payloadData.message === userDetailsRef.current.playerName) {
            console.log("Game Request Received : ",payloadData);
            dispatch(gameActions.saveGameDetails(payloadData.body));
        }
    };

    const onError = (err) => {
        console.error("Error:", err);
    };

    // New disconnect function to indicate offline status and close connection
    const disconnect = (username) => {
        if (stompClient && isConnected) {
            stompClient.send(
                "/app/general",
                {},
                JSON.stringify({message: "offline", body: username, type: "status"})
            );
            stompClient.disconnect(() => {
                setIsConnected(false);
                console.log("Disconnected from WebSocket");
            });
        }
    };

    return (
        <WebSocketContext.Provider value={{connect, disconnect, isConnected, userDetails}}>
            {children}
        </WebSocketContext.Provider>
    );
};
