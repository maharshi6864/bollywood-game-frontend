import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loadUser } from "../apis/home";
import GameStarted from "../components/homePage/GameStarted.jsx";
import StartGame from "../components/homePage/StartGame.jsx";
import NavBar from "../components/NavBar.jsx";
import {fetchUserDetails} from "../apis/user.js";

const Home = () => {
    const dispatch = useDispatch();
    const { username } = useSelector((store) => store.userDetails);

    const [loading, setLoading] = useState(false); // Set loading to true initially
    const [gamestart, setGameStart] = useState(false);



    return loading ? (
        <div>
            <div className="h-100 w-100 d-flex align-items-center justify-content-center">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        </div>
    ) : (
        <div className='h-100'>
            <NavBar />
            <div className="container-fluid" style={{ height: "calc(100% - 62.5px)" }}>
                <div className="main h-100">
                    {gamestart ? <GameStarted /> : <StartGame setGameStart={setGameStart} />}
                </div>
            </div>
        </div>
    );
};

export default Home;
