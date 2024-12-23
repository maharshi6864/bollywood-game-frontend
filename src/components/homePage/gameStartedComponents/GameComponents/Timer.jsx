import { useEffect, useState } from "react";
import "../../../../css/timer.css";

const Timer = ({ timeStamp, completeThisRound }) => {
    const [timeLeft, setTimeLeft] = useState("");
    const [isOneMinuteLeft, setIsOneMinuteLeft] = useState(false); // For pulsing effect

    useEffect(() => {
        // Convert the given timestamp from milliseconds to seconds
        const targetTime = Math.floor(timeStamp / 1000);

        const updateTimer = () => {
            const currentTimeInSeconds = Math.floor(Date.now() / 1000); // Current time in seconds
            const timeRemaining = targetTime - currentTimeInSeconds;

            if (timeRemaining > 0) {
                const minutes = Math.floor(timeRemaining / 60);
                const seconds = timeRemaining % 60;

                setTimeLeft(
                    `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
                );

                // Check if 1 minute or less is left
                setIsOneMinuteLeft(timeRemaining <= 60);
            } else {
                setTimeLeft("00:00");
                completeThisRound(); // Trigger the round completion function
                clearInterval(timerId); // Stop the interval
            }
        };

        // Set up interval to update timer every second
        const timerId = setInterval(updateTimer, 1000);
        updateTimer(); // Update immediately without waiting for 1-second delay

        return () => clearInterval(timerId); // Cleanup interval on unmount
    }, [timeStamp, completeThisRound]);

    if (timeLeft === "00:00") {
        return null; // Do not render anything when timeLeft is "00:00"
    }

    return (
        <span
            style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                fontWeight: "bold",
                color: isOneMinuteLeft ? "red" : "black", // Change text color to red if 1 min left
                animation: isOneMinuteLeft ? "pulse 1s infinite" : "none", // Add pulse animation
            }}
        >
            Time Left: {timeLeft}
        </span>
    );
};

export default Timer;
