import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function BookingUnavailable({ show, onHide, onReset, date }) {
  const handleClose = () => {
    onHide();
    onReset(date);
  };

  return (
    <>
      <Modal show={show} backdrop="static" keyboard={false} size="lg" centered>
        <Modal.Header>
          <Modal.Title>Booking Unavailable</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="modal-p">
            The time Slot that you are trying to book is unavailable. <br />
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default BookingUnavailable;
