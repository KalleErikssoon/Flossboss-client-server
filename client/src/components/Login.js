import React, { useContext, useState } from 'react';
// import jwt from 'jsonwebtoken';
import axios from 'axios';
import { AppContext } from '../context/AppProvider';

const Login = ({ swtichPage, history }) => {
    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
      });
    
    const { login } = useContext(AppContext) // Using the login function from AppProvider


/*       useEffect(() => {

        
         localStorage.removeItem('userIdSession');
        localStorage.removeItem('token');
      }, []); */

      const handleChange = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
      };

      const handleLogin = async (e) => {
        e.preventDefault();
        
        
        try {
          
          const response = await axios.post('http://localhost:3000/login', loginData);
          
          const userid = response.data.userid
          const token = response.data.token
          
          console.log(response.data.message)
          console.log(userid)
          login(response.data); //update the global user state

          if(userid){
            localStorage.setItem('userIdSession', userid )
            localStorage.setItem('token', token )
          }
          

          setLoginData({
            email: '',
            password: ''
          });
    
        } catch (error) {
          console.error('Error Logging in user:', error.message);

        }
    
      };    

    return (
            <div className="container">
            <h1 className="mb-4">Login user </h1>
            <h4 className="mb-4">Logged in as: {localStorage.getItem('userIdSession')} </h4>
            <form onSubmit={handleLogin}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Email:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="email"
                  name="email"
                  value={loginData.email}
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
