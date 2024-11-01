import styles from "../../css/FirendsProfileCard.module.css";
import { removefriend } from "../../apis/friends.js";
import { useDispatch } from "react-redux";
import { friendsActions } from "../../store/friendsStore.js";
window.global = window;


const FriendsProfileCard = ({ friend }) => {
  const dispatch = useDispatch();

  const handlingRemovefriend = async (id) => {
    const response = await removefriend(id);
    if (response.status) {
      dispatch(friendsActions.removeFriend({ id }));
    }
  };

  return (
      <div className="col-12 col-sm-6 col-md-4">
        <div className="card mb-3 position-relative">
          {/* Online/Offline Badge */}
          <span
              className={`badge ${friend.online ? "bg-success" : "bg-danger"} ${styles.statusBadge}`}
          >
          {friend.online ? "Online" : "Offline"}
        </span>

          <div className="card-body">
            <div className="row align-items-center">
              <div className="col-3 col-md-3 col-lg-3 col-sm-3 text-center">
                <img
                    src="https://bootdey.com/img/Content/avatar/avatar1.png"
                    alt="Avatar"
                    className={`${styles.imgCircle} img-fluid`}
                />
              </div>
              <div className="col-6 col-md-6 col-lg-6 col-sm-5">
                <div className="fs-5 fw-bold">{friend.friendName}</div>
                <div>Matches Played Together: {friend.matchesPlayedTogether}</div>
              </div>
              <div className="col-3 col-md-3 col-lg-3 col-sm-4 text-end mt-2 mt-md-0">
                <button
                    className="btn btn-danger w-100 w-md-auto"
                    onClick={() => handlingRemovefriend(friend.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default FriendsProfileCard;
