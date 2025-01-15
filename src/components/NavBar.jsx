import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Link } from "react-router-dom";
import '../css/navBarCustomCss.css';
import {useSelector} from "react-redux";
import {useEffect} from "react";

let expand = false;

function NavBar() { // Destructure username from props
    const {username} = useSelector((state) => state.userStore.userDetails);
    return (
        <>
            <Navbar
                key={expand}
                expand={expand}
                className="bg-black"
                style={{ color: "white", height: "62.5px" }}
            >
                <Container fluid>
                    <Navbar.Brand href="/" className="fs-4" style={{ color: "white" }}>
                        <b>B O L L Y W O O D</b>
                    </Navbar.Brand>

                    <div className="d-flex align-items-center">
                        {/* Display Username Next to Menu Button */}
                        <span className="me-2" style={{ color: "white", fontSize: "16px",position:"absolute",top:"20px",right:"60px" }}>
                            {username}
                        </span>
                        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand} `} style={{ color: "white !important" }} />
                    </div>

                    <Navbar.Offcanvas
                        id={`offcanvasNavbar-expand-${expand}`}
                        aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                        placement="end"
                        className="bg-black offcanvas-custom"
                    >
                        <Offcanvas.Header closeButton style={{ color: "white" }}>
                            <Offcanvas.Title
                                id={`offcanvasNavbarLabel-expand-${expand}`}
                                style={{ color: "white" }}
                            >
                                <div className="d-flex justify-content-center">
                                    <span>Menu</span>
                                </div>
                            </Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body className="bg-black border-top" style={{ color: "white" }}>
                            <Nav className="justify-content-end flex-grow-1 pe-3">
                                <Nav.Link
                                    as={Link}
                                    to="/"
                                    className="nav-link active border-bottom"
                                    aria-current="page"
                                    style={{ color: "white" }}
                                >
                                    Home
                                </Nav.Link>
                                <Nav.Link
                                    as={Link}
                                    to="/Friends"
                                    className="nav-link active border-bottom"
                                    aria-current="page"
                                    style={{ color: "white" }}
                                >
                                    Friends
                                </Nav.Link>
                                <Nav.Link
                                    as={Link}
                                    to="/Profile"
                                    className="nav-link active border-bottom"
                                    aria-current="page"
                                    style={{ color: "white" }}
                                >
                                    Profile
                                </Nav.Link>
                            </Nav>

                            {/* Profile Image at Bottom-Right Corner */}
                            <div
                                className="bottom-right-image p-3 border-top w-100 d-flex justify-content-between align-items-center">
                                <Nav.Link
                                    as={Link}
                                    to="/logout"
                                    className="nav-link active text-danger"
                                    aria-current="page"
                                >
                                    Logout
                                </Nav.Link>
                                <img
                                    src="https://bootdey.com/img/Content/avatar/avatar1.png"
                                    alt="Profile"
                                    className="profile-image-bottom"
                                />
                            </div>
                        </Offcanvas.Body>
                    </Navbar.Offcanvas>
                </Container>
            </Navbar>
        </>
    );
}

export default NavBar;
