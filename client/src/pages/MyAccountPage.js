import React, { useState, useEffect } from "react";
import axiosInstance from "../axiosInterceptor";
import { Card, Container, Row, Col, Button, Dropdown, Modal } from "react-bootstrap";
import MyAccountClinicsList from "../components/MyAccountClinicsList";
import CalendarComponent from "../components/CalendarUserSubscription";

// sets all the dates in the calendar from todays date and 1 month ahead to available
const generateDatesAvailable = () => {
  let dates = {};
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  // Calculate the last day of the next month
  const lastDayNextMonth = new Date(currentYear, currentMonth + 2, 0);

  for (let date = new Date(currentDate); date <= lastDayNextMonth; date.setDate(date.getDate() + 1)) {
    const formattedDate = date.toISOString().split("T")[0];
    dates[formattedDate] = { count: 1 }; // Marking the date as available

    // Debugging: Log each date added
    //console.log(formattedDate);
  }

  return dates;
};

const MyAccountPage = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [clinics, setClinics] = useState([]);
  const [selectedClinic, setSelectedClinic] = useState(null);
  const datesAvailable = generateDatesAvailable();
  const[showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [userEmail, setUserEmail] = useState(null);

  //const [datesUnavailable, setDatesUnavailable] = useState({});

  //const today = new Date();
  // const firstDayNextMonth = new Date(today.getFullYear, today.getMonth() +1, 1);

  useEffect(() => {
    const fetchClinics = async () => {
        try {
            const response = await axiosInstance.get("http://localhost:3000/clinics");
            setClinics(response.data);
        } catch (error) {
            console.error("Error fetching clinics:", error);
        }
    };
    fetchClinics();
  }, []);

  const handleClinicSelect = (clinic) => {
    console.log("Selected clinic: ", clinic.name, "Clinic id: ", clinic._id);
    setSelectedClinic(clinic);
    //console.log(datesUnavailable);
  };


  useEffect(() => {
    const userId = localStorage.getItem("userIdSession");
    if (userId) {
      fetchAppointments(userId);
    }
  }, []);

  useEffect(() => {
    // Fetch user email directly from localStorage
    const email = localStorage.getItem('Email');
    if (email) {
      setUserEmail(email);
    }
  }, []);
  

  const fetchAppointments = async (userId) => {
    try {
      const response = await axiosInstance.get(
        `http://localhost:3000/users/${userId}/appointments`
      );
      setAppointments(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching appointments:", error);
      setLoading(false);
    }
  };

  // Logic for when a user clicks a calendar date (subscribes to that date and clinic)
  const handleDateSelect = (value) => {
    // Adjust the date for the time zone offset before converting to ISO string
    const offset = value.getTimezoneOffset();
    const adjustedDate = new Date(value.getTime() - (offset * 60 * 1000));
    setSelectedDate(adjustedDate.toISOString().split('T')[0]);
    setShowModal(true);
  };
  

  const handleSubscribe = async () => {

    if(!selectedClinic || !selectedDate) {
      console.error("Clinic or date not selected");
      return;
    }

    const subscriptionData = {
      clinicId: selectedClinic._id,
      date: selectedDate,
      email: userEmail,
      clinicName: selectedClinic.name
    };

    try {
      const response = await axiosInstance.put(`http://localhost:3000/clinics/${selectedClinic._id}`, subscriptionData);
      console.log(response.data);
    } catch (error) {
      console.error("Error subscribing", error);
    }
    setShowModal(false);
   
  };


  const handleCancelAppointment = async (appointmentId) => {
    const userId = localStorage.getItem("userIdSession");
    if (userId) {
      // Display confirmation dialog
      const isConfirmed = window.confirm(
        "Are you sure you want to cancel your appointment?"
      );
      if (isConfirmed) {
        // User clicked 'OK', proceed with cancellation
        try {
          await axiosInstance.patch(
            `http://localhost:3000/users/${userId}/appointments/${appointmentId}/cancelBooked`
          );
          setTimeout(() => {
            fetchAppointments(userId); // update the list on the page after canceling
          }, 500);
        } catch (error) {
          console.error("Error cancelling appointment:", error);
        }
      } else {
        // User clicked 'Cancel', do nothing
        console.log("Cancellation aborted");
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
    <Container>
      <h1>My Appointments</h1>
      <Row>
        {appointments.map((appointment) => (
          <Col key={appointment._id} md={12}>
            <Card className="mb-3">
              <Card.Body>
                <Card.Title>{appointment.clinicName}</Card.Title>
                <div>Date: {appointment.date.slice(0, 10)}</div>
                <div>Start: {appointment.timeFrom}</div>
                <div>End: {appointment.timeTo}</div>
                <div>Clinic Name: {appointment.clinicName}</div>
                <Button
                  variant="danger"
                  onClick={() =>
                    handleCancelAppointment(
                      appointment._id,
                      appointment._clinicId
                    )
                  }
                >
                  Cancel Appointment
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <Row>
        <Col md={12}>
            <h3>Clinics</h3>
            <Dropdown>
                <Dropdown.Toggle variant="primary" id="dropdown-basic">
                    Select Clinic
                </Dropdown.Toggle>
                <Dropdown.Menu style={{ maxHeight: '300px', overflowY: 'auto'}}>
                    <MyAccountClinicsList clinics={clinics} onClinicSelect={handleClinicSelect} />
                </Dropdown.Menu>
            </Dropdown>
        </Col>
        {selectedClinic && (
          <Col md={12}>
          <h3> Subscribe to a date for {selectedClinic.name} </h3>
          <CalendarComponent
          activeStartDate={new Date()} //start from today
          onDateSelect={(handleDateSelect)}
          datesAvailable={datesAvailable}
          />
          <CalendarComponent //second calendar
          activeStartDate={new Date(new Date().getFullYear(), new Date().getMonth()+1, 1)} //first day of that month
          onDateSelect={(handleDateSelect)}
          //datesAvailable={datesUnavailable}
          />
          </Col>

        )}
      </Row>
    {/* Modal for confirming subscription */}
    <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Subscribe</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Do you want to subscribe to {selectedDate && selectedDate}?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleSubscribe}>
            Subscribe
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
    </>
  );
};

export default MyAccountPage;
