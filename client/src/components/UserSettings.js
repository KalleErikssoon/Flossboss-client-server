import React, { useState } from 'react';
import { Form, Button, Alert, Container, Row, Col, Card } from 'react-bootstrap';
import axios from 'axios';
import backgroundImage from '../assets/SuggestedBackground.png'

const UserUpdateForm = () => {
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [colorVariant, setColorVariant] = useState('success');

    const updateUserInfo = async (userData) => {
        const token = localStorage.getItem('token'); // fetching the token that is set when user logs in'
        const headers = {
            'usertoken' : token
        };
        try {
            const response = await axios.put(`http://localhost:3000/update`, userData,  { headers });
            return response.data;
        } catch (error) {
            throw error;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await updateUserInfo({ name, phoneNumber, password });
            
            if (name.trim() !== '') {
                localStorage.setItem('userName', name);
            }
            setMessage(response.message);
            alert("User data updated successfully")
            setColorVariant('success');
        } catch (error) {
            setMessage(error.response.data.message);
            setColorVariant('danger');
            alert("Error")
        }
    };

    const backgroundStyle = {
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',  
        backgroundPosition: 'center', 
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh', 
    };


    return (
        <div style={backgroundStyle}>
        <Container fluid className="h-100">
            <Row className='align-items-center'>
                <Col md={{ span: 6, offset: 3 }}>
                    <Card style={{ marginTop: '100px' }}>
                        <Card.Body>
                            <Card.Title>User Settings</Card.Title>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group controlId="formBasicName" className="mb-3">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter new Username"
                                        value={name}
                                        onChange={e => setName(e.target.value)}
                                    />
                                </Form.Group>
                                
                                <Form.Group controlId="formBasicPhoneNumber" className="mb-3">
                                    <Form.Label>Phone Number</Form.Label>
                                    <Form.Control 
                                        type="tel" 
                                        placeholder="Enter new Phone number" 
                                        value={phoneNumber}
                                        onChange={e => setPhoneNumber(e.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group controlId="formBasicPassword" className="mb-3">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control 
                                        type="password" 
                                        placeholder="Enter new Password" 
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                    />
                                </Form.Group>

                                <Button variant="primary" type="submit">
                                    Update
                                </Button>

                                {message && <Alert variant={colorVariant} className="mt-3">{message}</Alert>}
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
        </div>
    );
};

export default UserUpdateForm;

