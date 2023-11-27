import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ConfirmBooking({ show, onHide, onReset, timeSlot, date, onConfirm }) {

  const formattedDate = date ? date.toLocaleDateString() : ''
  
  const handleClose = () => {
    onHide();
    onReset(); 
  };
  
  return (
    <>
      <Modal
        show={show}
        onHide={() => { handleClose(); onReset(); }}
        backdrop="static"
        keyboard={false}
        size="lg"
        centered
      >
        <Modal.Header>
          <Modal.Title>Booking Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="modal-p">   
          By confirming you will book the following appointment: <br /><br />
          <b>Clinic:</b>  Dentist A <br />
          <b>Date:</b> {formattedDate} <br />
          <b>Time:</b> {timeSlot} <br /><br />
          Please click <b>Confirm</b> to confirm your booking.
          </p>
        </Modal.Body>
        <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={onConfirm}>Confirm</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ConfirmBooking;
