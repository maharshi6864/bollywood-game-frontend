import { useEffect, useState } from "react";

const CountDown = ({ expirationTime, loading }) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(expirationTime));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(expirationTime));
    }, 900);

    return () => clearInterval(timer);
  }, [expirationTime]);

  function calculateTimeLeft(expirationTime) {
    const expirationDate = new Date(expirationTime);
    const difference = expirationDate - new Date();

    return Math.max(0, difference); // Return 0 if the time has passed
  }

  const minutes = Math.floor(timeLeft / 1000 / 60);
  const seconds = Math.floor((timeLeft / 1000) % 60);
  const timerClass = timeLeft <= 10000 ? "text-danger" : "text-primary";

  return (
    <div>
      {Number.isNaN(timeLeft) || loading ? (
        <>
          <span>
            <div
              className="spinner-border"
              style={{
                height: "10px",
                width: "10px",
                borderRadius: "50%",
                border: "1px solid black",
                borderRight: "0px",
                borderBottom: "0px",
              }}
              role="status"
            >
              <span className="visually-hidden">Loading...</span>
            </div>
          </span>{" "}
        </>
      ) : timeLeft === 0 ? (
        <>Otp has expired.</>
      ) : (
        <>
          Otp will expire in{" "}
          <span className={timerClass}>
            {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
          </span>{" "}
          min.
        </>
      )}
    </div>
  );
};

export default CountDown;
