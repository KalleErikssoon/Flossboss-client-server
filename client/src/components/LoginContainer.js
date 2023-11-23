import React from 'react';
import { useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Login from './Login'
import Register from './Register'
import Modal from 'react-bootstrap/Modal'


const ModalRegisterLogin = ({ handleClose, visible = false }) => {

  // const [isSignIn, setIsSignIn] = useState(false)
  const [key, setKey] = useState('login');

  return (

    <Modal show={visible} onHide={handleClose}>
      <Modal.Header closeButton>
{/*         <Modal.Title>Login / Register</Modal.Title> */}
      </Modal.Header>
      <Modal.Body>
    {/*     {isSignIn ? (
          <Login swtichPage={() => setIsSignIn(false)} />
        ) : (
          <Register swtichPage={() => setIsSignIn(true)} />
        )} */}
    
    <Tabs
      defaultActiveKey="profile"
      id="justify-tab-example"
      activeKey={key}
      onSelect={(k) => setKey(k)}
      className="mb-3"
      justify
    >
      <Tab eventKey="login" title="Login">
        <Login></Login>
      </Tab>
      <Tab eventKey="register" title="Register">
        <Register></Register>
      </Tab>
    </Tabs>


      </Modal.Body>
      <Modal.Footer>
      </Modal.Footer>
    </Modal>
  );

}


export default ModalRegisterLogin;