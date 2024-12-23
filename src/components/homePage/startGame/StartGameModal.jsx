import  {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {useSelector} from "react-redux";
import styles from "../../../css/FirendsProfileCard.module.css";
import {useNavigate} from "react-router-dom";
import {startGame} from "../../../apis/game.js"; // Ensure correct path

function StartGameModal(props) {
    const { friendsList } = useSelector(state => state.friendsStore);
    const [selectedFriends, setSelectedFriends] = useState([]);
    const navigate = useNavigate();
    const { userDetails } = useSelector(state => state.userStore);

    // eslint-disable-next-line no-unused-vars
    const { handleGameStarted,setHomeLoading, ...modalProps } = props; // Filter out handleStartingGame

    const onlineFriends = friendsList.filter(friend => friend.status === "Online");

    const handleCardClick = (friend) => {
        setSelectedFriends((prevSelected) => {
            if (prevSelected.includes(friend)) {
                return prevSelected.filter((f) => f !== friend);
            } else {
                return [...prevSelected, friend];
            }
        });
    };

    const handleStartGame = async () => {
        if (selectedFriends.length > 0) {
        props.onHide();
        setHomeLoading(true);
            const data = {
                hostPlayerId: userDetails.playerId,
                hostPlayerName: userDetails.playerName,
                friendsDtoList: selectedFriends,
            };
            try {
                const response = await startGame(data);
                if (response.status) {
                    props.handleGameStarted(response.object); // Call the passed prop function
                }
            } catch (error) {
                console.error(error);
            }
        }

    };

    const handleRedirectToFriends = () => {
        navigate("Friends");
    };

    return (
        <Modal
            {...modalProps} // Pass only valid props
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">Start Game</Modal.Title>
            </Modal.Header>
            <Modal.Body className="d-flex flex-column justify-content-center align-items-center">
                {friendsList.length === 0 ? (
                    <div className="text-center">
                        <h5>Let's make friends</h5>
                        <Button variant="primary" onClick={handleRedirectToFriends}>
                            Go to Friends
                        </Button>
                    </div>
                ) : onlineFriends.length === 0 ? (
                    <div className="text-center">
                        <h5>No friends online</h5>
                    </div>
                ) : (
                    <div className="row">
                        {onlineFriends.map((friend) => (
                            <div key={friend.id} className="col-12 mb-3">
                                <div
                                    className={`card ${selectedFriends.includes(friend) ? "border-primary shadow-lg" : ""}`}
                                    onClick={() => handleCardClick(friend)}
                                    style={{ cursor: "pointer" }}
                                >
                                    <span
                                        className={`badge ${friend.status === "Offline" ? "bg-danger" : "bg-success"} ${styles.statusBadge}`}
                                    >
                                        {!Number.isNaN(friend.status) ? friend.status : "In Game"}
                                    </span>
                                    <div className="card-body">
                                        <div className="row align-items-center">
                                            <div className="col-3 text-center">
                                                <img
                                                    src="https://bootdey.com/img/Content/avatar/avatar1.png"
                                                    alt="Avatar"
                                                    className={`${styles.imgCircle} img-fluid`}
                                                />
                                            </div>
                                            <div className="col-6">
                                                <div className="fs-5 fw-bold">{friend.friendName}</div>
                                                <div>Matches Played Together: {friend.matchesPlayedTogether}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </Modal.Body>
            <Modal.Footer className="d-flex justify-content-center">
                <Button onClick={props.onHide}>Close</Button>
                <Button
                    variant="primary"
                    onClick={handleStartGame}
                    disabled={selectedFriends.length === 0}
                >
                    Start Game
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default StartGameModal;
