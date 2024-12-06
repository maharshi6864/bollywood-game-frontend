import styles from "../../css/App.module.css";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import InGamePlayerList from "./gameStartedComponents/InGamePlayerList.jsx";
import {gameActions} from "../../store/gameStore.js";
import SockJS from "sockjs-client";
import {over} from "stompjs";
import {userDetailsActions} from "../../store/userDetails.js";
import JoinGameRequest from "./JoinGameRequest.jsx";

let stompClient = null;

const GameStarted = ({setGameStart}) => {

    const [isConnected, setIsConnected] = useState(false);
    const [joinModelShow, setJoinModelShow] = useState(false);
    const gameDetails = useSelector((store) => store.gameStore);
    const userDetails = useSelector((store) => store.userDetails);
    const dispatch = useDispatch();

    useEffect(() => {
        console.log("Game started : ", gameDetails);
        console.log("User Details : ", userDetails);
        if (userDetails.inAGame === "REQUESTED" && gameDetails.hostPlayerName !== userDetails.playerName) {
            setJoinModelShow(true);
        } else {

        }
        connect();
        return () => {
            disconnect();  // Cleanup WebSocket connection when component unmounts
        };
    }, [gameDetails]);

    const connect = async () => {
        if (!stompClient || !isConnected) {
            const sock = new SockJS("http://localhost:8080/ws");
            stompClient = over(sock);
            stompClient.debug = null;
            stompClient.connect({}, () => onConnected(), onError);
        }
    };

    const handleAnswer = (answer) => {
        if (answer) {
            let playerStatusObj = {playerName: userDetails.playerName, status: "JOINED", gameId: gameDetails.id};
            updateGameEntity({message: "Request Accepted", body: playerStatusObj, type: "playerInGameStatus"});
            updateGeneralStream({message: gameDetails.id, body: userDetails.playerName, type: "status"})
            dispatch(userDetailsActions.saveUser({inAGame: "INAGAME"}));
        } else {
            let playerStatusObj = {playerName: userDetails.playerName, status: "DENIED", gameId: gameDetails.id};
            updateGameEntity({message: "Request Accepted", body: playerStatusObj, type: "playerInGameStatus"});

            dispatch(gameActions.deleteGame())
            dispatch(userDetailsActions.saveUser({inAGame: "NOTINAGAME"}));
            setGameStart(false);
        }
    }

    const onConnected = () => {
        setIsConnected(true);
        stompClient.subscribe(`/topic/game/${gameDetails.id}`, onMessageReceived);
    };

    // Dynamic subscription when gameDetails.id changes
    useEffect(() => {
        if (isConnected) {
            stompClient.subscribe(`/topic/game/${gameDetails.id}`, onMessageReceived);
        }
    }, [gameDetails, isConnected]);

    const updateGeneralStream = (requestObj) => {
        console.log(gameDetails);
        stompClient.send("/app/general", {}, JSON.stringify(requestObj));
    };

    const updateGameEntity = (requestObj) => {
        stompClient.send("/app/game", {}, JSON.stringify(requestObj));
    };

    const onMessageReceived = (payload) => {

        const payloadData = JSON.parse(payload.body);

        if (payloadData.type === "playerInGameStatus") {
            console.log("Received PLAYER STATUS : ", payloadData);
        }
    };

    const onError = (err) => {
        console.error("WebSocket connection error for game ID:", gameDetails.id, err);
    };

    // Disconnect function
    const disconnect = () => {
        if (stompClient && isConnected) {
            stompClient.send("/app/game", {}, JSON.stringify({
                message: "LEFT THE GAME", body: userDetails.playerId, type: "LEFT"
            }));
            stompClient.disconnect(() => {
                setIsConnected(false);
                console.log("Disconnected from WebSocket");
            });
        }
    };

    // Game actions like end or quit
    const endGame = () => {
        console.log("Ending game");
        stompClient.send("/app/game", {}, JSON.stringify({message: "END", type: "game"}));
    };

    const quitGame = () => {
        console.log("Quitting game");
        stompClient.send("/app/game", {}, JSON.stringify({message: "QUIT", type: "game"}));
    };

    return (<div className="row">
        <div className="col-lg-8">
            <div className={``}>
                <div className="row">
                    <div className="col-12">
                        <div className="d-flex justify-content-between p-2 pr-0 border-bottom">
                            <div>
                                <p className="text-start fs-4 mb-0">
                                    Game id: {gameDetails.id}
                                </p>
                                <p className="mt-0">
                                    created
                                    by: <span>{gameDetails.hostPlayerName === userDetails.username ? "YOU" : gameDetails.hostPlayerName}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card border-0">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-12 ">
                                <div>
                                    <p className="text-end fs-5">
                                        Time Remaining: <span>05:00</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <div className="d-flex justify-content-center align-items-center mt-5 py-5">
                                    <div className={styles.textContainer}>
                                        <p className={`${styles.responsiveText}`}>
                                            <span className={styles.cutB}>B</span> O L L Y W O O D
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <div
                                    className="d-flex justify-content-center align-items-center "
                                    style={{marginBottom: "8.5rem "}}
                                >
                                    <p className="fs-1">
                                        <span>_AI_ | _E | _A_A | _AI_ | _A__I</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-8">
                                <div className="input-group ">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Type a letter or the movie name."
                                        aria-label="Recipient's username"
                                        aria-describedby="button-addon1"
                                    />
                                    <button
                                        className="btn btn-primary"
                                        type="button"
                                        id="button-addon1"
                                    >
                                        Guess Movie
                                    </button>
                                </div>
                            </div>
                            <div className="col-4 d-flex justify-content-around align-items-center ">
                                {gameDetails.hostPlayerId === userDetails.playerId && (
                                    <button className="btn btn-danger" onClick={endGame}>End Game</button>)}
                                <button className="btn btn-danger" onClick={quitGame}>Quit Game</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="col-lg-4">
            <div className="row">
                <div className="col-12">
                    <div className="card-body border-bottom mt-4 mx-2">
                        <p className="fs-2">Players</p>
                    </div>
                </div>
            </div>
            <div className={`${styles.playersList} mb-1`}>
                <InGamePlayerList inGamePlayerDtoList={gameDetails.inGamePlayerDtoList}></InGamePlayerList>
            </div>
            <div className="row">
                <div className="col-12">
                    <div>
                        <div className="input-group mb-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Type a message"
                                aria-label="Recipient's username"
                                aria-describedby="button-addon2"
                            />
                            <button
                                className="btn btn-primary"
                                type="button"
                                id="button-addon2"
                            >
                                Send Message
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <JoinGameRequest handleAnswer={handleAnswer} joinModelShow={joinModelShow}
                         setJoinModelShow={setJoinModelShow}></JoinGameRequest>
    </div>);
};

export default GameStarted;
