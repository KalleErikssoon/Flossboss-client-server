import React, { useState } from "react";
import { Form, Button, Alert } from 'react-bootstrap';
import userService from './userService';
 

const UserUpdateForm = () => {
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [colorVariant, setColorVariant] = useState('success');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await userService.updateUserInfo({name, phoneNumber, password});
            setMessage(response.data.message);
            setColorVariant('success');
        } catch (error) {
            setMessage(error.response.data.message);
            setColorVariant('danger');
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
            </Form.Group>
            
            <Form.Group controlId="formBasicPhoneNumber">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control 
                    type="tel" 
                    placeholder="Enter phone number" 
                    value={phoneNumber}
                    onChange={e => setPhoneNumber(e.target.value)}
                />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control 
                    type="password" 
                    placeholder="Password" 
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
            </Form.Group>

            <Button variant="primary" type="submit">
                Update
            </Button>

            {message && <Alert variant={colorVariant}>{message}</Alert>}
        </Form>
    );
};

export default UserUpdateForm;

