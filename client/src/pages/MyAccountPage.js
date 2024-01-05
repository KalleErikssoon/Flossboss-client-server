import React, { useState, useEffect } from "react";
import axiosInstance from "../axiosInterceptor";
import {
  Card,
  Container,
  Row,
  Col,
  Button,
  Dropdown,
  Modal,
} from "react-bootstrap";
import MyAccountClinicsList from "../components/MyAccountClinicsList";
import CalendarComponent from "../components/CalendarUserSubscription";
import backgroundImage from "../assets/SuggestedBackground.png";

// sets all the dates in the calendar from todays date and 1 month ahead to available
const generateDatesAvailable = () => {
  let dates = {};
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  // Calculate the last day of the next month
  const lastDayNextMonth = new Date(currentYear, currentMonth + 2, 0);

  for (
    let date = new Date(currentDate);
    date <= lastDayNextMonth;
    date.setDate(date.getDate() + 1)
  ) {
    const formattedDate = date.toISOString().split("T")[0];
    dates[formattedDate] = { count: 1 }; // Marking the date as available
  }

  return dates;
};

const MyAccountPage = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [clinics, setClinics] = useState([]);
  const [selectedClinic, setSelectedClinic] = useState(null);
  const datesAvailable = generateDatesAvailable();
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [userEmail, setUserEmail] = useState(null);


  // Fetch clinic data on component mount, runs once when the component is first rendered
  useEffect(() => {
    const fetchClinics = async () => {
        try {
            const response = await axiosInstance.get("http://localhost:3000/clinics");
            setClinics(response.data);
        } catch (error) {
            window.alert("Error fetching clinics:");
        }
    };
    fetchClinics();
  }, []);

  const handleClinicSelect = (clinic) => {
    setSelectedClinic(clinic);
  };

// If userId exists, fetches appointments via fetchAppointments method for that user
// called once when the component renders
  useEffect(() => {
    const userId = localStorage.getItem("userIdSession");
    if (userId) {
      fetchAppointments(userId);
    }
  }, []);

  // Sets user email to the email of the user from localstorage if it exists
  // called once when the component renders
  useEffect(() => {
    const email = localStorage.getItem('Email');
    if (email) {
      setUserEmail(email);
    }
  }, []);
  
// Fetches appointments via get request to the backend based on userId
// Updates the Appointments state with the received response data
  const fetchAppointments = async (userId) => {
    try {
      const response = await axiosInstance.get(
        `http://localhost:3000/users/${userId}/appointments`
      );
      setAppointments(response.data);
      setLoading(false);
    } catch (error) {
      window.alert("Error fetching appointments:");
      setLoading(false);
    }
  };

  // Method for when a user clicks a calendar date (subscribes to that date and clinic)
  const handleDateSelect = (value) => {
    // Adjust the date for the time zone offset before converting to ISO string
    const offset = value.getTimezoneOffset();
    const adjustedDate = new Date(value.getTime() - offset * 60 * 1000);
    setSelectedDate(adjustedDate.toISOString().split("T")[0]);
    setShowModal(true);
  };

  //A user subscribes to a date belonging to a specific clinic.
  const handleSubscribe = async () => {

    if(!selectedClinic || !selectedDate) {
      window.alert("Clinic or date not selected");
      return;
    }

    const subscriptionData = {
      clinicId: selectedClinic._id,
      date: selectedDate,
      email: userEmail,
      clinicName: selectedClinic.name,
    };

    try {
      const response = await axiosInstance.put(`http://localhost:3000/clinics/${selectedClinic._id}`, subscriptionData);
      if(response.data === "User already subscribed to this clinic on the selected date") {
        window.alert("You are already subscribed to this date!")
      } else {
        window.alert("Subscription successful! You will now receive an email sent to the email adress of this account.");
      }
    } catch (error) {
      window.alert("Subscription unsuccessful!");
    }
    setShowModal(false);
  };

// User cancels booked appointment
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
          window.alert("Error cancelling appointment:");
        }
      } else {
        // User clicked 'Cancel', do nothing
        window.alert("Cancellation aborted");
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const backgroundStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    minHeight: "100vh",
  };

  return (
    <>
      <div style={backgroundStyle}>
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
                <Dropdown.Menu
                  style={{ maxHeight: "300px", overflowY: "auto" }}
                >
                  <MyAccountClinicsList
                    clinics={clinics}
                    onClinicSelect={handleClinicSelect}
                  />
                </Dropdown.Menu>
              </Dropdown>
            </Col>
            {selectedClinic && (
              <Col md={12}>
                <h3> Subscribe to a date for {selectedClinic.name} </h3>
                <CalendarComponent
                  activeStartDate={new Date()} //start from today
                  onDateSelect={handleDateSelect}
                  datesAvailable={datesAvailable}
                />
                <CalendarComponent //second calendar
                  activeStartDate={
                    new Date(
                      new Date().getFullYear(),
                      new Date().getMonth() + 1,
                      1
                    )
                  } //first day of that month
                  onDateSelect={handleDateSelect}
                />
              </Col>
            )}
          </Row>
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
      </div>
    </>
  );
};

export default MyAccountPage;
