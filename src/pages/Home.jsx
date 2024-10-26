import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styles from "../css/App.module.css";
import { loadUser } from "../apis/home";
import NavBar from "../components/NavBar";
import GameStarted from "../components/GameStarted";
import StartGame from "../components/StartGame";
import NewNavBar from "../components/NewNavBar";

const Home = () => {
  const dispatch = useDispatch();
  const { username } = useSelector((store) => store.userDetails);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [gamestart, setGameStart] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await loadUser();
        if (response.status) {
          // console.log(response);
          setLoading(false);
        }
      } catch (error) {
        navigate("/login");
      }
    };
    fetchUser();
  }, []);
  return loading ? (
    <div>
      <div className="h-100 w-100 d-flex align-items-center justify-content-center">
        <div
          className="spinner-border justify-content-center align-item-center"
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>
  ) : (
    <>
      <NewNavBar></NewNavBar>
      <div className="container-fluid">
        <div className="main">
          {gamestart ? <GameStarted></GameStarted> : <StartGame></StartGame>}
        </div>
      </div>
    </>
  );
};

export default Home;
