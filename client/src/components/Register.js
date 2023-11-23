import React, { useState } from 'react';
import axios from 'axios';

const Register = ({ swtichPage }) => {
  const [user, setUser] = useState({
    name: '',
    password: '',
    email: '',
    phoneNumber: ''
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted:", user);
    try {
      const response = await axios.post('http://localhost:3000/users', user);
      console.log('User registered:', response.data);

      setUser({
        name: '',
        password: '',
        email: '',
        phoneNumber: ''
      });

    } catch (error) {
      console.error('Error registering user:', error.message);
    }

  };

  return (
    <div className="container">
      <h1 className="mb-4">Register User</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name:
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={user.name}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password:
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={user.password}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email:
          </label>
          <input
            type="text"
            className="form-control"
            id="email"
            name="email"
            value={user.email}
            onChange={handleChange}
          />
          </div>
          <div className="mb-3">
          <label htmlFor="phoneNumber" className="form-label">
            Phone:
          </label>
          <input
            type="number"
            className="form-control"
            id="phoneNumber"
            name="phoneNumber"
            value={user.phoneNumber}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary mx-2">
          Register
        </button>
        <button onClick={swtichPage} type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    </div>
  );
};

export default Register;
