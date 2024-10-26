import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

function Example({ show, handleClose }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = () => {
    // Mock search functionality
    setSearchResults([
      { name: "John Doe", username: "johndoe123" },
      { name: "Jane Smith", username: "janesmith456" },
    ]);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Search for Friends</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="search">
            <Form.Label>Search Friends</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name or username"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" onClick={handleSearch} className="mt-2">
            Search
          </Button>
        </Form>
        <div className="mt-3">
          {searchResults.length > 0 ? (
            searchResults.map((result, index) => (
              <div key={index} className="border p-2 mb-2">
                <div>Name: {result.name}</div>
                <div>Username: {result.username}</div>
                <Button variant="success" size="sm" className="mt-2">
                  Add Friend
                </Button>
              </div>
            ))
          ) : (
            <p>No results found</p>
          )}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default Example;
