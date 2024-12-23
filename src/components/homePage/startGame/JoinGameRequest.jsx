import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function JoinGameRequest({joinModelShow, setJoinModelShow,hostName,handleAnswer}) {

  const handleClose = () => setJoinModelShow(false);
  const handleShow = () => setJoinModelShow(true);

  return (
      <>
        <Modal show={joinModelShow} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Game Request</Modal.Title>
          </Modal.Header>
          <Modal.Body><b>{hostName}</b> has Requested to join the Game.</Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={()=>{
                handleAnswer(false);
            }}>
              Deny
            </Button>
            <Button variant="success" onClick={()=>{
                handleAnswer(true);
            }}>
              Accept
            </Button>
          </Modal.Footer>
        </Modal>
      </>
  );
}

export default JoinGameRequest;