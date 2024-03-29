import React, { useContext, useState, useRef, useEffect } from 'react';
import Logo from '../assets/FlossBossNewLogo.png';
import UserLogo from '../assets/UserLogo_BlueGradient.png'
import { AppContext } from '../context/AppProvider';
import LoginContainer from '../components/LoginContainer'
import { logout } from '../utils/logout';
import { Link } from 'react-router-dom';


const NavbarComponent = () => {

    const { isLoggedIn, showUserModal, setShowUserModal } = useContext(AppContext);
    const [showPopupMenu, setShowPopupMenu] = useState(false);
    const userName = localStorage.getItem('userName'); 
    const PopupMenuRef = useRef(null);


    const handleClickOutside = (event) => {
        if (PopupMenuRef.current && !PopupMenuRef.current.contains(event.target)) {
            setShowPopupMenu(false);
        }
    }

    useEffect(() => {
        if (showPopupMenu) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showPopupMenu]);


    const PopupMenu = () => {
        const buttonStyle = {
            borderRadius: '5px',
            /*fontWeight: 'bold',*/
            fontFamily: 'Arial'
        }
        return (
            <div ref= {PopupMenuRef} style={{ 
                position: 'absolute', 
                right: '20px', 
                top: '60px', 
                backgroundColor: 'white', 
                border: '1px solid grey', 
                borderRadius: '5px', 
                padding: '15px',
                zIndex: 1000,  }}>

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
        <>
        <style>
                {`
                @media (max-width: 768px) {
                    .navbar-brand-text {
                        display: none;
                    }
                }
                .left-nav {
                    padding-left: 10px;
                }
                .left-nav-two {
                    padding-left: 5px;
                }
                .navbar-custom {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    width: 100%;
                    background-color: #F1F2F5;
                    
                }
                .right-nav {
                    display: flex;
                    align-items: center;
                    padding-right: 15px;
                }
                `}
            </style>

        <nav className="navbar navbar-expand-lg navbar-light p-1 navbar-custom">
          <a className="navbar-brand left-nav" href="/" style={{ fontSize: '35px', fontFamily: 'Adiro'}}>
            <img src={Logo} alt="Logo" style={{ height: 'auto', width: '70px' }} />
            <span className="navbar-brand-text left-nav-two">FlossBoss</span>
          </a>
          
          <div className="right-nav">
              {isLoggedIn && (
                        // These items will only be displayed if a user is logged in
                             <a className="nav-link" href="/myaccount">My Account</a>
                    )}

            <button className="user-logo-button" 
                        style={{ background: 'none', border: 'none', padding: 0, marginLeft: '20px', fontSize: '18px', fontFamily: 'Adiro' }} 
                        onClick={handleUserLogoClick}>
                        <img src={UserLogo} alt="User Logo" style={{ height: 'auto', width: '35px' }} />
                        {!isLoggedIn && <div>Login/Register</div>}
                        {isLoggedIn && <div>{userName}</div>}
                    </button>
            {showPopupMenu && <PopupMenu />}
          </div>
        </nav>
          {showUserModal && (
              <LoginContainer
                  handleClose={() => setShowUserModal(false)}
                  visible={showUserModal}
              />
          )}
        </>
      );
  };

export default NavbarComponent;