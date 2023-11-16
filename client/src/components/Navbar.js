import React from 'react';
import Logo from '../assets/FlossBossLogo.png';
import UserLogo from '../assets/UserLogo.png'

const NavbarComponent = () => {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light p-1">
        <a className="navbar-brand mx-auto" href="/">
          <img src={Logo} alt="Logo" style={{ height: 'auto', width: '70px' }} />
          FlossBoss
        </a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav align-items-lg-center">
            {/* Other nav items here */}
          </ul>
          <img src={UserLogo} alt="UserLogo" className="user-logo d-none d-lg-block" style={{ height: 'auto', width: '35px' }} />
        </div>
      </nav>
    );
};

export default NavbarComponent;