import React, { useState, useEffect } from "react";
import styles from "../../css/App.module.css";

const StartGame = () => {
    const [text, setText] = useState("");
    const description = `BoOLLYWOOD is a fun and nostalgic guessing game inspired by a classic we used to play during college lectures. Players guess Bollywood movie names with only vowels visible while the rest remain hidden. Enjoy testing your Bollywood knowledge and have fun guessing!`;

    useEffect(() => {
        let index = 0;
        const interval = setInterval(() => {
            setText((prev) => prev + description[index]);
            index++;
            if (index === description.length-1) {
                clearInterval(interval);
            }
        }, 25); // Adjust the typing speed here (50ms per character)

        return () => clearInterval(interval);
    }, [description]);

    return (
        <div className="d-flex justify-content-center align-items-center h-100">
            <div className="d-flex flex-column align-items-center w-75">
                {/* Description with typing animation */}
                <div className={`${styles.typewriter} mb-3`}>
                    <h1 style={{fontSize:"6vw"}}> B O L L Y W O O D </h1>
                </div>
                <div className={`${styles.typewriter} mb-3`} style={{height:"10%"}}>
                    <p className={'fs-5 text-center'}>{text}</p>
                </div>
                <button className="btn btn-primary mb-2 fs-4">Start Game</button>
                <hr className="w-50"/>
                <button className="btn btn-primary mb-2 fs-4">Join Game</button>
            </div>
        </div>
    );
};

export default StartGame;
