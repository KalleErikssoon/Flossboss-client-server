import React, { useContext, useState } from 'react';
import axios from 'axios';
import { AppProvider } from '../context/AppProvider';
import App from '../App';

const Login = ({ swtichPage }) => {
    const [loginData, setLoginData] = useState({
        name: '',
        password: ''
      });
    
    const { login } = useContext(AppProvider) // Using the login function from AppProvider


      const handleChange = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
      };

      const handleLogin = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.post('http://localhost:3000/users/login', loginData);
          console.log('Login Successful:', response.data);
          login(response.data); //update the global user state
          setLoginData({
            name: '',
            password: ''
          });
    
        } catch (error) {
          console.error('Error Logging in user:', error.message);
        }
    
      };    

    return (
            <div className="container">
            <h1 className="mb-4">Login user</h1>
            <form onSubmit={handleLogin}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  value={loginData.name}
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
                  value={loginData.password}
                  onChange={handleChange}
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Login
              </button>
              <button onClick={swtichPage} type="submit" className="btn btn-primary mx-3">
                Register
              </button>
            </form>
          </div>
    );
};

export default Login;
