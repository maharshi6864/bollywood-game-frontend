import {useRef, useState} from "react";
import movieName from "./MovieName.jsx";
import {getHintFromAi} from "../../../../apis/game.js";
import {BsStars} from "react-icons/bs";

const AskingInput = ({changeStatusToAsking, show, askMovie, hint,giveHint}) => {
    const movieNameRef = useRef(null);
    const hintRef = useRef(hint);
    const [askingAiLoadingStatus, setAskingAiLoadingStatus] = useState(false);
    const [movieName, setMovieName] = useState("");

    const handleAskMovie = () => {
        const movieName = movieNameRef.current.value;
        askMovie(movieName.toLowerCase());
        setMovieName(movieName);
        console.log(hintRef.current.value);
        movieNameRef.current.value = ""
    };

    const handleGiveHint = () => {
        giveHint(hintRef.current.value);
    }

    const handleHintFromAi = async () => {
        setAskingAiLoadingStatus(true);
        const response = await getHintFromAi({actualMovieName: movieName});
        if (response) {
            setAskingAiLoadingStatus(false);
            hintRef.current.value = response.object;
        }
    }

    return show ? (
        <div className="input-group">
            <input
                type="text"
                className="form-control"
                placeholder="Ask Movie."
                ref={movieNameRef}
                onFocus={() => {
                    changeStatusToAsking(true);
                }}
                onBlur={() => {
                    changeStatusToAsking(false);
                }}
            />
            <button className="btn btn-primary" type="button" onClick={handleAskMovie}>
                Ask Movie
            </button>
        </div>
    ) : (hint===null?(

        <div className="input-group">
            <textarea
                type="text"
                className="form-control"
                placeholder="Give Hint."
                style={{height:20}}
                ref={hintRef}
            />
            <button
                className="btn btn-primary"
                type="button"
                onClick={handleHintFromAi}
            >
                {askingAiLoadingStatus ? (
                    <div className="spinner-border spinner-grow-sm border-2"  role="status">
                        <span className="visually-hidden" >Loading...</span>
                    </div>
                ) : (
                    <>
                        Generate Hint <span style={{color: "yellow"}}><BsStars/></span>
                    </>
                )}
            </button>
            <button
                className="btn btn-primary "
                type="button"
                onClick={handleGiveHint}
            >
                Give Hint
            </button>
        </div>

    ):(<div></div>))
        ;
};

export default AskingInput;
