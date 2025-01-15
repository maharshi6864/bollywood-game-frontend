import styles from "../../css/FirendsProfileCard.module.css";
import {removefriend} from "../../apis/friends.js";
import {useDispatch} from "react-redux";
import {friendsActions} from "../../store/friendsStore.js";

window.global = window;


const FriendsProfileCard = ({friend}) => {
    const dispatch = useDispatch();

    const handlingRemovefriend = async (id) => {
        const response = await removefriend(id);
        if (response.status) {
            dispatch(friendsActions.removeFriend({id}));
        }
    };
    console.log("Firend name : ",friend.friendName);
    console.log(friend.status);
    return (
        <div className="col-12 col-sm-6 col-md-4">
            <div className="card mb-3 position-relative">
                {/* Online/Offline Badge */}
                <span
                    className={`badge ${friend.status === "Offline" ? "bg-danger" : "bg-success"} ${styles.statusBadge}`}
                >
          {friend.status !== Number.NaN ? friend.status : "In Game"}
        </span>

                <div className="card-body">
                    <div className="row align-items-center">
                        <div className="col-3 col-md-3 col-lg-3 col-sm-3">
                            <img
                                src="https://bootdey.com/img/Content/avatar/avatar1.png"
                                alt="Avatar"
                                className={`${styles.imgCircle} img-fluid`}
                            />
                        </div>
                        <div className="col-5 col-md-5 col-lg-5 col-sm-5">
                            <div className="fs-5 fw-bold">{friend.friendName}</div>
                            <div>Matches Played Together: {friend.matchesPlayedTogether}</div>
                        </div>
                        <div className="col-4 col-md-4 col-lg-4 col-sm-4 text-end mt-2">
                            <button
                                className="btn btn-danger"
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
