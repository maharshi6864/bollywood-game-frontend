import { useState, useEffect } from "react";
import NewNavBar from "../components/NewNavBar";
import styles from "../css/App.module.css";
import { fetchFriends } from "../apis/friends";
import Example from "../components/AddFriendModel";
import FriendsProfileCard from "../components/FriendsProfileCard";

const Friends = () => {
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  useEffect(() => {
    const fetchFriendsList = async () => {
      const response = await fetchFriends();
      console.log(response);
    };

    fetchFriendsList();
  }, []);

  return (
    <>
      <NewNavBar />
      <div className="main">
        <div className="card-header p-3">
          <div className="card-title">
            <div className="d-flex justify-content-between align-items-center">
              <h1>Friends</h1>
              <button className="btn btn-primary" onClick={handleShow}>
                Add +
              </button>
            </div>
          </div>
        </div>

        <div className="container-fluid" style={{ boxSizing: "border-box" }}>
          <div className="row gx-3">
            <FriendsProfileCard></FriendsProfileCard>
          </div>
        </div>
      </div>
      <Example show={show} handleClose={handleClose} />
    </>
  );
};

export default Friends;
