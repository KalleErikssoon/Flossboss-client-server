import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';

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
            
            if (name!=null) {
                localStorage.setItem('userName', name); //FIX SO THAT NAME WILL NOT UPDATE LOCALLY IF EMPTY
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


    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter new Username"
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
            </Form.Group>
            
            <Form.Group controlId="formBasicPhoneNumber">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control 
                    type="tel" 
                    placeholder="Enter new Phone number" 
                    value={phoneNumber}
                    onChange={e => setPhoneNumber(e.target.value)}
                />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
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

            {message && <Alert variant={colorVariant}>{message}</Alert>}
        </Form>
    );
};

export default UserUpdateForm;

