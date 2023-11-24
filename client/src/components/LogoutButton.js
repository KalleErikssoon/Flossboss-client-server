import React from 'react';
import { logout } from '../utils/logout';

const LogoutButton = () => {



    return (
        <>
        <button onClick={logout} className="btn btn-danger">Logout</button>
        </>
    )

}

export default LogoutButton;