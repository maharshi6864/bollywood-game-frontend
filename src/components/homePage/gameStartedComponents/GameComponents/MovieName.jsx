import "../../../../css/movieNameComponent.css"
import userStore from "../../../../store/userStore.js";
import {useEffect} from "react";
const MovieName = ({ movieName, currentChancePlayerName }) => {

    return (
        <div
            className="d-flex justify-content-center align-items-center"
            style={{ marginBottom: "12rem", marginTop: "2rem" }}
        >
            <p className="fs-1">
                {movieName === null ? (
                    <span className="typing-text">
                        Waiting for <b>{currentChancePlayerName}</b> to ask....
                    </span>
                ) : (
                    movieName
                )}
            </p>
        </div>
    );
};

export default MovieName;
