import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ConfirmBooking({ show, onHide, timeSlot }) {
  // No need for internal state management for 'show' as it's passed via props

  return (
    <>
      <Modal
        show={show}
        onHide={onHide}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Booking</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          By confirming you will book a time at Dentist A, 
          Date: 2023-11-25 {/* Replace with dynamic date if available */}
          Time: {timeSlot}
          Please click "Confirm" to confirm your booking.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Close
          </Button>
          <Button variant="primary">Confirm</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ConfirmBooking;
