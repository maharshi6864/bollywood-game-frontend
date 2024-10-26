import styles from "../css/App.module.css";

const GameStarted = () => {
  return (
    <div className="row">
      <div className="col-lg-8">
        <div className={``}>
          <div className="row">
            <div className="col-12">
              <div className=" d-flex justify-content-between p-2 pr-0 border-bottom">
                <div>
                  <p className="text-start fs-4 mb-0">
                    Game id: <span>781828</span>
                  </p>
                  <p className="mt-0">
                    created by : <span>maharshi6864</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="card border-0">
            <div className="card-body">
              <div className="row">
                <div className="col-12 ">
                  <div>
                    <p className="text-end fs-5">
                      Time Remaining : <span>05:00</span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <div className="d-flex justify-content-center align-items-center mt-5 py-5">
                    <div className={styles.textContainer}>
                      <p className={`${styles.responsiveText} fs-1`}>
                        <span className={styles.cutB}>B</span> O L L Y W O O D
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <div
                    className="d-flex justify-content-center align-items-center "
                    style={{ marginBottom: "9.5rem " }}
                  >
                    <p className="fs-1">
                      <span>_AI_ | _E | _A_A | _AI_ | _A__I</span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-7">
                  <div className="">
                    <div className="input-group ">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Type a letter or the movie name."
                        aria-label="Recipient's username"
                        aria-describedby="button-addon1"
                      />
                      <button
                        className="btn btn-primary"
                        type="button"
                        id="button-addon1"
                      >
                        Guess Movie
                      </button>
                    </div>
                  </div>
                </div>
                <div className="col-5">
                  <button className="btn btn-danger mx-2">End Game</button>
                  <button className="btn btn-danger mx-2">Quit Game</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-lg-4">
        <div className="row">
          <div className="col-12">
            <div className="card-body border-bottom mt-4 mx-2">
              <p className="fs-2">Players</p>
            </div>
          </div>
        </div>
        <div className={`${styles.playersList} mb-1`}>
          <div className="row">
            <div className="col-12">
              <div className="card border-0">
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    <div className="d-flex align-items-center justify-content-between">
                      <p className="mb-0 fs-4">1. maharshi6864</p>
                      <span className="badge text-bg-success">Online</span>
                    </div>
                    <p className="mb-0 fs-6 ms-4">points 1</p>
                  </li>
                  <li className="list-group-item">
                    <div className="d-flex align-items-center justify-content-between">
                      <p className="mb-0 fs-4">1. maharshi6864</p>
                      <span className="badge text-bg-danger">Offline</span>
                    </div>
                    <p className="mb-0 fs-6 ms-4">points 1</p>
                  </li>
                  <li className="list-group-item">
                    <div className="d-flex align-items-center justify-content-between">
                      <p className="mb-0 fs-4">1. maharshi6864</p>
                      <span className="badge text-bg-info">Guessing...</span>
                    </div>
                    <p className="mb-0 fs-6 ms-4">points 1</p>
                  </li>
                  <li className="list-group-item">
                    <div className="d-flex align-items-center justify-content-between">
                      <p className="mb-0 fs-4">1. maharshi6864</p>
                      <span className="badge text-bg-warning">Typing...</span>
                    </div>
                    <p className="mb-0 fs-6 ms-4">points 1</p>
                  </li>
                  <li className="list-group-item">
                    <div className="d-flex align-items-center justify-content-between">
                      <p className="mb-0 fs-4">1. maharshi6864</p>
                      <span className="badge text-bg-success">Online</span>
                    </div>
                    <p className="mb-0 fs-6 ms-4">points 1</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Type a message"
                  aria-label="Recipient's username"
                  aria-describedby="button-addon2"
                />
                <button
                  className="btn btn-primary"
                  type="button"
                  id="button-addon2"
                >
                  Send Message
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameStarted;
