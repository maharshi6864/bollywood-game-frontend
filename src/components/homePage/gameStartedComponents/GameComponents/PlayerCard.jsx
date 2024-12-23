import "../../../../css/playerCard.css";

const PlayerCard = ({player, isThisU, isChance, reSendRequest, movieDeclared}) => {
    const handleReSendRequest = async () => {
        reSendRequest(player.playerName);
    };
    const getPlayerStatusBadge = (status) => {
        switch (status) {
            case "Host":
            case "In Game":
                return "bg-success";
            case "Requested":
                return "bg-warning";
            case "Left":
            case "Denied":
                return "bg-danger";
            default:
                return "bg-secondary";
        }
    };

    const getAskingGuessingStatusBadge = (status) => {
        if (isChance) {
            switch (status) {
                case undefined:
                    if (movieDeclared) {
                        return {text: "asked", badgeClass: "bg-success"};
                    }
                    return {text: "will ask", badgeClass: "bg-info"};
                case "will ask":
                    return {text: "will ask", badgeClass: "bg-info"};
                case "asking...":
                    return {text: "asking...", badgeClass: "bg-warning text-dark"};
                case "asked":
                    if (movieDeclared) {
                        return {text: "asked", badgeClass: "bg-success"};
                    }
                    return {text: "asked", badgeClass: "bg-success"};
                default:
                    return null;
            }
        } else {
            switch (status) {
                case undefined:
                    if (movieDeclared && (player.status==="In Game"||player.status==="Host")) {
                        return {text: "will guess", badgeClass: "bg-info"};
                    }
                    return null;
                case "will guess":
                    return {text: "will guess", badgeClass: "bg-info"};
                case "guessing...":
                    return {text: "guessing...", badgeClass: "bg-warning"};
                default:
                    return null;
            }
        }
    };

    const askingGuessingStatus = getAskingGuessingStatusBadge(player.askingGuessingStatus);

    return (
        <div className="col-12 mb-3">
            <div className="card">
                {/* Player Status Badge */}
                <span
                    className={`badge ${getPlayerStatusBadge(player.status)}`}
                    style={{
                        position: "absolute",
                        top: "10px",
                        right: "10px",
                    }}
                >
                    {player.status}
                </span>

                {/* Card Body */}
                <div className="card-body">
                    <div className="row align-items-center">
                        <div className="col-3 text-center">
                            <img
                                src="https://bootdey.com/img/Content/avatar/avatar1.png"
                                alt="Avatar"
                                className="rounded-circle img-fluid"
                                style={{maxWidth: "60px"}}
                            />
                        </div>
                        <div className="col-6">
                            <div className="fs-5 fw-bold">
                                {player.playerName}
                                {isThisU && " (You)"}
                            </div>
                            <div>Points: {player.gamePoints}</div>
                        </div>
                    </div>
                </div>

                {/* Asking/Guessing Status Badge */}
                {askingGuessingStatus && (
                    <span
                        className={`badge ${askingGuessingStatus.badgeClass}`}
                        style={{
                            position: "absolute",
                            bottom: "10px",
                            right: "10px",
                        }}
                    >
                        {askingGuessingStatus.text.includes("...") ? (
                            <span className="animated-text">{askingGuessingStatus.text}</span>
                        ) : (
                            askingGuessingStatus.text
                        )}
                    </span>
                )}

                {/* Re-send Request */}
                {(player.status === "Denied") && (
                    <span
                        style={{
                            position: "absolute",
                            bottom: "2px",
                            right: "5px",
                            cursor: "pointer",
                            fontSize: "0.75rem",
                        }}
                        className="text-primary"
                        onClick={handleReSendRequest}
                    >
                        Re-send Request
                    </span>
                )}

                {/* Spinner for Requested */}
                {player.status === "Requested" && (
                    <div
                        style={{
                            position: "absolute",
                            bottom: "7px",
                            right: "7px",
                            width: "1rem",
                            height: "1rem",
                        }}
                        className="spinner-border"
                        role="status"
                    >
                        <span className="visually-hidden">Loading...</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PlayerCard;
