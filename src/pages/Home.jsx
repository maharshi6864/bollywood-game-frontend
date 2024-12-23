import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import GameStarted from "../components/homePage/gameStartedComponents/GameStarted.jsx";
import StartGame from "../components/homePage/startGame/StartGame.jsx";
import NavBar from "../components/NavBar.jsx";
import {getGameDetails} from "../apis/game.js";
import {gameActions} from "../store/gameStore.js";

const Home = () => {

    const [homeLoading, setHomeLoading] = useState(false); // Set loading to true initially
    const [gameStart, setGameStart] = useState(false);
    const {userDetails} = useSelector((store) => store.userStore);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchGameDetails = async () => {
            try {
                let response = await getGameDetails();
                    console.log(response);
                if (response.status) {
                    dispatch(gameActions.saveGameDetails(response.object));
                    setGameStart(true);
                    setHomeLoading(false);
                }
            } catch (error) {
                console.log(error);
            }
        }
        if (userDetails != null) {
            if (userDetails.inAGame === "INAGAME") {
                setHomeLoading(true);
                fetchGameDetails();
            } else if (userDetails.inAGame === "REQUESTED") {
                setGameStart(true);
            }
        }
    }, [userDetails])

    return homeLoading ? (
        <div className="h-100 w-100 d-flex align-items-center justify-content-center">
            <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    ) : (
        <div className='h-100'>
            <NavBar/>
            <div className="container-fluid" style={{height: "calc(100% - 62.5px)"}}>
                <div className="main h-100">
                    {gameStart ? <GameStarted setGameStart={setGameStart} setHomeLoading={setHomeLoading}/> :
                        <StartGame setGameStart={setGameStart} setHomeLoading={setHomeLoading}/>}
                </div>
            </div>

        </div>
    );
};

export default Home;
