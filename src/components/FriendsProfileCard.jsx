import styles from "../css/FirendsProfileCard.module.css";

const FriendsProfileCard = () => {
  return (
    <div className="col-sm-4">
      <div className="card mb-3">
        <div className="card-body">
          <div className="row">
            <div className="col-4">
              <div className="right col-xs-5 text-center">
                {" "}
                <img
                  src="https://bootdey.com/img/Content/avatar/avatar1.png"
                  alt=""
                  className={`${styles.imgCircle} img-responsive`}
                />
              </div>
            </div>
            <div className="col-8">
              <div className="fs-5">Name : Maharshi Patel</div>
              <div className="fs-5">Username : maharshi6864</div>
              <div className="fs-5">Games Played Together : 5</div>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              {" "}
              <button className="btn btn-danger mt-3 mx-2">Remove</button>
            </div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FriendsProfileCard;
