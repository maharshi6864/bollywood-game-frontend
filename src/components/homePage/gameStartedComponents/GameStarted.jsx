import styles from "../../../css/App.module.css";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {gameActions} from "../../../store/gameStore.js";
import SockJS from "sockjs-client";
import {over} from "stompjs";
import CutCharacter from "./GameComponents/CutCharacter.jsx";
import UnCutCharacter from "./GameComponents/UnCutCharacter.jsx";
import PlayerCard from "./GameComponents/PlayerCard.jsx";
import {IoExitOutline} from "react-icons/io5";
import {endGame, reSendRequestToPlayer} from "../../../apis/game.js";
import MovieName from "./GameComponents/MovieName.jsx";
import AskingInput from "./GameComponents/AskingInput.jsx";
import GuessingInput from "./GameComponents/GuessingInput.jsx";
import Timer from "./GameComponents/Timer.jsx";
import {SOCKET_URL} from "../../../apis/globalUrl.js";
import {Bounce, toast, ToastContainer} from "react-toastify";
import HintArea from "./GameComponents/HintArea.jsx";
import AudioComponent from "./GameComponents/AudioComponent.jsx";


let stompClient = null;

const GameStarted = ({setGameStart, setHomeLoading}) => {
    const [isConnected, setIsConnected] = useState(false);
    const {gameDetails} = useSelector((store) => store.gameStore);
    const {userDetails} = useSelector((store) => store.userStore);
    const [bollywoodWord, setBollywoodWord] = useState("BOLLYWOOD".split(""));
    const dispatch = useDispatch();
    const [waiting, setWaiting] = useState(false);

    useEffect(() => {
        console.log("Game started:", gameDetails);
        console.log("User Details:", userDetails);


        connect();
        userDetails.playerName === gameDetails.hostPlayerName ? dispatch(gameActions.updatePlayerStatus({
            playerName: userDetails.playerName
            , status: "Host"
        })) : dispatch(gameActions.updatePlayerStatus({
            playerName: userDetails.playerName
            , status: "In Game"
        }));
        return () => {
            disconnect(); // Cleanup WebSocket connection
        };
    }, []);

    useEffect(() => {
        if (isConnected) {
            stompClient.unsubscribe(`/topic/game/${gameDetails.id}`);
            stompClient.subscribe(`/topic/game/${gameDetails.id}`, onMessageReceived);
        }
    }, []);

    useEffect(() => {
        if (gameDetails !== null) {
            let count = 0;
            gameDetails.inGamePlayerDtoList.forEach((player) => {
                if (player.status === "Host" || player.status === "In Game") {
                    count++;
                }
            })

            if (count === 1) {
                setWaiting(true);
            } else {
                setWaiting(false);
            }
        }
    }, [gameDetails]);


    const connect = async () => {
        if (!stompClient || !isConnected) {
            const sock = new SockJS(SOCKET_URL);
            stompClient = over(sock);
            stompClient.debug = null;
            stompClient.connect({}, () => onConnected(), onError);
        }
    };

    const onConnected = () => {
        setIsConnected(true);
        stompClient.subscribe(`/topic/game/${gameDetails.id}`, onMessageReceived);
    };

    const disconnect = () => {
        if (stompClient && isConnected) {
            stompClient.send(
                "/app/game",
                {},
                JSON.stringify({
                    message: "LEFT THE GAME",
                    body: userDetails.playerId,
                    type: "LEFT",
                })
            );
            stompClient.disconnect(() => {
                setIsConnected(false);
                console.log("Disconnected from WebSocket");
            });
        }
    };

    const onMessageReceived = (payload) => {
        const payloadData = JSON.parse(payload.body);
        console.log("Received PLAYER STATUS:", payloadData.body);
        if (payloadData.type === "playerInGameStatus") {
            if (payloadData.message === "AskingGuessingStatus") {
                dispatch(gameActions.updatePlayerAskingGuessingStatus({
                    playerName: payloadData.body.playerName
                    , status: payloadData.body.status
                }));
            } else {
                dispatch(gameActions.updatePlayerStatus({
                    playerName: payloadData.body.playerName
                    , status: payloadData.body.status
                }));
            }
        } else if (payloadData.type === "movieNameUpdated") {
            let movieName = payloadData.body.askedMovieName;
            let timeStamp = payloadData.body.timeStamp;
            dispatch(gameActions.updateMovieName({movieName, timeStamp}));
        } else if (payloadData.type === "updateGame") {
            dispatch(gameActions.saveGameDetails(payloadData.body));
        } else if (payloadData.type === "movieNameDeclared") {
            toastInfo(payloadData.body);
        }else if (payloadData.type === "GameOver") {
            dispatch(gameActions.deleteGameDetails())
            setGameStart(false)
        }else if(payloadData.type === "hintUpdated") {
            dispatch(gameActions.updateHint({hint: payloadData.body}));
        }
    };

    const onError = (err) => {
        console.error("WebSocket connection error:", err);
    };

    const handleEndGame = async () => {
        console.log("Ending game");
        const response = await endGame({id: gameDetails.id});
        if (response.status) {
            setGameStart(false);
            dispatch(gameActions.deleteGameDetails());
        }
    };

    const handleQuitGame = () => {
        console.log("Quitting game");
        stompClient.send("/app/game", {}, JSON.stringify({message: "QUIT", type: "game"}));
    };

    const playerJoin = (username) => {

    };

    const reSendRequest = async (playerName) => {
        let data = {
            playerName,
            gameId: gameDetails.id.toString(),
        }
        const response = await reSendRequestToPlayer(data)
        if (response.status) {
            console.log("Resend request");
            dispatch(gameActions.updatePlayerStatus({
                playerName
                , status: "Requested"
            }));
        }
    }

    const changeStatusToAsking = (askingOrNot) => {
        let data = {
            playerName: userDetails.playerName,
            status: askingOrNot ? "asking..." : "will ask",
            gameId: gameDetails.id,
        }
        stompClient.send(
            "/app/game",
            {},
            JSON.stringify({message: "AskingGuessingStatus", body: data, type: "playerInGameStatus"})
        );
    }

    const askMovie = async (movieName) => {
        let askingAndGuessingDto = {
            askedMovieName: movieName,
            askerPlayerName: userDetails.playerName,
            id: gameDetails.id,
        }
        stompClient.send(
            "/app/game",
            {},
            JSON.stringify({message: "movieNameAsked", body: askingAndGuessingDto, type: "gameUpdate"})
        );
    }

    const guessMovie = async (movieName) => {
        let askingAndGuessingDto = {
            guessedWordOrLetter: movieName,
            guesserPlayerName: userDetails.playerName,
            id: gameDetails.id,
        }
        stompClient.send(
            "/app/game",
            {},
            JSON.stringify({message: "guessUpdated", body: askingAndGuessingDto, type: "gameUpdate"})
        );
    }

    const giveHint=async (hint) => {
        let gameDto = {
            hint:hint,
            id:gameDetails.id,
        }
        stompClient.send(
            "/app/game",
            {},
            JSON.stringify({message: "hintPassed", body: gameDto, type: "hintUpdated"})
        );
    }

    const changeStatusToGuessing = (askingOrNot) => {
        let data = {
            playerName: userDetails.playerName,
            status: askingOrNot ? "guessing..." : "will guess",
            gameId: gameDetails.id,
        }
        stompClient.send(
            "/app/game",
            {},
            JSON.stringify({message: "AskingGuessingStatus", body: data, type: "playerInGameStatus"})
        );
    }

    const completeThisRound = () => {
        if (gameDetails.roundTimeOut !== null && gameDetails.movieName !== null) {
            let data = {
                id: gameDetails.id,
            }
            stompClient.send(
                "/app/game",
                {},
                JSON.stringify({message: "CompleteThisRound", body: data, type: "gameUpdate"})
            );
        }
    }

    const toastInfo = (message) =>
        toast.info(`Movie name was "${message}"`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "light",
            transition: Bounce,
        });

    return (
        <div className="row" >
            <div className="col-md-8" >
                <div className="row" >
                    <div className="col-12 ">
                        <div className="card pt-3 border-0 border-bottom" >
                            <p className="text-start fs-4 mb-0">
                                Game ID: {gameDetails.id}
                            </p>
                            <p>
                                Created by:{" "}
                                <span>
                      {gameDetails.hostPlayerName === userDetails.playerName
                          ? "YOU"
                          : gameDetails.hostPlayerName}
                    </span>
                            </p>
                            <div className={`fs-3`} style={{
                                position: "absolute",
                                top: "10px",
                                right: "0px",
                                color: "red",
                                cursor: "pointer"
                            }} onClick={() => {
                                handleEndGame();
                            }}><IoExitOutline/></div>
                        </div>
                    </div>
                </div>
                {waiting ? (<div
                        className="d-flex flex-column justify-content-center align-items-center"
                        style={{height: "calc(100vh - 200px)"}} // Ensures this part takes up the remaining space
                    >
                        <p className="text-center fw-bold">
                            Waiting for other players
                            <span className="d-block">Or</span>
                            <span className="d-block">Leave the Game</span>
                        </p>
                        <span
                            className="fs-3"
                            style={{
                                color: "red",
                                cursor: "pointer",
                            }}
                            onClick={handleEndGame}
                        >
        <IoExitOutline/>
    </span>
                    </div>
                ) : (<div className="card border-0">
                    <div className="d-flex justify-content-center align-items-center "
                         style={{marginTop: "6rem", marginBottom: "0rem"}}>
                        <Timer timeStamp={gameDetails.roundTimeOut} completeThisRound={completeThisRound}></Timer>
                        {/*<AudioComponent id={gameDetails.id}></AudioComponent>*/}
                        <p className={`${styles.responsiveText} mb-3 mt-5`}>
                            {bollywoodWord.map((ch, index) =>
                                index < (9 - gameDetails.chanceLeft) ? (
                                    <CutCharacter key={index} ch={ch} guess={gameDetails.previousGuesses[index]}/>
                                ) : (
                                    <UnCutCharacter key={index} ch={ch}/>
                                )
                            )}
                        </p>
                        <HintArea hint={gameDetails.hint} ></HintArea>
                    </div>
                    <MovieName movieName={gameDetails.movieName}
                               currentChancePlayerName={gameDetails.currentChancePlayerName === userDetails.playerName ? "You" : gameDetails.currentChancePlayerName}
                               uniqueAlphabets={gameDetails.uniqueAlphabets}></MovieName>
                    {gameDetails.currentChancePlayerName !== userDetails.playerName ? (
                        <GuessingInput changeStatusToGuessing={changeStatusToGuessing} guessMovie={guessMovie}
                                       show={gameDetails.movieName !== null} actualMovieName={gameDetails.movieName}
                                       previousGuesses={gameDetails.previousGuesses}></GuessingInput>) : (
                        <AskingInput changeStatusToAsking={changeStatusToAsking} askMovie={askMovie}
                                     show={gameDetails.movieName == null} giveHint={giveHint} hint={gameDetails.hint}></AskingInput>)}
                </div>)}
            </div>
            <div className="col-md-4 border-start">
                <div className="card border-0 " style={{height: "91vh"}}>
                    <p className="fs-1 pb-4 pt-2 border-bottom">Players</p>
                    {gameDetails.inGamePlayerDtoList.map((player, index) => (
                        <PlayerCard reSendRequest={reSendRequest} key={index} player={player}
                                    isThisU={userDetails.playerName === player.playerName}
                                    movieDeclared={gameDetails.movieName !== null}
                                    isChance={player.playerName === gameDetails.currentChancePlayerName}/>
                    ))}
                </div>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition:Bounce
            />
        </div>
    );
};


export default GameStarted;
