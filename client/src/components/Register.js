import React, { useContext, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { AppContext } from "../context/AppProvider";
import axiosInstance from "../axiosInterceptor";

const Register = ({ swtichPage }) => {
  const { setShowUserModal } = useContext(AppContext);
  const [user, setUser] = useState({
    name: "",
    password: "",
    email: "",
    phoneNumber: "",
  });

  const [validated, setValidated] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  
    if (name === 'email') {
      const isValidEmail = value.includes('.');
      e.target.setCustomValidity(isValidEmail ? '' : 'Invalid');
    }
  
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      setValidated(true);
    }
  };
  

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (!form.checkValidity() || !isValidEmail(user.email)) {
    e.stopPropagation();
    alert('Please ensure all fields are filled in correctly before submitting.');
    return;
  }

    try {
      const response = await axiosInstance.post(
        "http://localhost:3000/users",
        user
      );
      console.log("User registered:", response.data);

      setUser({
        name: "",
        password: "",
        email: "",
        phoneNumber: "",
      });
      alert("User Registered!");
      setShowUserModal(false);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        // Handle specific 400 error
        alert("Registration failed, Email already registered!");
      } else {
        // Handle other errors
        setShowUserModal(false);
      }

      setUser({
        name: "",
        password: "",
        email: "",
        phoneNumber: "",
      });
    }
  };

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      {/* 1 - Name Field */}
      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter the name"
          name="name"
          value={user.name}
          onChange={handleChange}
          maxLength={30}
          required
        />
        <Form.Control.Feedback>looks good!</Form.Control.Feedback>
      </Form.Group>

      {/* 2 - Password Field */}
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Select password"
          name="password"
          value={user.password}
          onChange={handleChange}
          maxLength={30}
          required
        />
        <Form.Control.Feedback>looks good!</Form.Control.Feedback>
      </Form.Group>

      {/* 3 - Email Field */}
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email address"
          name="email"
          value={user.email}
          onChange={handleChange}
          maxLength={30}
          required
        />
        <Form.Control.Feedback>looks good!</Form.Control.Feedback>
      </Form.Group>

      {/* 4 - Phone Field */}
      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>Phone</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter phone number"
          name="phoneNumber"
          value={user.phoneNumber}
          onChange={handleChange}
          maxLength={30}
          required
        />
        <Form.Control.Feedback>looks good!</Form.Control.Feedback>
      </Form.Group>

      {/* BUTTON */}
      <div className="d-grid gap-2">
        <Button variant="primary" size="lg" onClick={handleSubmit}>
          Register
        </Button>
      </div>
    </Form>
  );
};

export default Register;
