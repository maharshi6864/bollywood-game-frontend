import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styles from "../css/App.module.css";
import { loadUser } from "../apis/home";

const Home = () => {
  const dispatch = useDispatch();
  const { username } = useSelector((store) => store.userDetails);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // const response = await loadUser();
        // if (response.status) {
        //   console.log(response);
        //   setLoading(false);
        // }
      } catch (error) {
        navigate("/login");
      }
    };
    fetchUser();
  }, []);
  return loading ? (
    <div>
      <div className="h-100 w-100 d-flex align-items-center justify-content-center">
        <div
          className="spinner-border justify-content-center align-item-center"
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>
  ) : (
    <>
      <nav
        className="navbar  navbar-expand-lg bg-black "
        style={{ color: "#fff" }}
      >
        <div className="container-fluid ">
          <Link to="/" className="navbar-brand" href="#">
            BOLLYWOOD
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to="/" className="nav-link active" aria-current="page">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">
                  Create Game
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">
                  Contacts
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">
                  Invites
                </a>
              </li>
            </ul>
            <ul className="navbar-nav ">
              <li className="nav-item">
                <Link to="/" className="nav-link active" aria-current="page">
                  <button className="btn btn-primary">logout</button>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="container-fluid">
        <div className="main">
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
                        <div className="d-flex justify-content-center align-items-center my-5 py-5">
                          <div className={styles.textContainer}>
                            <p className={`${styles.responsiveText} fs-1`}>
                              <span className={styles.cutB}>B</span> O L L Y W O
                              O D
                            </p>
                          </div>  
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12">
                        <div className="d-flex justify-content-center align-items-center mb-5 ">
                          <p className="fs-1 ">
                            <span>_AI_ | _E | _A_A | _AI_ | _A__I</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div>
                <div className="row">
                  <div className="col-12">
                    <div className="card border-0">
                      <div className="card-body border-bottom">
                        <p className="fs-3">Players</p>
                      </div>
                      <ul className="list-group list-group-flush">
                        <li className="list-group-item">
                          <p className="mb-0 fs-4">1. maharshi6864</p>
                          <p className="mb-0 fs-6 ms-4">points 1</p>
                        </li>
                        <li className="list-group-item">
                          <p className="mb-0 fs-4">1. maharshi6864</p>
                          <p className="mb-0 fs-6 ms-4">points 1</p>
                        </li>
                        <li className="list-group-item">
                          <p className="mb-0 fs-4">1. maharshi6864</p>
                          <p className="mb-0 fs-6 ms-4">points 1</p>
                        </li>
                        <li className="list-group-item">
                          <p className="mb-0 fs-4">1. maharshi6864</p>
                          <p className="mb-0 fs-6 ms-4">points 1</p>
                        </li>
                        <li className="list-group-item">
                          <p className="mb-0 fs-4">1. maharshi6864</p>
                          <p className="mb-0 fs-6 ms-4">points 1</p>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
