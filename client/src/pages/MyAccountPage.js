import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Container, Row, Col, Button } from 'react-bootstrap';

const MyAccountPage = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const userId = localStorage.getItem('userIdSession'); 
        if (userId) {
            fetchAppointments(userId);
        }
    }, []);

    const fetchAppointments = async (userId) => {
        try {
            const response = await axios.get(`http://localhost:3000/users/${userId}/appointments`);
            setAppointments(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching appointments:', error);
            setLoading(false);
        }
    };

    const handleCancelAppointment = async (appointmentId) => {
        const userId = localStorage.getItem('userIdSession');
        if (userId) {
            // Display confirmation dialog
            const isConfirmed = window.confirm("Are you sure you want to cancel your appointment?");
            if (isConfirmed) {
                // User clicked 'OK', proceed with cancellation
                try {
                    await axios.patch(`http://localhost:3000/users/${userId}/appointments/${appointmentId}/cancelBooked`);
                    setTimeout(() => {
                        fetchAppointments(userId); // update the list on the page after canceling
                    }, 500); // Delay of 2 seconds (2000 milliseconds)
                } catch (error) {
                    console.error('Error cancelling appointment:', error);
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
        <Container>
            <h1>My Appointments</h1>
            <Row>
                {appointments.map(appointment => (
                    <Col key={appointment._id} md={12}>
                        <Card className="mb-3">
                            <Card.Body>
                                <Card.Title>{appointment.clinicName}</Card.Title>
                                <div>Date: {appointment.date}</div>
                                <div>Start: {appointment.timeTo}</div>
                                <div>End: {appointment.timeFrom}</div>
                                <div>Clinic Name: {appointment.clinicName}</div>
                                <Button 
                                    variant="danger" 
                                    onClick={() => handleCancelAppointment(appointment._id, appointment._clinicId)}>
                                    Cancel Appointment
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default MyAccountPage;
