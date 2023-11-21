import React, { useContext } from 'react';
import Logo from '../assets/FlossBossLogo.png';
import UserLogo from '../assets/UserLogo.png'
import { AppContext } from '../context/AppProvider';
import LoginContainer from '../components/LoginContainer'


const NavbarComponent = () => {

    const { user, showUserModal, setShowUserModal } = useContext(AppContext);

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light p-1">
          <a className="navbar-brand mx-auto" href="/">
            <img src={Logo} alt="Logo" style={{ height: 'auto', width: '70px' }} />
            FlossBoss
          </a>
          
          <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
            <ul className="navbar-nav align-items-lg-center">
              {/* Other nav items here */}
            </ul>
            <div style={{ textAlign: 'center' }}>
              <button className="user-logo-button" style={{ background: 'none', border: 'none', padding: 0 }} onClick={() => setShowUserModal(true)}>
                <img src={UserLogo} alt="User Logo" style={{ height: 'auto', width: '35px' }} />
                {!user && <div>Login/Register</div>}
              </button>
            </div>
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