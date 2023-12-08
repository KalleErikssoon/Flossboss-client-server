import React from "react";
import axios from "axios";
import { useState, useEffect} from "react";
import { Container, Row, Col, ListGroup, Card } from 'react-bootstrap';
const MyAccountPage = () => {
    const [appointments, setSelectedAppointment] = useState([]);

    useEffect(() => {
        const fetchAppointments = async () =>  {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:3000/appointments', {
                    headers: {'Authorization': `Bearer ${token}` }
                });
                setSelectedAppointment(response.data);
            } catch(error) {
                console.error('Error fetching appointment:', error);
            }
        };

        fetchAppointments();
    }, []);

    return (
        <Container>
            <Row className="justify-content-md-center mt-5">
                <Col md={8}>
                    <Card>
                        <Card.Header>My Booked Appointments</Card.Header>
                        <Card.Body>
                            {appointments.length > 0 ? (
                                <ListGroup>
                                    {appointments.map(appointment => (
                                        <ListGroup.Item key={appointment.id}>
                                            <strong>Date:</strong> {appointment.date} <br />
                                            <strong>Time:</strong> {appointment.time}
                                            {/* Add more details as needed */}
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            ) : (
                                <p>No appointments booked.</p>
                            )}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default MyAccountPage;



