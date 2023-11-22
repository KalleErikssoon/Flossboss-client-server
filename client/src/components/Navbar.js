import React, { useContext, useState } from 'react';
import Logo from '../assets/FlossBossLogo.png';
import UserLogo from '../assets/UserLogo.png'
import { AppContext } from '../context/AppProvider';
import LoginContainer from '../components/LoginContainer'
import { logout } from '../utils/logout';


const NavbarComponent = () => {

    const { isLoggedIn, showUserModal, setShowUserModal } = useContext(AppContext);
    const [showPopupMenu, setShowPopupMenu] = useState(false);

    const PopupMenu = () => {
        return (
            <div style={{ position: 'absolute', right: '20px', top: '60px', backgroundColor: 'white', 
                border: '1px solid black', borderRadius: '5px', padding: '10px' }}>

                <button onClick={() => { /* Handle profile settings */ }}>Profile Settings</button>
                <button onClick= { logout }>Logout</button>
            </div>
        );
    };


    const handleUserLogoClick = () => {
        if (!isLoggedIn) {
            // Show login/register modal
            setShowUserModal(true);
        } else {
            // Redirect to profile or perform another action
            // You can use history.push('/profile') if you are using react-router
            // For example:
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
                                <a className="nav-link" href="/profile">Profile</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/settings">Settings</a>
                            </li>
                        </>
                    )}
            </ul>
            <div style={{ textAlign: 'center' }}>
              <button className="user-logo-button" 
                style={{ background: 'none', border: 'none', padding: 0, fontSize: '18px', fontFamily: 'Adiro' }} 
                onClick={handleUserLogoClick}>

                <img src={UserLogo} alt="User Logo" style={{ height: 'auto', width: '35px' }} />
                {!isLoggedIn && <div>Login/Register</div>}
                {isLoggedIn && <div>Profile</div>}
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