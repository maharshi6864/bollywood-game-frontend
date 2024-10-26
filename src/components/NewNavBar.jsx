import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";

function NewNavBar() {
  return (
    <Navbar
      expand="lg"
      className="navbar navbar-expand-lg bg-black"
      style={{ color: "#fff" }}
    >
      <Container fluid>
        <Navbar.Brand href="#">Bollywood</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link href="#action1">
              {" "}
              <Link to="/" className="nav-link active" aria-current="page">
                Home
              </Link>
            </Nav.Link>
            <Nav.Link href="#action1">
              {" "}
              <Link
                to="/Friends"
                className="nav-link active"
                aria-current="page"
              >
                Friends
              </Link>
            </Nav.Link>
          </Nav>

          {/* Profile Image and Dropdown */}
          <NavDropdown
            title={
              <img
                src="https://bootdey.com/img/Content/avatar/avatar1.png"
                alt="Profile"
                style={{ width: "40px", borderRadius: "50%" }}
              />
            }
            id="navbarScrollingDropdown"
            align="end"
          >
            <NavDropdown.Item href="#action3">Profile</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="">
              {" "}
              <Link
                to="/logout"
                className="nav-link active"
                aria-current="page"
              >
                <span className="text-danger">Logout</span>
              </Link>
            </NavDropdown.Item>
          </NavDropdown>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NewNavBar;
