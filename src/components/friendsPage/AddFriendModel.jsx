import {useState} from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import {searchPlayer,  savefriend} from "../../apis/friends.js";
import {Spinner} from "react-bootstrap";
import {useDispatch} from "react-redux";
import {friendsActions} from "../../store/friendsStore.js";

function Example({show, handleClose}) {
    const [searchQuery, setSearchQuery] = useState([]);
    const [searchResults, setSearchResults] = useState(false);
    const [isSearching, setIsSearching] = useState(false);
    const [justOpened,setJustOpened] = useState(true);

    const dispatch = useDispatch();

    const handleSearch = async () => {
        if (searchQuery.trim() === "") return; // Avoid searching if the input is empty
        setIsSearching(true); // Indicate search is in progress
        try {
            const response = await searchPlayer(searchQuery);
            setSearchResults(response.object || []);
            setIsSearching(false);
        } catch (error) {
            setSearchResults([]); // Clear results if there's an error
            setIsSearching(false); // Reset searching state even on error
        }
        if (searchQuery==="")
        {
            setJustOpened(true);
        }else{
            setJustOpened(false);
        }
    };

    const addFriend = async ({playerId,playerName,matchesPlayed,matchesWon}) => {
        try {
            const response = await savefriend(playerId);
            if (response.status) { // Check if the addition was successful
                setSearchResults((prevResults) =>
                    prevResults.map((player) =>
                        player.id === playerId ? { ...player, friend: true } : player
                    )
                );

                dispatch(friendsActions.addFriend   ({id:response.object.id,friendName:playerName,matchesPlayed,matchesWon}));
            }
        } catch (error) {
            console.error("Error adding friend:", error);
        }
    };

    const handlingModelClose=()=>{
        handleClose();
        setJustOpened(true);
        setIsSearching(false);
        setSearchQuery("");
        setSearchResults([]);
    }

    return (
        <Modal show={show} onHide={handleClose} centered={true}>
            <Modal.Header closeButton>
                <Modal.Title>Search for Friends</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form className="w-100">
                    <div className="d-flex align-items-center">
                        <Form.Group controlId="search" className="flex-grow-1 me-2">
                            <Form.Control
                                type="text"
                                placeholder="Enter name or username"
                                value={searchQuery}
                                style={{width: "100%"}} // Search bar width
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onKeyUp={handleSearch}
                            />
                        </Form.Group>
                        <Button
                            variant="primary"
                            style={{width: "20%"}} // Button width
                            onClick={handleSearch}
                            disabled={isSearching}
                        >
                            {isSearching ? "Searching..." : "Search"}
                        </Button>
                    </div>
                </Form>
                <div className="mt-3">
                    {searchResults.length > 0 ? (
                        searchResults.map((result, index) => (
                            <div
                                key={index}
                                className="border p-2 mb-2 d-flex align-items-center"
                            >
                                <img
                                    src="https://bootdey.com/img/Content/avatar/avatar1.png" // Replace with actual image URL or a placeholder
                                    alt={`${result.playerName}'s profile`}
                                    className="rounded-circle me-3"
                                    style={{width: "50px", height: "50px", objectFit: "cover"}}
                                />
                                <div className="flex-grow-1">
                                    <div><span className={'fs-5'}>{result.playerName}</span></div>
                                    <div>
                                        <span className={'fs-6'}>W/L Ratio:{" "}
                                            {result.matchesPlayed > 0
                                                ? (result.matchesWon / result.matchesPlayed).toFixed(1)
                                                : "0"}</span>
                                    </div>
                                </div>
                                {!result.friend ? (
                                    <Button
                                        variant="success"
                                        size="sm"
                                        onClick={() => addFriend({playerId:result.id,playerName:result.playerName,matchesPlayed:result.matchesPlayed,matchesWon:result.matchesWon})}
                                    >
                                        + add
                                    </Button>
                                ) : (
                                    <p className="text-success fs-6 mb-0">added</p>
                                )}
                            </div>
                        ))
                    ) : (
                        <p className="mt-5 mb-5 text-center">{isSearching ? (<Spinner animation="border" variant="primary" />) : justOpened?"Search for a friend":"No Results found for \""+searchQuery+"\""}</p>
                    )}
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handlingModelClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default Example;
