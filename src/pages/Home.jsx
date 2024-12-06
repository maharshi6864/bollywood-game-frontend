import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import GameStarted from "../components/homePage/GameStarted.jsx";
import StartGame from "../components/homePage/StartGame.jsx";
import NavBar from "../components/NavBar.jsx";
import {getGameDetails} from "../apis/game.js";
import {gameActions} from "../store/gameStore.js";
import JoinGameRequest from "../components/homePage/JoinGameRequest.jsx";

const Home = () => {

    const [loading, setLoading] = useState(false); // Set loading to true initially
    const [gamestart, setGameStart] = useState(false);
    const userDetails = useSelector((store) => store.userDetails);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchGameDetails = async () => {
            try {
                let response = await getGameDetails();
                if (response.status) {
                    dispatch(gameActions.saveGame(response.object));
                    setGameStart(true);
                    setLoading(false);
                }
            } catch (error) {
                console.log(error);
            }
        }

        if (userDetails.inAGame==="INAGAME") {
            setLoading(true);
            fetchGameDetails();
        }else if( userDetails.inAGame==="REQUESTED"){
            setGameStart(true);
        }
    }, [userDetails])

    return loading ? (
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
                    {gamestart ? <GameStarted setGameStart={setGameStart}/> :
                        <StartGame setGameStart={setGameStart}/>}
                </div>
            </div>

        </div>
    );
};

export default Home;
