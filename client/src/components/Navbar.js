import React, { useContext, useState } from 'react';
import Logo from '../assets/FlossBossLogo.png';
import UserLogo from '../assets/UserLogo.png'
import { AppContext } from '../context/AppProvider';
import LoginContainer from '../components/LoginContainer'
import { logout } from '../utils/logout';
import { Link } from 'react-router-dom';


const NavbarComponent = () => {

    const { isLoggedIn, showUserModal, setShowUserModal } = useContext(AppContext);
    const [showPopupMenu, setShowPopupMenu] = useState(false);
    const userName = localStorage.getItem('userName'); 


    const PopupMenu = () => {
        const buttonStyle = {
            borderRadius: '5px',
            /*fontWeight: 'bold',*/
            fontFamily: 'Arial'
        }
        return (
            <div style={{ 
                position: 'absolute', 
                right: '20px', 
                top: '60px', 
                backgroundColor: 'white', 
                border: '1px solid grey', 
                borderRadius: '5px', 
                padding: '15px' }}>

            <Link to="/settings" style={{
                ...buttonStyle, 
                display: 'block',  
                padding: '10px',  
                textAlign: 'center',  
                textDecoration: 'none',  
                backgroundColor: '#4B5FE2',
                color: 'white',
                marginBottom: '10px',  
                borderColor: '#4B5FE2',
            }}>Profile Settings</Link>
                <button onClick= { logout }
                style = {{
                    ...buttonStyle,
                    backgroundColor: '#FB0133',
                    borderColor: '#FB0133',
                    color: 'white',
                }}>Logout</button>
            </div>
        );
    };


    const handleUserLogoClick = () => {
        if (!isLoggedIn) {
            // Show login/register modal
            setShowUserModal(true);
        } else {
            //redirect to profile or perform another action
            //can use history.push('/profile') if using react-router
            //for example:
            // history.push('/profile');
            setShowPopupMenu(!showPopupMenu);
        }
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light p-1">
          <a className="navbar-brand mx-auto" href="/" style={{ fontSize: '35px', fontFamily: 'Adiro'}}>
            <img src={Logo} alt="Logo" style={{ height: 'auto', width: '70px' }} />
            FlossBoss
          </a>
          
          <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
            <ul className="navbar-nav align-items-lg-center">
              {/* Other nav items here */}
              {isLoggedIn && (
                        // These items will only be displayed if a user is logged in
                        <>
                            <li className="nav-item">
                                <a className="nav-link" href="/profile">My Account</a>
                            </li>
                        </>
                    )}
            </ul>
            <div style={{ textAlign: 'center', marginRight: '20px', marginLeft: '3  0px' }}>
              <button className="user-logo-button" 
                style={{ background: 'none', border: 'none', padding: 0, fontSize: '18px', fontFamily: 'Adiro' }} 
                onClick={handleUserLogoClick}>

                <img src={UserLogo} alt="User Logo" style={{ height: 'auto', width: '35px' }} />
                {!isLoggedIn && <div>Login/Register</div>}
                {isLoggedIn && <div>{userName}</div>}
              </button>
            </div>
            {showPopupMenu && <PopupMenu />}
          </div>
  
          {showUserModal && (
              <LoginContainer
                  handleClose={() => setShowUserModal(false)}
                  visible={showUserModal}
              />
          )}
        </nav>
      );
  };

export default NavbarComponent;