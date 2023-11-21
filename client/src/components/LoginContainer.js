import React from "react";
import { useState } from "react";
import Login from "./Login";
import Register from "./Register";
import Modal from "react-bootstrap/Modal";

const ModalRegisterLogin = ({ handleClose, visible = false }) => {
  const [isSignIn, setIsSignIn] = useState(false);

  return (
    <Modal show={visible} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Login / Register</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {isSignIn ? (
          <Login swtichPage={() => setIsSignIn(false)} />
        ) : (
          <Register swtichPage={() => setIsSignIn(true)} />
        )}
      </Modal.Body>
      <Modal.Footer></Modal.Footer>
    </Modal>
  );
};

export default ModalRegisterLogin;
