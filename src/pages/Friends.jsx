import { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import { fetchFriends } from "../apis/friends";
import Example from "../components/friendsPage/AddFriendModel.jsx";
import FriendsProfileCard from "../components/friendsPage/FriendsProfileCard.jsx";
import { useDispatch, useSelector } from "react-redux";
import { friendsActions } from "../store/friendsStore.js";
import { Spinner } from "react-bootstrap";

const Friends = () => {
    const [show, setShow] = useState(false);
    const [pageLoading, setPageLoading] = useState(true);

    const dispatch = useDispatch();
    const { friendsList } = useSelector((store) => store.friendsStore);

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    useEffect(() => {
        const fetchFriendsList = async () => {
            const response = await fetchFriends();
            if (response.status) {
                dispatch(friendsActions.saveFriends({ friendsList: response.object }));
                setPageLoading(false);
            }
        };
        fetchFriendsList();
    }, [dispatch]);

    return (
        <>
            <NavBar />
            <div className="main" style={{ height: "calc(100% - 62.5px)" }}>
                <div className="card-header border-bottom p-3">
                    <div className="card-title">
                        <div className="d-flex justify-content-between align-items-center">
                            <h1>Friends</h1>
                            <button className="btn btn-primary" onClick={handleShow}>
                                Add +
                            </button>
                        </div>
                    </div>
                </div>
                <div className="container-fluid mt-4" style={{ boxSizing: "border-box", height: "82%" }}>
                    {pageLoading ? (
                        <div className="w-100 d-flex justify-content-center align-items-center" style={{ height: "90%" }}>
                            <h2 className="fs-3">
                                <Spinner animation="border" variant="primary" />
                            </h2>
                        </div>
                    ) : friendsList.length !== 0 ? (
                        <div className="row gx-3">
                            {friendsList.map((friend, index) => (
                                <FriendsProfileCard friend={friend} key={index} />
                            ))}
                        </div>
                    ) : (
                        <div className="w-100 d-flex justify-content-center align-items-center" style={{ height: "90%" }}>
                            <h2 className="fs-3">No Friends Yet</h2>
                        </div>
                    )}
                </div>
            </div>
            <Example show={show} handleClose={handleClose} />
        </>
    );
};

export default Friends;
