import {useState, useEffect} from "react";
import styles from "../../../css/App.module.css";
import StartGameModal from "./StartGameModal.jsx";
import {fetchFriends} from "../../../apis/friends.js";
import {useDispatch, useSelector} from "react-redux";
import {friendsActions} from "../../../store/friendsStore.js";
import JoinGameRequest from "./JoinGameRequest.jsx";
import {gameActions} from "../../../store/gameStore.js";
import {gameRequestReply} from "../../../apis/game.js";

const StartGame = ({setGameStart, setHomeLoading}) => {
    const [text, setText] = useState("");
    const description = ` This Game is a fun and nostalgic guessing game inspired by a classic we used to play during college lectures. Players guess Bollywood movie names with only vowels visible while the rest remain hidden. Enjoy testing your Bollywood knowledge and have fun guessing!`;
    const [startGameModalShow, setStartGameModalShow] = useState(false);
    const [joinModelShow, setJoinModelShow] = useState(false);
    const {friendsList} = useSelector(state => state.friendsStore);
    const {gameDetails} = useSelector(state => state.gameStore);
    const {userDetails} = useSelector(state => state.userStore);
    const [currentGameDetails, setCurrentGameDetails] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        let index = -1;
        const interval = setInterval(() => {
            setText((prev) => prev + description[index]);
            index++;
            if (index === description.length - 1) {
                clearInterval(interval);
            }
        }, 25); // Adjust the typing speed here

        return () => clearInterval(interval);
    }, [description]);

    useEffect(() => {
        const getFriends = async () => {
            if (friendsList.length === 0) {
                const response = await fetchFriends();
                if (response.status) {
                    dispatch(friendsActions.saveFriends({friendsList: response.object}));
                }
            }
        };

        getFriends();
    }, []);

    // If the user receives any game from another user than this will change the state of the joining status!
    useEffect(() => {
        if (gameDetails != null) {
            console.log("Game Details : ", gameDetails);
            setJoinModelShow(true);
            setCurrentGameDetails(gameDetails); // Update state
        }
    }, [gameDetails]);

    const handleGameStarted = async (gameDetails) => {
        try {
            setHomeLoading(false);
            setGameStart(true);
            dispatch(gameActions.saveGameDetails(gameDetails));
        } catch (err) {
            console.log(err);
        }
    }

    const handleAnswer = async (answer) => {
        if (answer) {
            let data = {
                playerName: userDetails.playerName,
                status: "Accepted",
                gameId: currentGameDetails.id,
            }
            const response = await gameRequestReply(data);
            if (response.status) {
                setGameStart(true);
            }
        } else {
            console.log("Reject")
            let data = {
                playerName: userDetails.playerName,
                status: "Denied",
                gameId: currentGameDetails.id,
            }
            const response = await gameRequestReply(data);
            if (response.status) {
                setJoinModelShow(false);
            }
        }
    }
    return (
        <>
            <div className="d-flex justify-content-center align-items-center h-100">
                <div className="d-flex flex-column align-items-center w-75">
                    <div className={`${styles.typewriter} mb-3`}>
                        <h1 style={{fontSize: "6vw"}}> B O L L Y W O O D </h1>
                    </div>
                    <div
                        className={`${styles.typewriter} mb-3`}
                        style={{height: "10%"}}
                    >
                        <p className="fs-5 text-center"
                           dangerouslySetInnerHTML={{ __html: text }}
                        ></p>
                    </div>
                    <button
                        className="btn btn-primary mb-2 fs-4"
                        onClick={() => setStartGameModalShow(true)}
                    >
                        Start Game
                    </button>
                    <hr className="w-50"/>
                    <button className="btn btn-primary mb-2 fs-4">Join Game</button>
                </div>
            </div>
            <StartGameModal
                show={startGameModalShow}
                handleGameStarted={handleGameStarted}
                setHomeLoading={setHomeLoading}
                onHide={() => setStartGameModalShow(false)}
            />
            <JoinGameRequest handleAnswer={handleAnswer} joinModelShow={joinModelShow}
                             hostName={currentGameDetails?.hostPlayerName || "Unknown"}
                             setJoinModelShow={setJoinModelShow}></JoinGameRequest>
        </>
    );
};

export default StartGame;
