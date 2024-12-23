import { useRef } from "react";

const AskingInput = ({ changeStatusToAsking, show,askMovie }) => {
    const movieNameRef = useRef(null);

    const handleAskMovie = () => {
        const movieName = movieNameRef.current.value;
        askMovie(movieName.toLowerCase());
    };

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
    ) : (
        <div><span className={`text-center`}>Already Asked..</span></div>
    );
};

export default AskingInput;
