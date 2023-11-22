import React from 'react';

const LogoutButton = () => {

    const logout = () => {
        localStorage.removeItem('userIdSession');
        localStorage.removeItem('token'); // Clear other stored tokens if needed
        window.location.href = '/';
    };

    return (
        <>
        <button onClick={logout} className="btn btn-danger">Logout</button>
        </>
    )

}

export default LogoutButton;