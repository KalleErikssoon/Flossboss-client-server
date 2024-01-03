import React, { useContext, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { AppContext } from "../context/AppProvider";
import axiosInstance from "../axiosInterceptor";

const Login = ({ swtichPage }) => {
  const { setShowUserModal } = useContext(AppContext);

  const { loginName } = useContext(AppContext); //Using the login function from AppProvider
  const { setIsLoggedIn } = useContext(AppContext);

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [validated, setValidated] = useState(false);

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      setValidated(true);
    }
  };

  const handleLogin = async (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      setValidated(true);
    }

    try {
      const response = await axiosInstance.post(
        "http://localhost:3000/login",
        loginData
      );

      const userid = response.data.userid;
      const token = response.data.token;
      const name = response.data.name;
      const email = response.data.email;

      console.log(response.data);
      if (userid) {
        localStorage.setItem("userIdSession", userid);
        localStorage.setItem("token", token);
        localStorage.setItem("userName", name);
        localStorage.setItem("Email", email);
        loginName(response.data); //Malte
        setIsLoggedIn(true); //Malte

        alert("User logged in!");
        setShowUserModal(false);
      }
    } catch (error) {
      // Handle specific error responses
      if (error.response) {
        const status = error.response.status;
        if (status === 404) {
          alert("User does not exist");
        } else if (status === 401) {
          alert("Incorrect password");
        } else {
          console.error("Error Logging in user:", error.message);
        }
      } else {
        // Handle general error
        console.error("Error Logging in user:", error.message);
        setShowUserModal(false);
      }

      // Reset login data
      setLoginData({
        email: "",
        password: "",
      });
    }
  };

  return (
    <Form noValidate validated={validated} onSubmit={handleLogin}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          name="email"
          value={loginData.email}
          onChange={handleChange}
          required
        />
        <Form.Control.Feedback>looks good!</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Enter Password"
          name="password"
          value={loginData.password}
          onChange={handleChange}
          required
        />
        <Form.Control.Feedback>looks good!</Form.Control.Feedback>
      </Form.Group>

      <div className="d-grid gap-2">
        <Button variant="primary" size="lg" onClick={handleLogin}>
          Login
        </Button>
      </div>
    </Form>
  );
};

export default Login;
