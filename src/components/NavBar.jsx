import { Link } from "react-router-dom";
import styles from "../css/App.module.css";

const NavBar = () => {
  return (
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
              <a href="#" className="nav-link active" aria-current="page">
                Create Game
              </a>
            </li>
            <li className="nav-item">
              <Link
                to="/Friends"
                className="nav-link active"
                aria-current="page"
              >
                Friends
              </Link>
            </li>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNavDarkDropdown"
              aria-controls="navbarNavDarkDropdown"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarNavDarkDropdown"
            >
              <ul className="navbar-nav">
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Dropdown
                  </a>
                  <ul className="dropdown-menu dropdown-menu-dark">
                    <li>
                      <a className="dropdown-item" href="#">
                        Action
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Another action
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Something else here
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </ul>
          <ul className="navbar-nav ">
            <li className="nav-item">
              <Link
                to="/logout"
                className="nav-link active"
                aria-current="page"
              >
                <button className="btn btn-primary">logout</button>
              </Link>
            </li>
            <li className="nav-item">
              <div>
                <div className="">
                  <img
                    src="https://bootdey.com/img/Content/avatar/avatar1.png"
                    alt=""
                    style={{ width: "50px", borderRadius: "50%" }}
                  />
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
