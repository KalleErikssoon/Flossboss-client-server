import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ConfirmBooking({ show, onHide, timeSlot, date }) {

  const formattedDate = date ? date.toLocaleDateString() : ''

  return (
    <>
      <Modal
        show={show}
        onHide={onHide}
        backdrop="static"
        keyboard={false}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Booking Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="modal-p">   
          By confirming you will book a time at: <br /><br />
          <b>Clinic:</b>  Dentist A <br />
          <b>Date:</b> {formattedDate} <br />
          <b>Time:</b> {timeSlot} <br /><br />
          Please click <b>Confirm</b> to confirm your booking.
          </p>
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
