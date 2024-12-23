import {useRef, useState} from "react";

const GuessingInput = ({changeStatusToGuessing, show, guessMovie, actualMovieName, previousGuesses}) => {
    const movieNameRef = useRef(null);
    const [error, setError] = useState(null);
    const [errorStyle, setErrorStyle] = useState(null);

    const handleGuessMovie = () => {
        const movieName = movieNameRef.current.value.trim(); // Trim whitespace

        if (!movieName) {
            setError("Input cannot be empty.");
            setErrorStyle("is-invalid");
            return;
        }

        if (movieName.length > 1) {
            // Check if full movie name length matches
            if (actualMovieName.length !== movieName.length) {
                setError("Guess either a letter or the full movie name.");
                setErrorStyle("is-invalid");
                return;
            }

            // Check if movie name was already guessed
            if (previousGuesses.includes(movieName)) {
                setError("The movie name is already guessed.");
                setErrorStyle("is-invalid");
                return;
            }

            // Valid guess
            guessMovie(movieName);
            setError(null);
            setErrorStyle(null);
            movieNameRef.current.value = "";
        } else {
            // Single letter guess
            const vowels = ["a", "e", "i", "o", "u", "A", "E", "I", "O", "U"];

            if (vowels.includes(movieName)) {
                setError("Vowels are already written.");
                setErrorStyle("is-invalid");
                return;
            }

            if (previousGuesses.includes(movieName)||actualMovieName.includes(movieName)) {
                setError("This letter is already guessed.");
                setErrorStyle("is-invalid");
                return;
            }

            // Valid letter guess
            guessMovie(movieName.toLowerCase());
            setError(null);
            setErrorStyle(null);
            movieNameRef.current.value = "";
        }
    };

    return show ? (
        <>
            <div className="input-group">
                <input
                    type="text"
                    className={`form-control ${errorStyle}`}
                    placeholder="Type a letter or the movie name."
                    onFocus={() => changeStatusToGuessing(true)}
                    onBlur={() => changeStatusToGuessing(false)}
                    ref={movieNameRef}
                />
                <button className="btn btn-primary" type="button" onClick={handleGuessMovie}>
                    Guess Movie
                </button>
            </div>
            {error && <span className="mx-1 text-danger">{error}</span>}
        </>
    ) : (
        <div></div>
    );
};

export default GuessingInput;
