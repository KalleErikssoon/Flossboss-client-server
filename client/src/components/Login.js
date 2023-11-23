import React, { useContext, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { AppContext } from '../context/AppProvider';
import axios from 'axios';


const Login = ({}) => {
  
  const { setShowUserModal } = useContext(AppContext)
  
  const [loginData, setLoginData] = useState({
      email: '',
      password: ''
    });


    const { login } = useContext(AppContext) // Using the login function from AppProvider
    const { setIsLoggedIn } = useContext(AppContext);

    const [validated, setValidated] = useState(false);


/*       useEffect(() => {

        
         localStorage.removeItem('userIdSession');
        localStorage.removeItem('token');
      }, []); */

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
          
          const response = await axios.post('http://localhost:3000/login', loginData);
          
          const userid = response.data.userid
          const token = response.data.token
          const name = response.data.name
          
          console.log(response.data.message)
          console.log(userid)
          login(response.data); //update the global user state
          setIsLoggedIn(true);

          if(userid){
            localStorage.setItem('userIdSession', userid )
            localStorage.setItem('token', token )
            localStorage.setItem('userName', name)
            alert("User logged in!")
            setShowUserModal(false)
          }
          

    
        } catch (error) {
          console.error('Error Logging in user:', error.message);
          alert("User fail");
          setLoginData({
            email:'',
            password:''

        })
    
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

          <div className="d-grid gap-2" >
              <Button variant="primary" size="lg" onClick={handleLogin}>
                Login
              </Button>
          </div>

    </Form>
    );
};
}
export default Login;
